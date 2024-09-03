import React, { useState, useEffect } from 'react';
import '../../componentStyles/SearchBar.css';

const DisplaySearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
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
        className="search-input"
      />
      <div className="results">
        {sparks.length > 0 ? (
          sparks.map((spark) => (
            <div key={spark.id} className="spark-item">
              {spark.body}
            </div>
          ))
        ) : (
          <p id="no-results">No results found</p>
        )}
      </div>
    </div>
  );
};

export default DisplaySearchBar;




// import React, { useState, useEffect } from 'react';
// import '../../componentStyles/SearchBar.css';

// const DisplaySearchBar = ({ endpoint }) => {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState([]);

//     useEffect(() => {
//         if (query.length > 0) {
//             fetch(`${endpoint}?search=${query}`)
//                 .then(response => response.json())
//                 .then(data => setResults(data))
//                 .catch(error => console.error('Error fetching data:', error));
//         } else {
//             setResults([]);
//         }
//     }, [query, endpoint]);

//     return (
//         <div className="search-bar">
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={query}
//                 onChange={e => setQuery(e.target.value)}
//                 className="search-input"
//             />
//             <ul className="search-results">
//                 {results.map((result, index) => (
//                     <li key={index} className="search-item">
//                         {result.body} {/* Adjust this to get data going! */}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default DisplaySearchBar;
