import React from 'react';
import '../../App.css';
import './HomeStyle.css';
import Logo from '../Images/SparkLogo';
import Login from "../Login/LoginInButton.js";
import SignUp from "../CreateAccount/SignUpButton.js";
import PreviewButton from '../PreviewPage/PreviewButton';
// import OpenAIComponent from '../OpenAI/OpenAIComponent';
import GPT3Component from '../OpenAI/gp3Component/GPT3Component.js';

const HomePage = () => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY
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
                    {apiKey}
                    <GPT3Component apiKey={apiKey} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
