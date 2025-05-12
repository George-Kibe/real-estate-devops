"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from "@nextui-org/react";
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { Mail, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

const SendClientAlertModal = ({ property, client, isOpen, onClose }) => {
  // console.log("Current Client: ", client)
  const [emailLoading, setEmailLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  const createProperty = async() => {
    // Implement property creation logic here
    const body = {
      ...property, 
      client_email:client.email, 
      price: parseInt(property?.price.replace(/[^0-9]/g, ""), 10), 
      link: "Not Available"
    }
    // console.log("Body: ", body)
    try {
      const response = await axios.post(`${BACKEND_URL}/drf-api/properties/`, body);
      if (response.status === 201) {
        // console.log("Response Data: ", response.data)
        return response.data.pkid;
      } else {
        console.log("Error creating property")
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  };
  const sendEmail = async() => {
    try {
      setEmailLoading(true)
      // if(property?.pkid){
      //   const body = {name: client?.client_name, email: client?.email, link: `${FRONTEND_URL}/properties/${property?.pkid}`}
      //   const response = await axios.post('/api/send-client-email', body);
      //   if (response.status === 200) {
      //     toast.success("Email sent successfully")
      //     onClose();
      //     return;
      //   }
      //   return;
      // }      
      const pkid = await createProperty();
      if (pkid) {
        const body = {name: client?.client_name, email: client?.email, link: `${FRONTEND_URL}/properties/${pkid}`}
        const response = await axios.post('/api/send-client-email', body);
        if (response.status === 200) {
          toast.success("Email sent successfully")
          onClose();
          return;
        }
      }
    } catch (error) {
      toast.error("Error sending email")
      console.log(error); 
    } finally {
      setEmailLoading(false)
    }
  };
  const sendMessage = async() => {
    // Implement message sending logic here
    try {
      setMessageLoading(true)
      toast.error("Error sending Message. Try Again!")
    } catch (error) {
      toast.error("Error sending Message. Try Again!")
    } finally {
      setMessageLoading(false)
    }
  };
  
  return (
    <div 
      //onClick={onClose}
      className={`z-10 fixed inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-black rounded-xl p-2 md:p-8 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "scale-125 opacity-0"}
          `}
      >
         <button onClick={onClose}
          className='absolute top-0 right-0 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-2">X</p>
        </button>
        
        <Card className="w-72 flex flex-col hover:scale-105 rounded-md" shadow="md">
          <p className="font-semibold mb-4">Share With: {client?.client_name}</p>
          <p className="font-semibold">Property Title: {property?.title}</p>
          <img
            radius="none"
            src={
              property?.images?.length > 0 ? property.images[0]
                : `/images/${Math.floor(Math.random() * 9 + 1)}.jpg`
            }
            className="object-fill w-96 h-48"
          />
          <div className="flex flex-col mt-auto">
            <div className="py-4">
              <p className="">
                Property Address: {property?.postal_code}, {property?.street_address}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2 ">
            {property?.bedrooms}
              <FaBed /> | {property?.bathrooms} <FaBath /> | {property?.area} sqft <BsGridFill />
            </div>
            <p>Price: ${property?.price}</p>
          </div>
        </Card>
        <div className="mt-2 gap-4">
          <Button onClick={sendEmail} className="mr-2">
            <Mail />
              {
                emailLoading ? "Sending..." : "Send Email"
              }
          </Button>
          <Button onClick={sendMessage} className="mr-2">
            <MessageCircle />
              {
                messageLoading ? "Sending..." : "Send Message"
              }
            </Button>
        </div>
      </div>
    </div>
  );
};

export default SendClientAlertModal;