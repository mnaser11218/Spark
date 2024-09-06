import React, { useRef, useState, useEffect } from 'react';
import './TimeLine.css';
import { useUser } from '../CurrentUser';
import { useNavigate } from 'react-router';
import UploadImageToS3WithNativeSdk from '../AWS/AWSImages';

function ShowTimeline() {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userProfiles, setUserProfiles] = useState([]);
  const { currentLoggedInUser } = useUser();
  const navigate = useNavigate();

  const likeIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg>

  const commentIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
</svg>



  // Handle file input and image preview
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

  const fetchSparks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sparks');
      const data = await response.json();
      const formattedItems = data.map(item => ({
        body: item.body,
        date: item.date,
        name: userProfiles[item.userId]?.firstName || 'Unknown',
        userName: userProfiles[item.userId]?.userName || 'Unknown',
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
    fetchSparks();
  }, [userProfiles]);

  return (
    <div className="timeline-container">
      <p id="following">Home</p>
      
      <p id="display-user">Current User: {currentLoggedInUser.firstName}</p>
      <UploadImageToS3WithNativeSdk/>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          autoComplete='off'
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What's happening?"
          className="input-field-lol"
          id="plzz"
        />
        <div id="submit-and-icon">
          <svg id="photo-icon" onClick={handlePhotoIconClick} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
          </svg>
          <button onClick={postToServer} className="add-button">
            Post
          </button>
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
          <div key={index} className="timeline-item">
            <div id="user-container">
              <div onClick={handleClick} id="user-links">
<<<<<<< Updated upstream
                <h4><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg> {item.name}</h4>
                <p>@{item.userName}</p>
              </div>
=======
            <h4><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> {item.name}</h4>
            <p>@{item.userName}</p>
            </div>
           
>>>>>>> Stashed changes
            </div>
            <div className="item-content">{item.body}</div>
            <div className="item-timestamp">{item.date}</div>
            <div id="likes-comments">
              <span id="like-icon-id">{likeIcon}</span>
              <span id="comment-icon-id">{commentIcon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowTimeline;
