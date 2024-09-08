import React, { useRef, useState, useEffect } from 'react';
import './TimeLine.css';
import { useUser } from '../CurrentUser';
import { useNavigate } from 'react-router';
import UploadImageToS3WithNativeSdk from '../AWS/AWSImages';
import ShowThirdSection from './ThirdSection';
import Like from '../Like/Likes'
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

const gifIcon = <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-filetype-gif" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2H9v-1h3a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.278 13.124a1.4 1.4 0 0 0-.14-.492 1.3 1.3 0 0 0-.314-.407 1.5 1.5 0 0 0-.48-.275 1.9 1.9 0 0 0-.636-.1q-.542 0-.926.229a1.5 1.5 0 0 0-.583.632 2.1 2.1 0 0 0-.199.95v.506q0 .408.105.745.105.336.32.58.213.243.533.377.323.132.753.132.402 0 .697-.111a1.29 1.29 0 0 0 .788-.77q.097-.261.097-.551v-.797H1.717v.589h.823v.255q0 .199-.09.363a.67.67 0 0 1-.273.264 1 1 0 0 1-.457.096.87.87 0 0 1-.519-.146.9.9 0 0 1-.305-.413 1.8 1.8 0 0 1-.096-.615v-.499q0-.547.234-.85.237-.3.665-.301a1 1 0 0 1 .3.044q.136.044.236.126a.7.7 0 0 1 .17.19.8.8 0 0 1 .097.25zm1.353 2.801v-3.999H3.84v4h.79Zm1.493-1.59v1.59h-.791v-3.999H7.88v.653H6.124v1.117h1.605v.638z"/>
</svg>

const calendarIcon = <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
<path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>

const pinIcon = <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>

const verifiedIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2c74b3" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
<path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
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
    <div className="timeline-container col-sm-8">
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
        <span id="gif-icon">{gifIcon}</span>
        <span id="calendar-icon">{calendarIcon}</span>
        <span id="pin-icon">{pinIcon}</span>

        <div id="submit-and-icon">
          {/* <svg id="photo-icon" onClick={handlePhotoIconClick} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
          </svg> */}
          <button onClick={postToServer} className="add-button" id="post-a-spark-button">
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
          <h4 id="name-name">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg> 
            &nbsp;&nbsp;&nbsp;{item.name}
          </h4>
          <span id="v-icon">{verifiedIcon}</span>
          <p id="at-symbol">@{item.userName}</p>
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

      {<Like sparkId={item.id}/>}
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
