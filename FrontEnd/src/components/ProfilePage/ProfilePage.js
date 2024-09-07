import React from 'react';
import { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useUser } from '../CurrentUser';
import Likes from '../Like/Likes.js'
import { useNavigate } from 'react-router';
import ShowThirdSection from '../TimeLine/ThirdSection';


const ProfilePage = () => {

    const { currentLoggedInUser } = useUser(); // Gets the current logged in user
    const [sparks, setSparks] = useState([]);
    const [mentions, setMentions] = useState([]);
    const [view, setView] = useState('sparks');
    const stateUser = currentLoggedInUser.userName;
    const navigate = useNavigate();
    const [userProfiles, setUserProfiles] = useState([]); 

    const likeIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
  </svg>
  
    const commentIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
  </svg>
  
    const retweetIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
    <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
  </svg>

    const handleClick = (event) => {
        const clickedDiv = event.currentTarget;
        const textContent = clickedDiv.textContent;
        const regex = /@(\w+)/;
        const match = textContent.match(regex);
        if (match) {
          const userName = match[1];
          navigate(`/userprofilepage/${userName}`);
        }
    };

    function updateUserName() {
        document.getElementById("get-user-name-profile").textContent = currentLoggedInUser.firstName + " " + currentLoggedInUser.lastName;
    }
    function updateUserTagName() {
        document.getElementById("get-profile-tag").textContent = "@" + currentLoggedInUser.userName;
    }
    function updateUserDateJoined() {
        document.getElementById("joined-date").textContent = currentLoggedInUser.createdDate;
    }
    function fetchUserSparks() {
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

    function fetchUserMentions() {
        fetch(`http://localhost:8080/api/sparks/username/mention/${stateUser}`)
            .then(response => {
                if (!response.ok){
                    throw new Error('Network response not ok');
                }
                return response.json();
            })
            .then (data => {
                setMentions(data.reverse()); 
            })
            .catch(error => {
                console.error('Error fetching mentions:', error);
            });
    }

    function fetchUserProfiles() {
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

    function getUserProfileById(userIdToFind) {
        return userProfiles.find(profile => profile.userId === userIdToFind);
    }

    useEffect(() => {
        updateUserName();
        updateUserTagName();
        updateUserDateJoined();
        fetchUserSparks();
        fetchUserMentions();
        fetchUserProfiles();
    }, []);

    return (
        <div id="full-whole-profile-page">
        <div className="profile-page">

            <header className="profile-header">
                <div className="cover-photo"></div>
                <div className="profile-info">
                    <div className="profile-picture"></div>
                    <div className="profile-details">
                        <h1 className="profile-name" id="get-user-name-profile">Username</h1>
                        <p className="profile-handle" id="get-profile-tag">@userhandle</p>
                        <div className="profile-stats">
                            <span>Joined <strong id="joined-date">join date here</strong></span>
                        </div>
                    </div>
                </div>
            </header>
            {/* <Likes /> */}
            <main className="profile-content">
                <nav className="profile-nav">
                    <ul>
                        <li className={view === 'sparks' ? 'active' : ''} onClick={() => setView('sparks')} id="spark-tab">Sparks</li>
                        <li className={view === 'mentions' ? 'active' : ''} onClick={() => setView('mentions')} id="mention-tab">Mentions</li>
                    </ul>
                </nav>
                <div className="tweets-section">
                    {view === 'sparks' && sparks.map(spark => (
                        <div key={spark.id} className="tweet">
                            <p className="name-spark-class">{currentLoggedInUser.firstName + " " + currentLoggedInUser.lastName}</p>
                            <p className="username-spark-class">@{currentLoggedInUser.userName}</p>
                            <p className="body-spark-class">{spark.body}</p>
                            {spark.url && <img src={spark.url} alt="Spark" className="spark-image" style={{ maxWidth: '45%', height: 'auto', marginTop: '10px' }}  />}
                            {/* <br/> */}
                            <div id="likes-comments">
        <span id="comment-icon-id">{commentIcon}</span>
        <span id="retweet-icon-id">{retweetIcon}</span>
        <span id="like-icon-id">{likeIcon}</span>
      </div>
                            <p className="date-spark-class">{spark.date}</p>
                        </div>
                    ))}
                    {view === 'mentions' && mentions.map(mention => {
                        const profile = getUserProfileById(mention.userId);
                        return (
                            <div key={mention.id} className="tweet">
                                <div id="click-profile-function" onClick={handleClick}>
                                    <p className="name-spark-class">{profile?.firstName + " " + profile?.lastName}</p>
                                    <p className="username-spark-class">@{profile?.userName}</p>
                                </div>
                                <p className="body-spark-class">{mention.body}</p>
                                {mention.url && <img src={mention.url} alt="Mention" className="mention-image" style={{ maxWidth: '45%', height: 'auto', marginTop: '10px' }}  />}
                                <br/>
                                <p className="date-spark-class">{mention.date}</p>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>



    <ShowThirdSection id="rd"/>



</div>

    );
};

export default ProfilePage;
