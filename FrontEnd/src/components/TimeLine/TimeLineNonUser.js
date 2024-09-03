import React from 'react';
import { useState, useEffect } from 'react';
import '../../componentStyles/TimeLine.css';
import { useUser } from '../CurrentUser';

import { useNavigate } from 'react-router';




function ShowTimelinePreview(){

  const navigate = useNavigate();

  //this click event takes you to the respective userprofile. uses regex to read the @username of where clicked.
  const handleClick = (event) => {
    // const clickedDiv = event.currentTarget;
    // const textContent = clickedDiv.textContent;
    // const regex = /@(\w+)/;
    // const match = textContent.match(regex);
    // let userToPass = '';
    // if (match) {
    //     const userName = match[1]; 
    //     userToPass = userName;
    //     console.log(userName);
    // } else {
    //     console.log("No username found.");
    // }
    // navigate(`/userprofilepage/${userToPass}?.user}`);
    alert("Login to see more profiles and Sparks!")
  } 

const [items, setItems] = useState([]);
const [inputValue, setInputValue] = useState('');
const [firstName, setFirstName] = useState(''); 
const [userProfiles, setUserProfiles]  = useState({});
let obj = {};
// const { currentLoggedInUser } = useUser(); // Get the current logged-in user


let today = new Date().toLocaleDateString('en-CA');

const getUserProfiles = () => {
  fetch('http://localhost:8080/api/user-profiles')
  .then(response => response.json())
  .then(data => {
   
    data.forEach(item => {
      console.log("hellow")
      // let userId = item.userId;
     // setUserProfiles({...userProfiles, {item.userId: item} })
       obj[item.userId] = item;
       console.log(obj)
    //  Object.assign(obj, {item.userId: item});
 
    
      //retrieve a spark
      //find out who its related to
      //call the fields (firstname, username, lastname, etc.) of that specific person
    });
    console.log(obj)

    //setItems(formattedItems);
  })
  .catch(error => console.error('Error fetching data:', error));
   

}

 
 //display all Sparks 
 const getSparks = ()=> {
//   console.log(currentLoggedInUser.firstName + " is logged in!");
  fetch('http://localhost:8080/api/sparks')
  .then(response => response.json())
  .then(data => {
    let formattedItems = data.map(item => ({
      body: item.body,
      date: item.date,
      name: getFirstNameById(item.userId),
      userName: getUserNameById(item.userId)
      //retrieve a spark
      //find out who its related to
      //call the fields (firstname, username, lastname, etc.) of that specific person
    })
    );
    setItems(formattedItems);
  })
  .catch(error => console.error('Error fetching data:', error));
}


// //just to test if we can retrieve user
// function getFirstNameOfUser () {
  
//         document.getElementById("display-user").textContent = "Current User: " + currentLoggedInUser.firstName;
       
// }

// method to return first name of user 

const getFirstNameById = (id) => {
//console.log( "first name:" + obj[id])
let object = obj[id]
for (const property in object) {
  if(property == 'firstName'){
    console.log("first name is : " + `${object[property]}`)
    return `${object[property]}`
  }
  console.log(`${property}: ${object[property]}`);
}
}

// getting user name by userid: 

const getUserNameById = (id) => {
  //console.log( "first name:" + obj[id])
  let object = obj[id]
  for (const property in object) {
    if(property == 'userName'){
      return `${object[property]}`
    }
    console.log(`${property}: ${object[property]}`);
  }
  }
//to post a Spark to the sparks database 
function postToServer(){
    alert("Login to post Sparks and view more!")

//       fetch('http://localhost:8080/api/sparks', {
//           method: "POST",
//           body: JSON.stringify({
//               userId: currentLoggedInUser.userId,
//               body: inputValue,
//               date: today
//             }),
//           headers: {
//               "Content-type": "application/json; charset=UTF-8"
//           }
//       })
//       alert("Spark posted!");
//       getSparks();
//       getUserProfiles()
//       setInputValue("")
//       // window.location.reload();
}

 

    useEffect(() => {
      return(  
      getUserProfiles(),
    //   getFirstNameOfUser(),
      // getFirstNameById(),
      getSparks()
      )},[]);

    return (
      

        <div className="timeline-container">
                <p id="following">Sign Up to Start Sparking!</p>

            {/* <p id="display-user">X</p> */}

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
              <div onClick={handleClick} id="user-links">
            <h4><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg> {item.name}</h4>
            <p>@{item.userName}</p>
            </div>
            </div>
            <div className="item-content">{item.body}</div>
            <div className="item-timestamp">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
    
    )
}

export default ShowTimelinePreview;

