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
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [house_type, setHouse_type] = useState('');
  const [additional_info, setAdditional_info] = useState('');
  const [staff_id, setStaff_id] = useState('');
  const [city, setCity] = useState('');
  const {currentUser} = useMainProvider();
  const owner_id = currentUser?._id;
  const members = currentUser?.members;
  // console.log("Staff ID: ", staff_id)

  const handleClose = () => {
    onClose();
    setLoading(false); setEmail(''); setFirst_name(''); setLast_name(''); setAddress('');
    setPhoneNumber(''); setHouse_type(''); setAdditional_info(''); setCity('');
    setStaff_id(''); setFirst_name(''); setLast_name('');
  }

  useEffect(() => {
    if (client?.client_name) {
      setFirst_name(client.first_name);
      setLast_name(client.last_name);
      setEmail(client.email);
      setAddress(client.address);
      setPhoneNumber(client.phone_number);
      setHouse_type(client.house_type);
      setAdditional_info(client.additional_info);
      setCity(client.city);
      setStaff_id(client.staff_id);
      return;
    }
  }, [client]);
  
  const handleSelectChange = (event) => {
    //console.log("Selected ID: ",event.target.value);
    setStaff_id(event.target.value)
  };

  const saveClient = async(e) => {
    e.preventDefault()
    if(!email |!first_name |!last_name |!address |!city){
      toast.error("You have missing details!");
      return
    }
    setLoading(true);
    const data = {first_name, last_name, client_name:first_name + " " + last_name, email, address,phone_number,house_type, city, staff_id, additional_info, owner_id};

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
          setLoading(false); setEmail(''); setFirst_name(''); setLast_name(''); setAddress('');
          setPhoneNumber(''); setHouse_type(''); setAdditional_info(''); setCity('');
          setStaff_id('');
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
        setLoading(false); setEmail(''); setFirst_name(''); setLast_name(''); setAddress('');
        setPhoneNumber(''); setHouse_type(''); setAdditional_info(''); setCity('');
        setStaff_id('');
      } catch (error) {
        toast.error("Adding your client failed. Try Again!")
      }
    }
  }

  return (
    <div 
      // onClick={handleClose}
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={` h-[90vh] w-full overflow-auto bg-white p-4 rounded-md
          md:w-1/2 dark:bg-black md:p-16 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <button onClick={handleClose}
          className='absolute top-2 right-2 p-1 px-2 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-4">X</p>
        </button>
        <p className="font-semibold pr-2 text-2xl">{client? `Update ${client.client_name}'s Details` : "Add New Client"}</p>

        <div className="flex flex-col md:flex-wrap">
          <div className="">
            <p className="">First Name</p>
            <input type="text" placeholder='First Name' 
              value={first_name}
              onChange={ev => setFirst_name(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">Last Name</p>
            <input type="text" placeholder='Last Name' 
              value={last_name}
              onChange={ev => setLast_name(ev.target.value)}
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
            <p className="">Current Address: </p>
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
            <p className="">Preferred House Type </p>
            <input type="text" placeholder='House Type' 
              value={house_type}
              onChange={ev => setHouse_type(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">Preferred City</p>
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
              className="h-32 border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          {
            members && (
              <div className="mb-4">
                <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to Staff
                </label>
                <p className="">Current Staff: 
                  {members?.find((member) => member._id === staff_id)?.name || "None"}
                </p>
                  <select
                    id="dropdown"
                    //value={members?.find((member) => member._id === staff_id)?.name || ""}
                    onChange={handleSelectChange}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="" disabled>Select Staff...</option>
                      {members.map((member, index) => (
                        <option key={index} value={member._id}>{member.name}</option>
                      ))}
                  </select>
                </div>
            )
          }
        </div>
        <Button onClick={saveClient} className="mt-2">{client? "Update": "Add"} Client Details</Button>
      </div>
    </div>
  );
};

export default AddClientModal;