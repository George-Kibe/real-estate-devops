'use client'
/* eslint-disable react/react-in-jsx-scope */
import {createContext, useContext, useState} from 'react';

const MainContext = createContext({});

export function MainProvider({children}) {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState('Minnesota');
  const [customProperties, setCustomProperties] = useState([]);
  
  return (
    <MainContext.Provider
      value={{
        user, setUser,
        location, setLocation,
        customProperties, setCustomProperties
      }}>
        {children}
    </MainContext.Provider>
  );
}

export const useMainProvider = () => useContext(MainContext);