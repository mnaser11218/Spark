import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../HomePage/HomeStyle.css';



const PreviewButton = () => {
  const navigate = useNavigate(); 
 
  const handleClick = () => {
    console.log('Preview button clicked'); 
    navigate('/preview');
  };



  return (
    <div >
      <button className="btn btn-primary" onClick={handleClick}>View Sparks</button>
      <br/>
      
    
    </div>
  );
};
export default PreviewButton;
