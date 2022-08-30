import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './StudentList.scss';
function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [gender, setGender] = useState('');
  const hdlSearchNameChange = (event) => {
    setName(event.target.value);
  };
  const hdlSearchMailChange = (event) => {
    setMail(event.target.value);
  };
  const hdlSearchGenderChange = (event) => {
    setGender(event.target.value);
  };

  useEffect(() => {
    async function getData() {
      let rs = await axios.get('http://localhost/vuex/apis.php');
      return rs.data;
    }
    getData().then((res) => setStudentList(res));
  }, []);
  useEffect(() => {}, [name, mail, gender]);
  return (
    <div id='studentListWrapper'>
      <h1 className="title">Student List</h1>
      <div className="search-box">
        <div className="search-item name">
          <p>Search by Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => hdlSearchNameChange(e)}
          />
        </div>
        <div className="search-item mail">
          <p>Search by Email</p>
          <input type="text" value={mail} onChange={hdlSearchMailChange} />
        </div>
        <div className="search-item gender">
          <p>Gender</p>
          <div className="gender-ratio-container">
            <input
              type="radio"
              name="gender"
              value="M"
              onChange={hdlSearchGenderChange}
            />
            <input
              type="radio"
              name="gender"
              value="F"
              onChange={hdlSearchGenderChange}
            />
            <input
              type="radio"
              name="gender"
              value=""
              onChange={hdlSearchGenderChange}
            />
          </div>
        </div>
      </div>

      <div className="liststudent">
        {studentList &&
          studentList.length > 0 &&
          studentList.map((item, index) => {
            return <p key={item.id}>{item.name}</p>;
          })}
      </div>
    </div>
  );
}
export default StudentList;
//same use -, diff use space
