import React from 'react';
import '../App.css';
import '../componentStyles/HomeStyle.css';
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
        <h2>this is the home page</h2>
        </div>
    );
};

export default HomePage;