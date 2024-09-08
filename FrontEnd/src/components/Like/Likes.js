import React, { useState, useEffect } from 'react';
import { useUser } from '../CurrentUser';

// import { error } from "console";

export default function Likes({sparkId}) {
    const [like, setLike] = useState(null)
    const [likecount, setLikecount] = useState(0)
    const { currentLoggedInUser } = useUser();
    // let sparkId = null;
    const post = async () => {
      console.log("im clicking the post like")
      if(like === null){
        setLike(true)
      try {
              await fetch(`http://localhost:8080/api/likes/userprofilespark/${currentLoggedInUser.userName}/spark/${sparkId}`, {
                method: "POST",
                body: JSON.stringify({
                  liked: 1,
                  dislike: 0,
                  spark: null,
                  userProfile: null
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
              });
              alert("post liked!");
              console.log("post liked")
            } catch (error) {
              console.error('Error posting spark:', error);
            }
          }
          fetchLikes()
          };
          const fetchLikes = async () => {
            try {
              const response = await fetch(`http://localhost:8080/api/likes/likecount/${sparkId}`);
              const data = await response.json();
              const formattedItems = setLikecount(data);
            } catch (error) {
              console.error('Error fetching sparks:', error);
            }
          };
          useEffect(() => {
            fetchLikes()
          }, [likecount]);
        
 
return (
<div>
<button onClick={post}> {likecount}</button>
  
</div> 
)
};