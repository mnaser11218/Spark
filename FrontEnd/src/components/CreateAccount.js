import React, { useState } from 'react';
import '../componentStyles/CreateAccount.css'; 

function CreateAccount() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); 

        const user = {
            firstName,
            lastName,
            userName,
            password
        };

        fetch('http://localhost:8080/api/user-profiles', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('ERROR!');
            }
            return response.json();
        })
        .then(data => {
            alert('Spark account successfully created! ⚡️');
            //this clears input values after successful post
            setFirstName('');
            setLastName('');
            setUsername('');
            setPassword('');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to create account');
        });
    };

    return (
        <div className="create-account-container">
            <h2>Create your account</h2>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default CreateAccount;




//




// import React, { useState } from 'react';
// import '../componentStyles/CreateAccount.css'

// function CreateUserProfile() {
//   const [userName, setUserName] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     //coded this to get the actual date
//    const createdDate = new Date().toISOString().split('T')[0]; 


//     const userProfile = {
//       userName,
//       firstName,
//       lastName,
//       createdDate,
//     };

//     try {
//       const response = await fetch('http://localhost:8080/api/user-profiles', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userProfile),
//       });

//       if (response.ok) {
//         alert('Account created! Welcome to SPARK ⚡️');
//       } else {
//         alert('Failed to create user profile.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error creating account. Please try again later.');
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="heading">Create Spark Account</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <div className="formGroup">
//           <label className="label">Username</label>
//           <input
//             type="text"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             required
//             className="input"
//           />
//         </div>
//         <div className="formGroup">
//           <label className="label">First Name</label>
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//             className="input"
//           />
//         </div>
//         <div className="formGroup">
//           <label className="label">Last Name</label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//             className="input"
//           />
//         </div>
//         <button type="submit" className="button">
//           Join Spark
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateUserProfile;
