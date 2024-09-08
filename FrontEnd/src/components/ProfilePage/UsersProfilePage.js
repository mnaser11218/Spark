import React from 'react';
import { useState, useEffect } from 'react';
import './UsersProfilePage.css';
import { useNavigate, useParams } from 'react-router';
import ShowThirdSection from '../TimeLine/ThirdSection';

const UserProfilePage = () => {
    const { user } = useParams();
    console.log(user);

    const [sparks, setSparks] = useState([]);
    const [mentions, setMentions] = useState([]);
    const [view, setView] = useState('sparks');

    const [userData, setUserData] = useState([]);
    const [userProfiles, setUserProfiles] = useState([]);

    const navigate = useNavigate();

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

    function getClickedUser() {
        fetch(`http://localhost:8080/api/user-profiles/username/${user}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
                document.getElementById("get-user-name-profile").textContent = data.firstName + " " + data.lastName;
                document.getElementById("get-profile-tag").textContent = "@" + data.userName;
                document.getElementById("joined-date").textContent = data.createdDate;
                console.log(data.firstName + " " + data.lastName + " is here!");
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }

    function fetchUserSparks() {
        fetch(`http://localhost:8080/api/sparks/username/${user}`)
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
        fetch(`http://localhost:8080/api/sparks/username/mention/${user}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response not ok');
                }
                return response.json();
            })
            .then(data => {
                setMentions(data.reverse());
            })
            .catch(error => {
                console.error('Error fetching mentions: ', error);
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
                console.error('Error fetching user profiles:', error);
            });
    }

    function getUserProfileById(userIdToFind) {
        return userProfiles.find(profile => profile.userId === userIdToFind);
    }

    useEffect(() => {
        getClickedUser();
        fetchUserSparks();
        fetchUserMentions();
        fetchUserProfiles();
    }, []);

    return (
        <div id="u-prof-page">
        <div className="profile-page">
            <header className="profile-header">
                <div className="cover-photo" id="user-banner-img"></div>
                <div className="profile-info">
                    <div className="profile-picture" id="user-pro-pic"></div>
                    <div className="profile-details">
                        <h1 className="profile-name" id="get-user-name-profile">Username</h1>
                        <p className="profile-handle" id="get-profile-tag">@userhandle</p>
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
                    </ul>
                </nav>
                <div className="tweets-section">
                    {view === 'sparks' && sparks.map(spark => (
                        <div key={spark.id} className="tweet">
                            <div className='click-profile-function-user'>
                            <p id="f-and-l"> {userData.firstName + " " + userData.lastName}</p>
                            <p id="sp-us">@{userData.userName}</p>
                            </div>
                            <p>{spark.body}</p>
                            {spark.url && <img src={spark.url} alt="spark" className="tweet-image" style={{ maxWidth: '45%', height: 'auto', marginTop: '10px' }}/>}
                            <p className='datess'>{spark.date}</p>
                        </div>
                    ))}
                    {view === 'mentions' && mentions.map(mention => {
                        const profile = getUserProfileById(mention.userId);
                        return (
                            <div key={mention.id} className="tweet">
                                <div className="click-profile-function-user" onClick={handleClick}>
                                    <p id="names-first-last">{profile?.firstName + " " + profile?.lastName}</p>
                                    <p id="actual-user-name">@{profile?.userName}</p>
                                </div>
                                <p>{mention.body}</p>
                                {mention.url && <img src={mention.url} alt="mention" className="tweet-image" style={{ maxWidth: '45%', height: 'auto', marginTop: '10px' }} />}
                                <p className="datess">{mention.date}</p>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
        <ShowThirdSection/>
        </div>
    );
};

export default UserProfilePage;
