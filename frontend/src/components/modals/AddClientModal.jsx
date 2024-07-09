"use client"

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import axios from 'axios';
import { useMainProvider } from '@/providers/MainProvider';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

const AddClientModal = ({ isOpen, onClose, setLoading, client=null }) => {  
  // console.log("Client: ", client.client_name)
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [house_type, setHouse_type] = useState('');
  const [additional_info, setAdditional_info] = useState('');
  const [city, setCity] = useState('');
  const {currentUser} = useMainProvider();
  const owner_id = currentUser?._id

  useEffect(() => {
    if (client?.client_name) {
      setName(client.client_name);
      setEmail(client.email);
      setAddress(client.address);
      setPhoneNumber(client.phone_number);
      setHouse_type(client.house_type);
      setAdditional_info(client.additional_info);
      setCity(client.city);
      return;
    }
  }, [client]);

  const saveClient = async(e) => {
    e.preventDefault()
    setLoading(true);
    if(!email |!name |!address |!city){
      toast.error("You have missing details!");
      return
    }
    const data = {client_name:name, email, address,phone_number,house_type, city, additional_info, owner_id};
    if (client){
      toast.info(`Editing ${email}'s Details`)
    }else{
      toast.info(`Adding ${email} to your organization`)
    }
    if (client){
      try {
        const res = await axios.put(`${BACKEND_URL}/api/clients/${client.pkid}/`, data)
        if (res.status === 200){
          toast.success("Client Edited Successfully")
          setLoading(false); setEmail(''); setName(''); setAddress('');
          setPhoneNumber(''); setHouse_type(''); setAdditional_info(''); setCity('')
          onClose()
        }
      } catch (error) {
        toast.error(error.response.data.message)
        setLoading(false)
      }
    }else{
      try {
        // invite member logic
        const response = await axios.post(`${BACKEND_URL}/api/clients/`, data);
        onClose()
        if (response.status === 201){
          toast.success("Client Created Successfully!")
        }
        setLoading(false); setEmail(''); setName(''); setAddress('');
        setPhoneNumber(''); setHouse_type(''); setAdditional_info(''); setCity('')
      } catch (error) {
        toast.error("Adding your client failed. Try Again!")
      }
    }
  }

  return (
    <div 
      onClick={onClose}
      className={`fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full md:w-1/2 dark:bg-black rounded-xl p-2 md:p-16 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <button onClick={onClose}
          className='absolute top-2 right-2 p-1 px-2 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="">X</p>
        </button>
        <p className="font-semibold pr-2">{client? `Edit ${client.client_name}'s Details` : "Add New Client"}</p>

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
            <p className="">Email</p>
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
        <Button onClick={saveClient} className="mt-2">{client? "Edit": "Add"} Client</Button>
      </div>
    </div>
  );
};

export default AddClientModal;