import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import ShowTimeline from './components/TimeLine/TimeLine';
import CreateUserProfile from './components/CreateAccount/CreateAccount';
import VerticalNavbar from './components/Navbar/SparkNav';
import { UserProvider } from './components/CurrentUser';
import ProfilePage from './components/ProfilePage/ProfilePage';
import UserProfilePage from './components/ProfilePage/UsersProfilePage';
import ShowTimelinePreview from './components/PreviewPage/PreviewPage';
import ExplorePage from './components/ExplorePage/ExplorePage';
import SparkPage from './components/Spark/SparkPage';

const AppLayout = () => {
  const location = useLocation();

  const showNavbarRoutes = ['/timeline', '/explore', '/spark']; //THIS IS WHAT DETERMINES WHO GETS A NAVBAR
  const isProfilePage = location.pathname === '/profilepage';
  const isUserProfileRoute = location.pathname.startsWith('/userprofilepage');

  //not sure if i need this line of code but im too scared to delete it
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname) || isUserProfileRoute || isProfilePage;

  //this determines which one should have width styling (sometimes it gets centered when not needed)
  const shouldApplyWidth = !isProfilePage && !isUserProfileRoute;

  return (
    <div style={{ display: 'flex' }}>
      {shouldShowNavbar && <VerticalNavbar />} 
      <div
        style={{
          marginLeft: shouldShowNavbar ? '250px' : '0px',  
          padding: '0px',
          // Apply width (CONDITIONALLY!!)
          width: shouldApplyWidth ? 'calc(100% - 250px)' : 'auto',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/timeline" element={<ShowTimeline />} />
          <Route path="/createaccount" element={<CreateUserProfile />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/userprofilepage/:user" element={<UserProfilePage />} />
          <Route path="/preview" element={<ShowTimelinePreview />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/spark" element={<SparkPage/>}/>
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
// import ExplorePage from './components/ExplorePage';

// const AppLayout = () => {
//   const location = useLocation();

//   // Define the routes that should display the VerticalNavbar
//   const showNavbarRoutes = ['/timeline', '/profilepage', '/explore'];
//   const isUserProfileRoute = location.pathname.startsWith('/userprofilepage');

//   // Check if the current route is one of those that need the navbar
//   const shouldShowNavbar = showNavbarRoutes.includes(location.pathname) || isUserProfileRoute;

//   return (
//     <div style={{ display: 'flex' }}>
//       {shouldShowNavbar && <VerticalNavbar />} 
//       <div
//         style={{
//           marginLeft: shouldShowNavbar ? '250px' : '0px',  
//           padding: '0px',
//           width: shouldShowNavbar ? 'calc(100% - 250px)' : '100%', 
//         }}
//       >
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/timeline" element={<ShowTimeline />} />
//           <Route path="/createaccount" element={<CreateUserProfile />} />
//           <Route path="/profilepage" element={<ProfilePage />} />
//           <Route path="/userprofilepage/:user" element={<UserProfilePage />} />
//           <Route path="/preview" element={<ShowTimelinePreview />} />
//           <Route path="/explore" element={<ExplorePage />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };


// const App = () => {
//   return (
//     <UserProvider>
//       <Router>
//         <AppLayout />
//       </Router>
//     </UserProvider>
//   );
// };

// export default App;




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
