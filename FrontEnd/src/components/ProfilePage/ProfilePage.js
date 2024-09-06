import React from 'react';
import { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useUser } from '../CurrentUser';


const ProfilePage = () => {


    const { currentLoggedInUser } = useUser(); // Gets the current logged in user
    const [sparks, setSparks] = useState([]);
    const [mentions, setMentions] = useState([]);
    const [view, setView] = useState('sparks');
    const stateUser = currentLoggedInUser.userName;

    const [userProfiles, setUserProfiles] = useState([]); 




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

    function fetchUserMentions(){
        fetch(`http://localhost:8080/api/sparks/username/mention/${stateUser}`)
        .then(response => {
            if (!response.ok){
                throw new Error('Network response not ok');
            }
            return response.json();
        })
        .then (data => {
            console.log(data)
            setMentions(data.reverse()); 
        })
        .catch(error => {
            console.error('Error fetching mentions: ', error);
        });
    }

    function fetchUserProfiles(){
        fetch('http://localhost:8080/api/user-profiles')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network not ok');
            }
            return response.json();
        })
        .then(data => {
            setUserProfiles(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function getUserProfileById(userIdToFind){
        return userProfiles.find(profile => profile.userId === userIdToFind);
    }



    useEffect(() => {
        return(  
        updateUserName(),
        updateUserTagName(),
        updateUserDateJoined(),
        fetchUserSparks(),
        fetchUserMentions(),
        fetchUserProfiles()
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
                    <li className={view === 'sparks' ? 'active' : ''} onClick={() => setView('sparks')} id="spark-tab">Sparks</li>
                    <li className={view === 'mentions' ? 'active' : ''} onClick={() => setView('mentions')} id="mention-tab">Mentions</li>
                        {/* <li>Sparks</li>
                        <li>Mentions</li> */}
                    </ul>
                </nav>
                <div className="tweets-section">
                {view === 'sparks' && sparks.map(spark => (
                        <div key={spark.id} className="tweet">
                            <p className="name-spark-class">{currentLoggedInUser.firstName + " " + currentLoggedInUser.lastName}</p>
                            <p className="username-spark-class">@{currentLoggedInUser.userName} </p>
                            <p className="body-spark-class">{spark.body}</p>
                            <br/>
                            <p className="date-spark-class">{spark.date}</p>
                        </div>
                    ))}
                    {view === 'mentions' && mentions.map(mention => {
                        const profile = getUserProfileById(mention.userId);
                        return (
                        <div key={mention.id} className="tweet">
                            <p className="name-spark-class">{profile?.firstName + " " + profile?.lastName}</p>
                            <p className="username-spark-class">@{profile?.userName} </p>
                            <p className="body-spark-class">{mention.body}</p>
                            <br/>
                            <p className="date-spark-class">{mention.date}</p>
                        </div>
                        );
                        })}
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
