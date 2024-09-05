import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../HomePage/HomeStyle.css';



const SignUpButton = () => {
    const navigate = useNavigate(); 
   
    const handleClick = () => {
      console.log('SignUp button clicked'); 
      navigate('/CreateAccount');
    };
    return (
        <div >  
          <button className="btn btn-primary" onClick={handleClick}>Create An Acount</button>
        </div>
      );
    };
    
    export default SignUpButton;
    