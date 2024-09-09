import React from 'react';
import DisplaySearchBar from '../ExplorePage/SearchBar';
import './ThirdSection.css';
import { useNavigate } from 'react-router';
import SparkPage from '../Spark/SparkPage';

function ShowThirdSection (){



const navigate = useNavigate();
function handleClickAction(){    
    navigate(`/spark`);
}


    return (

<div id="third-div-section">
  <h1 id="discover-sparks-h1">Discover Sparks</h1>
  <DisplaySearchBar/>
  {/* <div>
    <button onClick={handleClickAction}>Press me</button>
  </div> */}

  
</div>


    )
}

export default ShowThirdSection;