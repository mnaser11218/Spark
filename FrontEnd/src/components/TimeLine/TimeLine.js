import React from 'react';
import { useRef, useState, useEffect } from 'react';
import '../../componentStyles/TimeLine.css';
import { useUser } from '../CurrentUser';

import { useNavigate } from 'react-router';





function ShowTimeline(){


  //this is for the photo icon
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  function handlePhotoIconClick(){
    fileInputRef.current.click();
    // alert("Clicked!")
  }


  //when youre about to post, take file and put it in directory of images
  //
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

  const navigate = useNavigate();

  //this click event takes you to the respective userprofile. uses regex to read the @username of where clicked.
  const handleClick = (event) => {
    const clickedDiv = event.currentTarget;
    const textContent = clickedDiv.textContent;
    const regex = /@(\w+)/;
    const match = textContent.match(regex);
    let userToPass = '';
    if (match) {
        const userName = match[1]; 
        userToPass = userName;
        console.log(userName);
    } else {
        console.log("No username found.");
    }
    navigate(`/userprofilepage/${userToPass}?.user}`);
  } 

const [items, setItems] = useState([]);
const [inputValue, setInputValue] = useState('');
const [firstName, setFirstName] = useState(''); 
const [userProfiles, setUserProfiles]  = useState({});
let obj = {};
const [object, setObject] = useState({})
const { currentLoggedInUser } = useUser(); // Get the current logged-in user


let today = new Date().toLocaleDateString('en-CA');

// const getUserProfiles = () => {
//   fetch('http://localhost:8080/api/user-profiles')
//   .then(response => response.json())
//   .then(data => {
   
//     data.forEach(item => {
//         obj[item.userId] = item;
//       // setObject({...object, })
//     });
//     console.log(obj)

//     //setItems(formattedItems);
//   })
//   .catch(error => console.error('Error fetching data:', error));
   

// }

const getUserProfiles = () => {
  fetch('http://localhost:8080/api/user-profiles')
  .then(response => response.json())
  .then(data => setUserProfiles(data))
  .catch(error => console.error('Error fetching data:', error));
}
const getUserProfileById = (userId) =>userProfiles.find(ele=> ele.userId === userId)


 
 //display all Sparks 
 const getSparks = ()=> {
  console.log(currentLoggedInUser.firstName + " is logged in!");
  fetch('http://localhost:8080/api/sparks')
  .then(response => response.json())
  .then(data => {
    let formattedItems = data.map(item => ({
      body: item.body,
      date: item.date,
      name: getUserProfileById(item.userId).firstName,
      userName: getUserProfileById(item.userId).userName
      //retrieve a spark
      //find out who its related to
      //call the fields (firstname, username, lastname, etc.) of that specific person
    })
    );
    setItems(formattedItems);
  })
  .catch(error => console.error('Error fetching data:', error));
}


//just to test if we can retrieve user
function getFirstNameOfUser () {
  
        document.getElementById("display-user").textContent = "Current User: " + currentLoggedInUser.firstName;
       
}

// method to return first name of user 

// const getFirstNameById = (id) => {
// //console.log( "first name:" + obj[id])
// let object = obj[id]
// for (const property in object) {
//   if(property == 'firstName'){
//     console.log("first name is : " + `${object[property]}`)
//     return `${object[property]}`
//   }
//   console.log(`${property}: ${object[property]}`);
// }
// }

// // getting user name by userid: 

// const getUserNameById = (id) => {
//   //console.log( "first name:" + obj[id])
//   let object = obj[id]
//   for (const property in object) {
//     if(property == 'userName'){
//       return `${object[property]}`
//     }
//     console.log(`${property}: ${object[property]}`);
//   }
//   }
//to post a Spark to the sparks database 
function postToServer(){

      fetch('http://localhost:8080/api/sparks', {
          method: "POST",
          body: JSON.stringify({
              userId: currentLoggedInUser.userId,
              body: inputValue,
              date: today,
              url: imageUrl
            }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
      alert("Spark posted!");
      getSparks();
      getUserProfiles()
      setInputValue("")
      console.log("The image URL: " + imageUrl)
      // window.location.reload();
}

 

    useEffect(() => {
      return(  
      getUserProfiles(),
      getFirstNameOfUser(),
      // getFirstNameById(),
      getSparks()
      )},[]);

      // const loadFile = function (event){
      //   Document.getElementById("imgBox").style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]) + ")";
      // }

    return (
      <>

        <div className="timeline-container">
                <p id="following">Home</p>

            <p id="display-user">X</p>

      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          autoComplete='off'
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What's happening?"
          className="input-field"
          id="post-spark-input"
        />
        {/* <div id="imgBox">
          <p>div is here</p>
        </div> */}
        {/* <input type="file" accept="image/*" name="image" id="file" style={{display: "block"}} onChange="loadFile(event)"/> */}

        {/* <TextInputWithProgress/> */}

{/* <textarea name="text" rows="14" cols="10" wrap="soft" maxlength="255" style={{overflow:"hidden;", resize:"none;"}}/> */}

      </div>

<div id="submit-and-icon">
      <svg id="photo-icon" onClick={handlePhotoIconClick} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
</svg>
<button onClick={postToServer} className="add-button">
          Post
        </button>
        </div>




 {/* remains hidden until photo is uploaded */}
 <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />

      {/*this is where image is shown the container*/}
      <input
        id="post-spark-input"
        type="text"
        value={imageUrl ? 'Image uploaded!' : ''}
        readOnly
        style={{ display: 'block', marginTop: '10px' }}
      />

      {/* displays the image*/}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded preview"
          style={{ display: 'block', marginTop: '10px', maxWidth: '100%', height: '100px', width: '100px' }}
        />
      )}



    

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
{/* 
          <div>
            <h2>What does this do?</h2>
            <button>meh</button>
          </div> */}

          </>


    
    )
}

export default ShowTimeline;

