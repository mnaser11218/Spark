import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import HomePage from './components/HomePage';
import ShowTimeline from './components/TimeLine/TimeLine';
import CreateUserProfile from './components/CreateAccount';
import VerticalNavbar from './components/SparkNav';
import { UserProvider } from './components/CurrentUser';
import ProfilePage from './components/ProfilePage';
import UserProfilePage from './components/UsersProfilePage';
import ShowTimelinePreview from './components/TimeLine/TimeLineNonUser';
import ExplorePage from './components/ExplorePage';

const AppLayout = () => {
  const location = useLocation();
  
  const isProfileRoute = location.pathname === '/profilepage' || location.pathname.startsWith('/userprofilepage');

  return (
    <div style={{ display: 'flex' }}>
      <VerticalNavbar />
      <div style={{ marginLeft: '250px', padding: '0px', width: isProfileRoute ? 'auto' : '100%' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/timeline" element={<ShowTimeline />} />
          <Route path="/createaccount" element={<CreateUserProfile />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/userprofilepage/:user" element={<UserProfilePage />} />
          <Route path="/preview" element={<ShowTimelinePreview />} />
          <Route path="/explore" element={<ExplorePage/>}/>
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppLayout />
      </Router>
    </UserProvider>
  );
};

export default App;


// import React from 'react';
// import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
// import Login from './components/Login/Login';
// import HomePage from './components/HomePage';
// import ShowTimeline from './components/TimeLine/TimeLine';
// import CreateUserProfile from './components/CreateAccount';
// import VerticalNavbar from './components/SparkNav';
// import { UserProvider } from './components/CurrentUser';
// import ProfilePage from './components/ProfilePage';
// import UserProfilePage from './components/UsersProfilePage';
// import ShowTimelinePreview from './components/TimeLine/TimeLineNonUser';

// /*
// Twitter Application (twitter clone)
// Tasks to Fulfill
// - As a user, (not logged in) I
// can view list of all tweets from all users
// - As a user, (logged in) I
// can post a new tweet (limited to 255 chars)
// can view list of all tweets
// can see tweets by a specific user
// can use "@" notation to direct a tweet to another user
// can add images to tweets
// all new tweets appear in timeline as they come in
// can search by "#" hashtags

// COLOR PALETTE: (DARKEST TO LIGHTEST)
// #404258
// #474E68
// #50577A
// #6B728E
// */


// const App =()=> {

//   const location = useLocation();

//   const isProfileRoute = location.pathname === '/profilepage' || location.pathname.startsWith('/userprofilepage');


//   return (
  

//   <UserProvider>
//   <Router>
//     <div style={{ display: 'flex' }}>
//       <VerticalNavbar />
//       {/* <div style={{ marginLeft: '250px', padding: '0px', width: '100%'}}> */}
//       <div style={{ marginLeft: '250px', padding: '0px', width: isProfileRoute ? 'auto' : '100%' }}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/timeline" element={<ShowTimeline />} />
//           <Route path="/createaccount" element={<CreateUserProfile />} />
//           <Route path="/profilepage" element={<ProfilePage/>}/>
//           <Route path="/userprofilepage/:user" element={<UserProfilePage/>}/>
//           <Route path="/preview" element={<ShowTimelinePreview/>}/>
//           </Routes>
//           </div>
    
//     </div>
//   </Router>
// </UserProvider>


//   );
// };

// export default App;