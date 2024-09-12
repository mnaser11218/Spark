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



const AppLayout = () => {
  const location = useLocation();

  const showNavbarRoutes = ['/timeline', '/explore']; //THIS IS WHAT DETERMINES WHO GETS A NAVBAR
  const isProfilePage = location.pathname === '/profilepage';
  const isUserProfileRoute = location.pathname.startsWith('/userprofilepage');
  const isSparkPage = location.pathname.startsWith('/spark');

  //not sure if i need this line of code but im too scared to delete it
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname) || isUserProfileRoute || isProfilePage || isSparkPage;

  //this determines which one should have width styling (sometimes it gets centered when not needed)
  //this stays commented out for now
  const shouldApplyWidth= !isProfilePage && !isUserProfileRoute;

  return (
    // <div style={{ display: 'flex' }}>
    <div>
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
          <Route path="/spark/:sparkToCall" element={<SparkPage/>}/>
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

