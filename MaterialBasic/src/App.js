import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';
import StudentList from './components/StudentList/StudentList';
import CustomDrawler from './components/CustomDrawler';

function App() {
  // Instantiation

  return (
    <>
      <CustomDrawler></CustomDrawler>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="list" element={<StudentList />} />
      </Routes>
    </>
  );
}

export default App;
