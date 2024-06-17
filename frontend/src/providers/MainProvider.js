'use client'
/* eslint-disable react/react-in-jsx-scope */
import {createContext, useContext, useEffect, useState} from 'react';
import {SessionProvider} from "next-auth/react";

const MainContext = createContext({});

export function MainProvider({children}) {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState('');
  const [properties, setProperties] = useState([]);
  
  return (
    <MainContext.Provider
      value={{
        user, setUser,
        location, setLocation,
        properties, setProperties
      }}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </MainContext.Provider>
  );
}

export const useMainProvider = () => useContext(MainContext);