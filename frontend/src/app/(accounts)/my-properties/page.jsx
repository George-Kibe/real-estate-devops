"use client"

import AnimatedText from "@/components/AnimatedText";
import FavoriteProperty from "@/components/FavoriteProperty";
import { useMainProvider } from "@/providers/MainProvider";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default function FavoritesPage() {
  const {currentUser} = useMainProvider();
  const [myProperties, setMyProperties] = useState([]);

  const getMyproperties = async () => {
    const response = await axios.get(`${BACKEND_URL}/drf-api/properties?client_email=${currentUser.email}`);
    setMyProperties(response.data.results);
  }

  useEffect(() => {
    getMyproperties()
  }, [currentUser._id])

  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"My Properties"} />
      {!myProperties.length &&
        <div className="text-center">
          <h1 className="text-2xl font-bold">You don't have any properties</h1>
        </div>}
      {myProperties.length &&
        <div className="container items-center justify-around">
          <Flex flexWrap='wrap' className='flex flex-wrap justify-center gap-6'>
          {myProperties.map((property) => (
            <FavoriteProperty 
              getMyproperties={getMyproperties}
              property={property} 
              key={property.id} 
           />
          ))}
          </Flex>
        </div>
      }
    </div>
  );
}