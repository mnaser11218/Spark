import React, { useState, useEffect } from 'react';
import '../../componentStyles/SearchBar.css';

const DisplaySearchBar = ({ endpoint }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.length > 0) {
            fetch(`${endpoint}?search=${query}`)
                .then(response => response.json())
                .then(data => setResults(data))
                .catch(error => console.error('Error fetching data:', error));
        } else {
            setResults([]);
        }
    }, [query, endpoint]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="search-input"
            />
            <ul className="search-results">
                {results.map((result, index) => (
                    <li key={index} className="search-item">
                        {result.body} {/* Adjust this to get data going! */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplaySearchBar;
