import React from 'react'
import { useState, useEffect } from 'react';
import { useUser } from '../CurrentUser';
import './SparkComment.css';


function SparkComment({sparkId}) {
  const [comments, setComments] = useState([])
  const [inputValue, setInputValue] = useState('');
  const { currentLoggedInUser } = useUser();
   const [userProfiles, setUserProfiles] = useState([])
  //const postToServer = ()=> {console.log("posting comment")}

  const verifiedIcon = <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="#2c74b3" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
</svg>



  const fetchSparkById = async () => {
    try {
    
      const sparkResponse = await fetch(`http://localhost:8080/api/sparks/comments/${sparkId}`);
      const data = await sparkResponse.json();
      const formattedItems = data.map(item => ({
        id: item.id,
        body: item.body,
        date: item.date,
        userId: item.userId,
        // name: userProfiles[item.userId]?.firstName || 'Unknown',
        // userName: userProfiles[item.userId]?.userName || 'Unknown',
        imageUrl: item.url //this is where we add image URL!!
      }));
      setComments(formattedItems);
      setInputValue("")
      //setComments(sparkData);

    
      // const userProfileResponse = await fetch(`http://localhost:8080/api/user-profiles/spark/${sparkId}`);
      //   const userProfileData = await userProfileResponse.json();
      //   setUserProfile(userProfileData);
    } catch (error) {
      console.error('Error fetching spark or user profile:', error);
    }
  };


  const fetchUserProfiles = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user-profiles');
      const data = await response.json();
      const profileMap = data.reduce((acc, profile) => {
        acc[profile.userId] = profile;
        return acc;
      }, {});
      setUserProfiles(profileMap);
      console.log(profileMap)
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  const postToServer = async () => {
    try {
      await fetch('http://localhost:8080/api/sparks', {
        method: "POST",
        body: JSON.stringify({
          sparkId:sparkId,
          userId: currentLoggedInUser.userId,
          body: inputValue,
          date: new Date().toLocaleDateString('en-CA')
         // url: imageUrl
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      // alert("Comment posted!");
      // setInputValue("");
      // setImageUrl(null);
      // //fetchSparks();
      fetchSparkById();
    } catch (error) {
      console.error('Error posting spark:', error);
    }
  };

  useEffect(() => {
   
    fetchUserProfiles();
    fetchSparkById();
  }, []);
  return (
    <div>
      {/* need to get the username of each comment. for each comment we need to get the sparkid and make a fetch call to get the username */}
    {comments.map((item, index) => (
    <div className="timeline-item" id="spark-individual-container">
      <div id="user-container">
        <div  id="user-links">
        {/* onClick={handleClick} */}
          {/* <h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg> 
          </h4> */}
          <img src={userProfiles[item.userId]?.profileUrl} className="cc-img2"/>
          <p id="f-c-name">{userProfiles[item.userId]?.firstName || 'Unknown'}</p>
          <span id="verify-span-icon2">{verifiedIcon}</span>
          <p>@{userProfiles[item.userId]?.userName || 'Unknown'}</p>
          
      
        </div>
      </div>
      <div className="item-content" key={item.id} >{item.body}<br/>{item.imageUrl && ( // displays the image if it exists!
        <img 
          src={item.imageUrl} 
          alt="Spark image" 
          id="the-working-image"
          style={{ maxWidth: '45%', height: 'auto', marginTop: '10px' }} 
        />
      )}</div>
      {/* onClick={() => handleSparkClick(item.id)} */}

      
      <div className="item-timestamp">{item.date}</div>
      <div id="likes-comments">
        {/* <span id="comment-icon-id">{commentIcon}</span>
        <span id="retweet-icon-id">{retweetIcon}</span>
        <span id="like-icon-id">{likeIcon}</span> */}
      </div>
    </div>
  ))}

<input
          type="text"
          value={inputValue}
          autoComplete='off'
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a comment"
          className="input-field-lol input-com"
          id="main-input-element"
        />
        <button onClick={postToServer} className="add-button">
            Post
          </button>
    </div>
  )
}

export default SparkComment