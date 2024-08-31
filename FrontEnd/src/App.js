import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import ShowTimeline from './components/TimeLine';
import CreateUserProfile from './components/CreateAccount';
import VerticalNavbar from './components/SparkNav';

/*
Twitter Application (twitter clone)
Tasks to Fulfill
- As a user, (not logged in) I
can view list of all tweets from all users
- As a user, (logged in) I
can post a new tweet (limited to 255 chars)
can view list of all tweets
can see tweets by a specific user
can use "@" notation to direct a tweet to another user
can add images to tweets
all new tweets appear in timeline as they come in
can search by "#" hashtags

CONSISTENT COLOR SCHEME THROUGHOUT APP:
#92C7CF
#AAD7D9
#FBF9F1
#E5E1DA
*/

//hi


const App =()=> {
  return (
    <Router>
    <div style={{ display: 'flex' }}>
      <VerticalNavbar />
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/timeline" element={<ShowTimeline />} />
          <Route path="/createaccount" element={<CreateUserProfile />} />
          
        </Routes>
      </div>
    </div>
  </Router>
  );
};
export default App;