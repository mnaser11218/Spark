import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SparkNav.css'; 
import { useUser } from '../CurrentUser';

const VerticalNavbar = () => {
  const { setCurrentLoggedInUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to handle dropdown visibility

  const handleLogout = () => {
    setCurrentLoggedInUser(null); // Clear the state when logging out
    setIsDropdownOpen(false); // Close dropdown on logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown open/close
  };

  return (
    <div className="navbar-container">
      <h1>⚡️</h1>
      
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/timeline" className="navbar-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
              </svg> Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/explore" className="navbar-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg> Explore
            </Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
              </svg> Login
            </Link>
          </li> */}
          <li className="navbar-item">
            <Link to="/profilepage" className="navbar-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
              </svg> Profile
            </Link>
          </li>
          <li className="navbar-item">
            <button className="navbar-link dropdown-button" onClick={toggleDropdown}>
              Log Out <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg>
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li className="dropdown-item1">
                  <Link to="/login" className="dropdown-link1">Log In as Separate User</Link>
                </li>
                <li className="dropdown-item1">
                  <Link to="/createaccount" className="dropdown-link1">Create a New Account</Link>
                </li>
                <li className="dropdown-item1">
                  <Link to="/">
                  <button className="dropdown-link1" onClick={handleLogout}>Confirm Log Out</button>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default VerticalNavbar;
