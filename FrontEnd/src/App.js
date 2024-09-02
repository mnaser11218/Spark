import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import HomePage from './components/HomePage';
import ShowTimeline from './components/TimeLine/TimeLine';
import CreateUserProfile from './components/CreateAccount';
import VerticalNavbar from './components/SparkNav';
import { UserProvider } from './components/CurrentUser';

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

COLOR PALETTE: (DARKEST TO LIGHTEST)
#404258
#474E68
#50577A
#6B728E
*/


const App =()=> {
  return (
  

  <UserProvider>
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
</UserProvider>

//   <Router>
  //   <div style={{ display: 'flex' }}>
  //     <VerticalNavbar />
  //     <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
  //       <Routes>
  //         <Route path="/" element={<HomePage />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/timeline" element={<ShowTimeline />} />
  //         <Route path="/createaccount" element={<CreateUserProfile />} />
          
  //       </Routes>
  //     </div>
  //   </div>
  // </Router>

  );
};

export default App;