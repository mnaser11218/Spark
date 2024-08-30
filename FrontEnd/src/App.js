import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';


const App =()=> {
  return (
  
<Router>
  <Routes>
    <Route path="/" element={<HomePage />} /> 
    <Route path="/login" element={<Login />} /> 
  </Routes>
  </Router>

  );
};

export default App;
