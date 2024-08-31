import React from 'react';
import '../App.css';
import '../HomeStyle.css';
import Logo from './SparkLogo';
import Login from "./LoginInButton.js";
import SignUp from "./SignUpButton.js"


const HomePage=()=>{
    
    return (
        <div>
              <Logo/>
        <div id='home-page'>

            
      
        <h2>
            <Login/>
            <SignUp/>
            </h2>
          
            
        </div>
        </div>
    );
};

export default HomePage;