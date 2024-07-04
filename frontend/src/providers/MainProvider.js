'use client';
import React, { createContext, useContext } from 'react';
import useLocalStorage from './useLocalStorage';

const MainContext = createContext({});

export function MainProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const [location, setLocation] = useLocalStorage('location', 'Minnesota');
  const [customProperties, setCustomProperties] = useLocalStorage('customProperties', []);
  const [favoriteProperties, setFavoriteProperties] = useLocalStorage('favoriteProperties', []);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [loading, setLoading] = useLocalStorage('loading', false);
  const [organization, setOrganization] = useLocalStorage('organization', {});

  return (
    <MainContext.Provider
      value={{
        user, setUser,
        location, setLocation,
        customProperties, setCustomProperties,
        favoriteProperties, setFavoriteProperties,
        currentUser, setCurrentUser,
        loading, setLoading,
        organization, setOrganization,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export const useMainProvider = () => useContext(MainContext);
