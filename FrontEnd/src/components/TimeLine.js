import React from 'react';
import { useState, useEffect } from 'react';
import '../componentStyles/TimeLine.css';

function ShowTimeline(){
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [firstName, setFirstName] = useState(''); 

      
    //display all Sparks 
      const getSparks = ()=> {
        fetch('http://localhost:8080/api/sparks')
        .then(response => response.json())
        .then(data => {
          let formattedItems = data.map(item => ({
            body: item.body,
            date: new Date(item.date).toLocaleString()
          }));
          setItems(formattedItems);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
      
      //just to test if we can retrieve user
      function getFirstNameById (id) {
              fetch(`http://localhost:8080/api/user-profiles/${id}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then(data => {
                document.getElementById("display-user").textContent = "Current User: " + data.firstName;
                setFirstName(data.firstName);
                console.log(data.firstName);
              })
              .catch(error => {
                console.error('Error: ', error);
              });
          }
        
    

    //this gets all Spark entities
    useEffect(() => {
      return(  
        getFirstNameById(2),
      getSparks()
      )
      },[]);

      //to post a Spark to the sparks database 
      function postToServer(){
        fetch('http://localhost:8080/api/sparks', {
            method: "POST",
            body: JSON.stringify({
                body: inputValue
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        window.location.reload();
      }





    return (
        <div className="timeline-container">
            <p id="display-user">X</p>
            <h1>Sparks for You</h1>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What's happening?"
          className="input-field"
        />
        <button onClick={postToServer} className="add-button">
          Post a Spark
        </button>
      </div>
      <div className="timeline">
        {items.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="item-content">{item.body}</div>
            <div className="item-timestamp">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
    )
}

export default ShowTimeline;

