import React, { useRef, useState, useEffect } from 'react';
import './TimeLine.css';
import { useUser } from '../CurrentUser';
import { useNavigate } from 'react-router';
import UploadImageToS3WithNativeSdk from '../AWS/AWSImages';
import ShowThirdSection from './ThirdSection';

function ShowTimeline() {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userProfiles, setUserProfiles] = useState([]);
  const { currentLoggedInUser } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [key, setKey] = useState(null);

  const childToParent = (childdata) => {
    setData(childdata);
    setImageUrl(childdata)
  }
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



  // does the file input and image preview
  const handleFileChange = async (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handlePhotoIconClick = () => {
    fileInputRef.current.click();
  };

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


//map all the sparks and display them nicely. getAll for all sparks
//item.body + item.name in the html
//a function inside the map function that says { return item.id }




  const fetchUserProfiles = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user-profiles');
      const data = await response.json();
      const profileMap = data.reduce((acc, profile) => {
        acc[profile.userId] = profile;
        return acc;
      }, {});
      setUserProfiles(profileMap);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  const handleSparkClick = (item) => {
    navigate(`/spark/${item}`);
    console.log(item);
  }

  const fetchSparks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sparks/notcomments');
      const data = await response.json();
      const formattedItems = data.map(item => ({
        id: item.id,
        body: item.body,
        date: item.date,
        name: userProfiles[item.userId]?.firstName || 'Unknown',
        userName: userProfiles[item.userId]?.userName || 'Unknown',
        imageUrl: item.url //this is where we add image URL!!
      }));
      setItems(formattedItems);
    } catch (error) {
      console.error('Error fetching sparks:', error);
    }
  };

  
  const postToServer = async () => {
    try {
      await fetch('http://localhost:8080/api/sparks', {
        method: "POST",
        body: JSON.stringify({
          userId: currentLoggedInUser.userId,
          body: inputValue,
          date: new Date().toLocaleDateString('en-CA'),
          url: imageUrl
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      alert("Spark posted!");
      setInputValue("");
      setImageUrl(null);
      fetchSparks();
    } catch (error) {
      console.error('Error posting spark:', error);
    }
  };

  useEffect(() => {
    fetchUserProfiles();
    // fetchSparks();
  }, []);

  useEffect(() => {
    if (Object.keys(userProfiles).length > 0){
      fetchSparks();
    }
  }, [userProfiles]);

  return (
    <div id="complete-time-page-body">
    <div className="timeline-container">
      <p id="following">Explore</p>
      
      <p id="display-user">Welcome, {currentLoggedInUser.firstName}!</p>
    
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          autoComplete='off'
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What's happening?"
          className="input-field-lol"
          id="main-input-element"
        />
        <UploadImageToS3WithNativeSdk childToParent={childToParent}/>
        <div id="submit-and-icon">
          {/* <svg id="photo-icon" onClick={handlePhotoIconClick} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
          </svg> */}
          <button onClick={postToServer} className="add-button">
            Post
          </button>
          {/* {"this is  the data : " + data + "this is the image url: " + imageUrl} */}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded preview"
            style={{ display: 'block', marginTop: '10px', maxWidth: '100%', height: '100px', width: '100px' }}
          />
        )}
      </div>
      <div className="timeline">

  {items.map((item, index) => (
    <div className="timeline-item" id="spark-individual-container">
      <div id="user-container">
        <div onClick={handleClick} id="user-links">
          <h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg> 
            &nbsp;{item.name}
          </h4>
          <p>@{item.userName}</p>
          {/* <p>we have the id: {item.id}</p> */}
        </div>
      </div>
      <div className="item-content" key={item.id} onClick={() => handleSparkClick(item.id)}>{item.body}<br/>{item.imageUrl && ( // displays the image if it exists!
        <img 
          src={item.imageUrl} 
          alt="Spark image" 
          id="the-working-image"
          style={{ maxWidth: '45%', height: 'auto', marginTop: '10px' }} 
        />
      )}</div>

      
      <div className="item-timestamp">{item.date}</div>
      <div id="likes-comments">
        <span id="comment-icon-id">{commentIcon}</span>
        <span id="retweet-icon-id">{retweetIcon}</span>
        <span id="like-icon-id">{likeIcon}</span>
      </div>
    </div>
  ))}
</div>

    </div>

<ShowThirdSection/>

</div>


  );
}

export default ShowTimeline;
