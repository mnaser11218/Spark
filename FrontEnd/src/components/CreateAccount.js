import React, { useState } from 'react';
import '../componentStyles/CreateAccount.css'

function CreateUserProfile() {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    //coded this to get the actual date
   const createdDate = new Date().toISOString().split('T')[0]; 


    const userProfile = {
      userName,
      firstName,
      lastName,
      createdDate,
    };

    try {
      const response = await fetch('http://localhost:8080/api/user-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });

      if (response.ok) {
        alert('Account created! Welcome to SPARK ⚡️');
      } else {
        alert('Failed to create user profile.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating account. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Create Spark Account</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label className="label">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">
          Join Spark
        </button>
      </form>
    </div>
  );
}

export default CreateUserProfile;
