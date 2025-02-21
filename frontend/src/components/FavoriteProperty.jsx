"use client"
import { Card } from "@nextui-org/react";
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {Star} from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const FavoriteProperty = ({ property, getMyproperties }) => {
  const [loading, setLoading] = useState(false);

  const confirmFavorite = async () => {
    try {
      const response = await axios.put(`${BACKEND_URL}/drf-api/properties/${property.pkid}/`, {
        title: property.title,
        client_confirm_favorite: true
      })
      toast.success('Property confirmed as favorite');
      await getMyproperties();
    } catch (error) {
      console.log('error', error);
      toast.error('Error confirming property as favorite')
    }finally {
      setLoading(false);
    }
  }
  const unDoConfirmFavorite = async () => {
    try {
      const response = await axios.put(`${BACKEND_URL}/drf-api/properties/${property.pkid}/`, {
        title: property.title,
        client_confirm_favorite: false
      })
      toast.success('Property removed from favorites');
      await getMyproperties();
    } catch (error) {
      console.log('error', error);
      toast.error('Error removing property from favorites')
    }finally {
      setLoading(false);
    }
  }
  return (
    <Card className="w-72 flex flex-col hover:scale-105 rounded-md" shadow="md">
      <img
        radius="none"
        src={
          property?.images?.length > 0 ? property.images[0]
            : `/images/${Math.floor(Math.random() * 9 + 1)}.jpg`
        }
        className="object-fill w-96 h-48"
      />
      <div className="flex flex-col mt-auto">
        <div className="p-4">
          <p className="font-semibold">{property.title}</p>
          <p className="">
            {property.postal_code}, {property.street_address}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2 ">
        {property.bedrooms}
          <FaBed /> | {property.bathrooms} <FaBath /> | {property.area} sqft <BsGridFill />
        </div>
        <div className="bg-black/80 dark:bg-white/80 rounded-md p-4 text-white dark:text-black flex justify-between">
          <p>${property.price}</p>
          {
            property.client_confirm_favorite ? 
            <Button className="text-green-500" onClick={unDoConfirmFavorite}> 
              <Star className="w-4 h-4 mr-2 text-green-500" /> Confirmed Favorite</Button> 
            :<Button onClick={confirmFavorite}>
            {
               loading ? 'Loading...' : ' Confirm Favorite'
            }
           </Button>
          }
        </div>
      </div>
    </Card>
  );
};

export default FavoriteProperty;