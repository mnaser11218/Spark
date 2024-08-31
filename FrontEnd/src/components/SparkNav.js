import React from 'react';
import { Link } from 'react-router-dom';
import '../componentStyles/SparkNav.css'; 

const VerticalNavbar = () => {
  return (
    <div className="navbar-container">
      <h1>⚡️</h1>
      
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="" className="navbar-link">Explore</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/timeline" className="navbar-link">Timeline</Link>
          </li>
          <li className="navbar-item">
            <Link to="/createaccount" className="navbar-link">Create Account</Link>
          </li>
          <li className="navbar-item">
            <Link to="" className="navbar-link">Profile</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default VerticalNavbar;
