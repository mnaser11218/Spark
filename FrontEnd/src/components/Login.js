import React from 'react';
import '../componentStyles/Login.css';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/createaccount');
  }
  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm">
        <h1 className="text-center mb-4 card-header">
          Start the <span style={{ color: '#92C7CF', fontWeight: 'bold' }}>SPARK ⚡️</span>
        </h1>
        <h2 className="text-center mb-4 card-subheader">Sign In</h2>
        <form autoComplete="off">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
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
          <p className="text-muted">Don't have an account?</p>
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
