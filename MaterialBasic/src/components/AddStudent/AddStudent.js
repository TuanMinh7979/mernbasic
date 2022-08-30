import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './AddStudent.scss';
function AddStudent() {
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

  const teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5'];
  return (
    <div id="addStudentWrapper">
      <h1 className="title">Add Student</h1>

      <div className="mainform">
        <div className="form-group  name">
          <p>Student Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => hdlSearchNameChange(e)}
          />
        </div>
        <div className="form-group mail">
          <p>Email</p>
          <input type="text" value={mail} onChange={hdlSearchMailChange} />
        </div>

        <div className="form-group select-inp-container">
          <div className="select-inp pickteam">
            <p>Pick a team</p>
            <select>
              {teams &&
                teams.length > 0 &&
                teams.map((item, index) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="select-inp gender">
            <p>Choose a gender</p>
            <div>
              <input type="radio" name="gender"></input> Female
            </div>
            <div>
              <input type="radio" name="gender"></input> Male
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddStudent;
//same use -, diff use space
