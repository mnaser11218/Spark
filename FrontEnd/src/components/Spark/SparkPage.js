import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import './SparkPage.css';
import ShowThirdSection from '../TimeLine/ThirdSection';
import SparkComment from '../Comments/SparkComment'
import Likes from '../Like/Likes';

function SparkPage() {
  const [spark, setSpark] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const { sparkToCall } = useParams();
  console.log(sparkToCall)

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


  const sparkId = sparkToCall; 

  useEffect(() => {
    const fetchSparkById = async () => {
      try {
      
        const sparkResponse = await fetch(`http://localhost:8080/api/sparks/${sparkId}`);
        const sparkData = await sparkResponse.json();
        setSpark(sparkData);

        //THIS IS NOT WORKING CURRENTLY
        const userProfileResponse = await fetch(`http://localhost:8080/api/user-profiles/${sparkData.userId}`);
        const userProfileData = await userProfileResponse.json();
        setUserProfile(userProfileData);
      } catch (error) {
        console.error('Error fetching spark or user profile:', error);
      }
    };

    fetchSparkById();
  }, []);

  const handleUserClick = () => {
    if (userProfile) {
      navigate(`/userprofilepage/${userProfile.userName}`);
    }
  };

  if (!spark || !userProfile) {
    return <div>Loading...</div>;
  }
// testing
  return (
    <div id="full-full-body">
    <div className="spark-page-container">
      <div className="spark-content">
        <div id="spark-user-container">
          <div id="user-info" onClick={handleUserClick}>
            <h4>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg> 
              {userProfile.firstName}
            </h4>
            <p>@{userProfile.userName}</p>
          </div>
        </div>
        <div className="spark-body">{spark.body}</div>
        {spark.url && (
          <img 
            src={spark.url} 
            alt="Spark image" 
            className="spark-image"
          />
        )}
            

        <div className="spark-timestamp">{spark.date}</div>
        <div className="spark-icons">
          <span className="spark-comment-icon">{commentIcon}</span>
          <span className="spark-retweet-icon">{retweetIcon}</span>
          <span className="spark-like-icon">{likeIcon}</span>
            {<Likes sparkId={sparkId} />}
        </div>
      </div>
      <SparkComment sparkId={sparkId}/>
    </div>
    <ShowThirdSection/>

    </div>
  );
}

export default SparkPage;
