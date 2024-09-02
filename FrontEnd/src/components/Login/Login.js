import React from 'react';
import '../../componentStyles/Login.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useUser } from '../CurrentUser';

const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/createaccount');
  }


  //THIS FUNCTION SETS THE CURRENT USER
  const { setCurrentLoggedInUser } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const HandleLogin = async(e)=>{
    e.preventDefault();
    console.log(username);

 
  try {
    const response = await fetch(`http://localhost:8080/api/user-profiles/username/${username}`);
    if (!response.ok) {
      alert('User not found');
      return;
    }

    const user = await response.json();

    if (user.password === password) {
      alert(`You are now logged in, ${user.firstName}!`);
      setCurrentLoggedInUser(user); 
      navigate('/timeline');
    } else {
      alert('Wrong password');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
  }

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" id="the-card">
        <h1 className="text-center mb-4 card-header">
          Log in to <span style={{ color: 'white', fontWeight: 'bold' }}>SPARK ⚡️</span>
        </h1>
        <h2 className="text-center mb-4 card-subheader">Sign In</h2>
        <form autoComplete="off" onSubmit={HandleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Log In
            </button>
          </div>
        </form>
        <hr />
        <div className="text-center">
          <p className="text-muted" id="pls">Don't have an account?</p>
          <button
            className="btn btn-secondary"
            onClick={handleClick}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
