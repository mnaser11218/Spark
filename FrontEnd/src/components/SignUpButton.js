import React from 'react';
import { useNavigate } from 'react-router-dom';


const SignUpButton = () => {
    const navigate = useNavigate(); 
   
    const handleClick = () => {
      console.log('SignUp button clicked'); 
      navigate('/CreateAnAcount');
    };
    return (
        <div >  
          <button onClick={handleClick}>CreateAnAcount</button>
        </div>
      );
    };
    
    export default SignUpButton;
    