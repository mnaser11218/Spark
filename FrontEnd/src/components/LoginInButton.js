import React from 'react';
import { useNavigate } from 'react-router-dom';


const LoginInButton = () => {
  const navigate = useNavigate(); 
 
  const handleClick = () => {
    console.log('Login button clicked'); 
    navigate('/Login');
  };



  return (
    <div >
      <button onClick={handleClick}>Log In</button>
      <br/>
      
    
    </div>
  );
};
export default LoginInButton;
