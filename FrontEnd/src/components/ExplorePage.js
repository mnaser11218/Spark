import React from 'react';
import '../componentStyles/ExplorePage.css';
import DisplaySearchBar from './TimeLine/SearchBar';

function ExplorePage (){
    return (
        <>
        <h1>the explore page here</h1>

        <DisplaySearchBar endpoint="http://localhost:8080/api/sparks"/>
        </>

    )
}

export default ExplorePage;