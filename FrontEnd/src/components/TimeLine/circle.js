import React from 'react';
import './circle.css';

const CircularProgressBar = ({ progress }) => {
  const radius = 15.916;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

 
  return (

    
 
    <div className="progress-circle-container">
      <svg
        viewBox="0 0 36 36"
        className="progress-circle"
      >
        <path
          className="progress-circle-bg"
          d={`M18 2.084 A 15.916 15.916 0 0 1 18 33.916 A 15.916 15.916 0 0 1 18 2.084`}
        />
        <path
          className="progress-circle-bar"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          d={`M18 2.084 A 15.916 15.916 0 0 1 18 33.916 A 15.916 15.916 0 0 1 18 2.084`}
        />
      </svg>
      <div className="progress-circle-text">
        <p>{progress}</p>
        <p>255</p>
      </div>
    </div>
    
    );
};

export default CircularProgressBar;
