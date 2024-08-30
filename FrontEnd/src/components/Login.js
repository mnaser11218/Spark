import React from 'react';
import '../App.css';


const Login=()=> {


  return (
 

    
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#F6E6CB' }} 
      
    >
      <div
      
        className="card p-4 shadow-sm"
        style={{
          width: '20rem',
          backgroundColor: '#E7D4B5', // Card background color
          border: '1px solid #A0937D', // Border color
        }}
      >
           <h1 className="text-center mb-4">
  Start the <span style={{ color: '#A0937D', fontWeight: 'bold' }}>SPARK</span>
</h1>
        <h2 className="text-center mb-4" style={{ color: '#A0937D' }}>Sign In</h2>
        <form autoComplete="off">
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{ color: '#A0937D' }} // Label color
            >
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              style={{ borderColor: '#B6C7AA' }} // Input border color
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: '#A0937D' }} // Label color
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              style={{ borderColor: '#B6C7AA' }} // Input border color
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: '#A0937D', color: '#F6E6CB' }} // Button background and text color
            >
              Log In
            </button>
          </div>
        </form>
        <hr />
        <div className="text-center">
          <p style={{ color: '#A0937D' }}>Don't have an account?</p>
          <button
            className="btn"
            style={{
              backgroundColor: '#B6C7AA',
              color: '#A0937D',
              borderColor: '#A0937D',
            }} // Button background, text, and border color
          >
            Create Account
          </button>
        </div>
      </div>
    </div>

   
  );
};

export default Login;