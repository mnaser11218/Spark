import React from 'react';
import { useState, useEffect } from 'react';
import '../componentStyles/ProfilePage.css';
import { useUser } from './CurrentUser';


const ProfilePage = () => {


    const { currentLoggedInUser } = useUser(); // Gets the current logged in user
    const [sparks, setSparks] = useState([]);
    const stateUser = currentLoggedInUser.userName;



    function updateUserName (){
        document.getElementById("get-user-name-profile").textContent = currentLoggedInUser.firstName + " " + currentLoggedInUser.lastName;
    }
    function updateUserTagName(){
        document.getElementById("get-profile-tag").textContent = "@" + currentLoggedInUser.userName;
    }
    function updateUserDateJoined(){
        document.getElementById("joined-date").textContent = currentLoggedInUser.createdDate;
    }
    function fetchUserSparks(){
         fetch(`http://localhost:8080/api/sparks/username/${stateUser}`)
         .then(response => {
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
             return response.json(); 
         })
         .then(data => {
             setSparks(data.reverse()); 
         })
         .catch(error => {
             console.error('Error fetching sparks:', error); 
         });
    }


    useEffect(() => {
        return(  
        updateUserName(),
        updateUserTagName(),
        updateUserDateJoined(),
        fetchUserSparks()
        )},[]);
    


    return (
        <div className="profile-page">
            <header className="profile-header">
                <div className="cover-photo"></div>
                <div className="profile-info">
                    <div className="profile-picture"></div>
                    <div className="profile-details">
                        <h1 className="profile-name" id="get-user-name-profile">Username</h1>
                        <p className="profile-handle" id="get-profile-tag">@userhandle</p>
                        {/* <p className="profile-bio">This will be a bio that a logged in user can change.</p> */}
                        <div className="profile-stats">
                            <span>Joined <strong id="joined-date">join date here</strong></span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="profile-content">
                <nav className="profile-nav">
                    <ul>
                        <li>Sparks</li>
                        <li>Mentions</li>
                    </ul>
                </nav>
                <div className="tweets-section">
                {sparks.map(spark => (
                        <div key={spark.id} className="tweet">
                            <p>@{currentLoggedInUser.userName} {currentLoggedInUser.firstName + " " + currentLoggedInUser.lastName}</p>
                            <p>{spark.body}</p>
                            <p>{spark.date}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
