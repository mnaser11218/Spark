import React from 'react';
import DisplaySearchBar from '../ExplorePage/SearchBar';
import './ThirdSection.css';
import { useNavigate } from 'react-router';
import SparkPage from '../Spark/SparkPage';
import imageForNews from '../Images/hq720 (1).jpg';
import imageForNews2 from '../Images/9E0KvZb.webp';

function ShowThirdSection (){


const navigate = useNavigate();
function handleClickAction(){    
    navigate(`/spark`);
}


    return (

<div id="third-div-section">
  <h1 id="discover-sparks-h1">Discover Sparks</h1>
  <DisplaySearchBar/>

  <div>
    <h3 id="whats-trending">What's Trending?</h3>
    <img src={imageForNews} id="the-image-for-news"/>
    <img src={imageForNews2} id="the-image-for-news-2"/>
  </div>
  {/* <div>
    <button onClick={handleClickAction}>Press me</button>
  </div> */}

  
</div>


    )
}

export default ShowThirdSection;