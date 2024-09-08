import React from 'react';
import '../../App.css';
import './HomeStyle.css';
import Logo from '../Images/SparkLogo';
import Login from "../Login/LoginInButton.js";
import SignUp from "../CreateAccount/SignUpButton.js";
import PreviewButton from '../PreviewPage/PreviewButton';
import OpenAIComponent from '../OpenAI/OpenAIComponent';

const HomePage = () => {
    return (
        <div className="home-container" id="home-full-page">
            <div className="home-logo">
                <Logo />
            </div>
            <div className="home-content">
                <h1 className="home-title">Welcome to Spark</h1>
                <p className="home-subtitle">Connect. Share. Discover.</p>
                <div id="home-buttons">
                    <Login />
                    <SignUp />
                    <PreviewButton />
                    <OpenAIComponent/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
