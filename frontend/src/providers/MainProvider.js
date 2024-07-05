'use client';
import React, { createContext, useContext } from 'react';
import useLocalStorage from './useLocalStorage';

const MainContext = createContext({});

export function MainProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const [orgMode, setOrgMode] = useLocalStorage('orgMode', false);
  const [location, setLocation] = useLocalStorage('location', 'Minnesota');
  const [customProperties, setCustomProperties] = useLocalStorage('customProperties', []);
  const [favoriteProperties, setFavoriteProperties] = useLocalStorage('favoriteProperties', []);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [loading, setLoading] = useLocalStorage('loading', false);
  const [tempUser, setTempUser] = useLocalStorage('tempUser', {});

  return (
    <MainContext.Provider
      value={{
        user, setUser,
        orgMode, setOrgMode,
        location, setLocation,
        customProperties, setCustomProperties,
        favoriteProperties, setFavoriteProperties,
        currentUser, setCurrentUser,
        loading, setLoading,
        tempUser, setTempUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export const useMainProvider = () => useContext(MainContext);
