import React, { useState, useEffect } from 'react';
import './SearchBar.css';
// import { constants } from 'fs/promises';

const DisplaySearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userProfiles, setUserProfiles] = useState([])
  const [sparks, setSparks] = useState([]);
  let obj = {};

  const fetchUserProfiles = () => {
    fetch('http://localhost:8080/api/user-profiles')
    .then(response => response.json())
    .then(data => setUserProfiles(data)
)
    .catch(error => console.error('Error fetching data:', error));
     
  }
  const getUserProfileById = (userId) =>userProfiles.find(ele=> ele.userId === userId)

  

  useEffect(() => {
    fetchUserProfiles()

    const fetchSparks = async () => {
      if (searchTerm.length > 0) {
        try {
          const response = await fetch(`http://localhost:8080/api/sparks/username/hashtag/${searchTerm}`);
          if (response.ok) {
            const data = await response.json();
            setSparks(data);
          } else {
            console.error('Failed to fetch sparks');
          }
        } catch (error) {
          console.error('Error:', error);
        }
        
      }
      else {
        setSparks([]); 
      }
    };
    const delayDebounceFn = setTimeout(() => {
      fetchSparks();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by hashtag..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input-bar"
      />
      <div className="results">
        {sparks.length > 0 ? (
          sparks.map((spark) => {
            const profile = getUserProfileById(spark.userId)
            return (
            <div key={spark.id} className="spark-item">
              <p id="name-spark-search-id">{profile?.firstName +" "+ profile?.lastName}</p>
              <p id="username-spark-search-id">@{profile?.userName}</p>
              {spark.body} <br/>
              {spark.date}
            </div>
            )}
          )
        ) : (
          <p id="no-results">No results found</p>
        )}
      </div>
    </div>
  );
};

export default DisplaySearchBar;
