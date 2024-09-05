import React from 'react';
import './ExplorePage.css';
import DisplaySearchBar from './SearchBar';


function ExplorePage() {
    return (
        <div className="explore-page">
            <header className="explore-header">
                <h3 className="explore-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg> 
                    Explore Sparks
                </h3>
                <DisplaySearchBar/>
            </header>
            <main className="explore-content">
                {/* Add content here as needed */}
            </main>
        </div>
    );
}

export default ExplorePage;
