import React from 'react';
import '../../App.css';
import './HomeStyle.css';
import Logo from '../Images/SparkLogo';
import Login from "../Login/LoginInButton.js";
import SignUp from "../CreateAccount/SignUpButton.js"
import PreviewButton from '../PreviewPage/PreviewButton';



const HomePage=()=>{
    
    return (
        <div>
              <Logo/>
        <div id='home-page'>

            
      
        <h2>
            <Login/>
            <SignUp/>
            <PreviewButton/>
            
            </h2>
          
            
        </div>
        <h2>this is the home page</h2>
        </div>
    );
};

export default HomePage;