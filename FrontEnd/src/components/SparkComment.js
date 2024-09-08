import React from 'react'
import { useState, useEffect } from 'react';

function SparkComment({sparkId}) {
  const [comments, setComments] = useState([])
  useEffect(() => {
    const fetchSparkById = async () => {
      try {
      
        const sparkResponse = await fetch(`http://localhost:8080/api/sparks/comments/${sparkId}`);
        const data = await sparkResponse.json();
        const formattedItems = data.map(item => ({
          id: item.id,
          body: item.body,
          date: item.date,
          // name: userProfiles[item.userId]?.firstName || 'Unknown',
          // userName: userProfiles[item.userId]?.userName || 'Unknown',
          imageUrl: item.url //this is where we add image URL!!
        }));
        setComments(formattedItems);
        //setComments(sparkData);

        //THIS IS NOT WORKING CURRENTLY
        // const userProfileResponse = await fetch(`http://localhost:8080/api/user-profiles/${sparkData.userId}`);
        // const userProfileData = await userProfileResponse.json();
        // setUserProfile(userProfileData);
      } catch (error) {
        console.error('Error fetching spark or user profile:', error);
      }
    };

    fetchSparkById();
  }, []);
  return (
    <div>
    {comments.map(ele=>{
       return <div>heello {ele.body}</div>
      })
    }
    </div>
  )
}

export default SparkComment