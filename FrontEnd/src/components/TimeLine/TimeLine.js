import React from 'react';
import { useState, useEffect } from 'react';
import '../../componentStyles/TimeLine.css';
import { useUser } from '../CurrentUser';


function ShowTimeline(){

const [items, setItems] = useState([]);
const [inputValue, setInputValue] = useState('');
const [firstName, setFirstName] = useState(''); 

const { currentLoggedInUser } = useUser(); // Get the current logged-in user



let today = new Date().toLocaleDateString('en-CA');



 
 //display all Sparks 
 const getSparks = ()=> {
  console.log(currentLoggedInUser.firstName + " is logged in!");
  fetch('http://localhost:8080/api/sparks')
  .then(response => response.json())
  .then(data => {
    let formattedItems = data.map(item => ({
      body: item.body,
      date: item.date,
    }));
    setItems(formattedItems);
  })
  .catch(error => console.error('Error fetching data:', error));
}


//just to test if we can retrieve user
function getFirstNameOfUser () {
  
        document.getElementById("display-user").textContent = "Current User: " + currentLoggedInUser.firstName;
       
}



//to post a Spark to the sparks database 
function postToServer(){

      fetch('http://localhost:8080/api/sparks', {
          method: "POST",
          body: JSON.stringify({
              // user_profile_id: 1,
              body: inputValue,
              date: today
            }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
      alert("Spark posted!");
      window.location.reload();
      //setInputValue('');
}

 

    useEffect(() => {
      return(  
      getFirstNameOfUser(),
      getSparks()
      )},[]);

    return (
      

        <div className="timeline-container">
                <p id="following">Following</p>

            <p id="display-user">X</p>

      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What's happening?"
          className="input-field"
        />

        {/* <TextInputWithProgress/> */}

{/* <textarea name="text" rows="14" cols="10" wrap="soft" maxlength="255" style={{overflow:"hidden;", resize:"none;"}}/> */}
      
      </div>
      <button onClick={postToServer} className="add-button">
          Post
        </button>

      <div className="timeline">

        {items.map((item, index) => (
          <div key={index} className="timeline-item">
            <div id="user-container">
            <h4><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> User</h4>
            <p>@UserName</p>
            </div>
            <div className="item-content">{item.body}</div>
            <div className="item-timestamp">{item.date}</div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
</svg> */}
          </div>
        ))}
      </div>
    </div>
    
    )
}

export default ShowTimeline;

