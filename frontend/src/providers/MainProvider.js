'use client';
import React, { createContext, useContext } from 'react';
import useLocalStorage from './useLocalStorage';

const MainContext = createContext({});

export function MainProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);
  const [orgMode, setOrgMode] = useLocalStorage('orgMode', false);
  const [sellerMode, setSellerMode] = useLocalStorage('sellerMode', false);
  const [adminMode, setAdminMode] = useLocalStorage('adminMode', false);
  const [location, setLocation] = useLocalStorage('location', 'Minnesota');
  const [customProperties, setCustomProperties] = useLocalStorage('customProperties', []);
  const [favoriteProperties, setFavoriteProperties] = useLocalStorage('favoriteProperties', []);
  const [selectedBillings, setSelectedBillings] = useLocalStorage('selectedBillings', []);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [currentClient, setCurrentClient] = useLocalStorage('currentClient', null);
  const [loading, setLoading] = useLocalStorage('loading', false);
  const [tempUser, setTempUser] = useLocalStorage('tempUser', {});
  const [tempProperty, setTempProperty] = useLocalStorage('tempProperty', {});
  const [tempSubscription, setTempSubscription] = useLocalStorage('tempSubscription', "");

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
        sellerMode, setSellerMode,
        adminMode, setAdminMode,
        currentClient, setCurrentClient,
        tempProperty, setTempProperty,
        selectedBillings, setSelectedBillings,
        tempSubscription, setTempSubscription,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export const useMainProvider = () => useContext(MainContext);
