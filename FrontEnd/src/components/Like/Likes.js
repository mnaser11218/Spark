import React, { useState, useEffect } from 'react';
import { error } from "console";

export default function Likes() {
    let like = null;
    function likeIncrementor(){
        if(like === null){
            like = true;
            // make fetch call here
           fetch(`http://localhost:8080/api/likes/likecount/${sparkId}`)
           .then(response =>{
           if(response.ok){
            return response.json()
           }else{
           throw new Error('Terrible request...just terrible')
           }
          })
           .then(data => {
            console.log(data,"Likes collected")
           })
           .catch(error => console.log('ERROR'))

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
            
        }
       
        //if clicked like will turn true the add one 
    }
return (
<div>
<button onClick={likeIncrementor} > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightning-charge" viewBox="0 0 16 16">
<path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z"/>
</svg></button>
  
</div>
)
}



// {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
//   <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
// </svg> */}