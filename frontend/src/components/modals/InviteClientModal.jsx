"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMainProvider } from '@/providers/MainProvider';
// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const BACKEND_URL = "http://localhost:8000"

const InviteClientModal = ({ isOpen, onClose, setLoading }) => {  
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [house_type, setHouse_type] = useState('');
  const [additional_info, setAdditional_info] = useState('');
  const [city, setCity] = useState('');
  const {currentUser} = useMainProvider();
  const owner_id = currentUser?._id

  const inviteClient = async(e) => {
    e.preventDefault()
    setLoading(true);
    if(!email |!name |!address |!city){
      toast.error("You have missing details!");
      return
    }
    const data = {client_name:name, email, address,phone_number,house_type, city, additional_info, owner_id};
    toast.info(`Adding ${email} to your organization`)
    try {
      // invite member logic
      const response = await axios.post(`${BACKEND_URL}/api/clients/`, data);
      onClose()
      if (response.status === 201){
        toast.success("Client Created Successfully!")
      }
      setLoading(false);
      setEmail('');
      setName('')
    } catch (error) {
      toast.error("Adding your client failed. Try Again!")
    }
  }

  return (
    <div 
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-black rounded-xl shadow p-8 transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <button onClick={onClose}
          className='absolute top-2 right-2 p-1 px-2 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="">X</p>
        </button>
        <p className="font-semibold pr-2">Add New Client</p>

        <div className="flex flex-col md:flex-wrap">
        <div className="">
            <p className="">Name</p>
            <input type="text" placeholder='Name' 
              value={name}
              onChange={ev => setName(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">Add Email</p>
            <input type="email" placeholder='Email' 
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">Address</p>
            <input type="text" placeholder='Address' 
              value={address}
              onChange={ev => setAddress(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">Phone Number</p>
            <input type="text" placeholder='Phone Number' 
              value={phone_number}
              onChange={ev => setPhoneNumber(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">House Type </p>
            <input type="text" placeholder='House Type' 
              value={house_type}
              onChange={ev => setHouse_type(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">City</p>
            <input type="text" placeholder='City' 
              value={city}
              onChange={ev => setCity(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">Additional Information</p>
            <textarea type="text" placeholder='Additional Information' 
              value={additional_info} 
              onChange={ev => setAdditional_info(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        </div>
        <Button onClick={inviteClient} className="mt-2">Add Client</Button>
      </div>
    </div>
  );
};

export default InviteClientModal;