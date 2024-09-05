import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentLoggedInUser, setCurrentLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
