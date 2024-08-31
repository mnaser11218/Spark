import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Spark from './components/Spark'

const App =()=> {
  return (

<Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/spark" element={<Spark />} />
   </Routes>
  </Router>

  );
};

export default App;
