"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import axios from 'axios';
import { useMainProvider } from '@/providers/MainProvider';

const AddReminderModal = ({ isOpen, onClose, setLoading }) => {
  const [remLoading, setRemLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState('');
  const [priority, setPriority] = useState("");
  const [email, setEmail] = useState('');
  const [clientReferralId, setClientReferralId] = useState("");
  const [landLordName, setLandLordName] = useState("");
  const [landLordReferralId, setLandLordReferralId] = useState('');
  const [propertyNameAndAddress, setPropertyNameAndAddress] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpTime, setFollowUpTime] = useState('');
  const [notes, setNotes] = useState('');

  const {currentUser, orgMode, tempUser} = useMainProvider();
  const username = currentUser?.orgName || currentUser?.username || " ";
  const currentUserName = orgMode? tempUser.firstName : currentUser.firstName;

  const createReminder = async(e) => {
    e.preventDefault()
    setLoading(true);
    if(!clientName |!landLordName){
      toast.error("You have missing details!");
      return
    }
    const data = {
      client_name: clientName, 
      client_referral_id: clientReferralId,
      property_name_and_address: propertyNameAndAddress,
      landlord_name: landLordName,
      landlord_referral_id: landLordReferralId,
      date: followUpDate,
      time: followUpTime,
      title,
      priority,
      staff_name: firstName + " " + lastName,
      staff_id: currentUser._id, 
      notes: notes,
      contact: contact,
      email, 
      _id:currentUser._id
    };

    try {
      setRemLoading(true);
      const response = await axios.post('/api/invite-member', data);
      console.log("Response: ", response);
      if (response.status === 200){
        toast.success("Invitation sent successfully!")
      }
      onClose()
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false);
      setRemLoading(false);
    }
  }

  return (
    <div 
      // onClick={onClose}
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={` h-[60vh] w-full overflow-auto bg-white p-4 rounded-md
          md:w-1/2 dark:bg-black md:p-8 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <button onClick={onClose}
          className='absolute top-0 right-0 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-2">X</p>
        </button>
        <p className="font-semibold text-xl pr-2">Add a Reminder</p>
        <p className="">Add a reminder for a specific Client and Property</p>
        <div className="mb-2">
          <p className="font-semibold">Created by {currentUserName}</p>
        </div>
      
      <div className="">
        <p className="">Reminder Name or Title</p>
          <input type="text" placeholder='Reminder Name or Title' 
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            className="border-2 border-gray-300 rounded-md p-1 w-full 
            mb-2 focus:border-blue-900" 
          /> 
       </div>
       <div className="flex flex-wrap gap-2">
        <div className="w-full md:w-1/3">
          <p className="">Landlord Name: </p>
          <input type="text" placeholder='Landlord Name' 
            value={landLordName}
            onChange={ev => setLandLordName(ev.target.value)}
            className="border-2 border-gray-300 rounded-md p-1 w-full 
            mb-2 focus:border-blue-900" 
          /> 
        </div>
        <div className="w-full md:w-1/3">
          <p className="">Landlord Referral ID: </p>
          <input type="text" placeholder='Landlord Referral Id' 
            value={landLordReferralId}
            onChange={ev => setLandLordReferralId(ev.target.value)}
            className="border-2 border-gray-300 rounded-md p-1 w-full 
            mb-2 focus:border-blue-900" 
          /> 
        </div>
         <div className="w-full md:w-1/3">
          <p className="">Contact: </p>
          <input type="text" placeholder='Landlord Contact' 
            value={contact}
            onChange={ev => setContact(ev.target.value)}
            className="border-2 border-gray-300 rounded-md p-1 w-full 
            mb-2 focus:border-blue-900" 
          /> 
        </div>
        <div className="w-full md:w-1/3">
          <p className="">Landlord Email</p>
          <input type="text" placeholder='Landlord Email' 
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            className="border-2 border-gray-300 rounded-md p-1 w-full 
            mb-2 focus:border-blue-900" 
          /> 
        </div>
       </div>

       <div className="">
        <p className="">Property Name and Address</p>
          <input type="text" placeholder='Property Name And Address' 
            value={propertyNameAndAddress}
            onChange={ev => setPropertyNameAndAddress(ev.target.value)}
            className="border-2 border-gray-300 rounded-md p-1 w-full 
            mb-2 focus:border-blue-900" 
          /> 
       </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-1/3">
            <p className="">Follow Up Date: </p>
            <input type="date" placeholder='Follow Up Date' 
              value={followUpDate}
              onChange={ev => setFollowUpDate(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
           <div className="w-full md:w-1/3">
            <p className="">Follow Up Time: </p>
            <input type="time" placeholder='Follow Up Time' 
              value={followUpTime}
              onChange={ev => setFollowUpTime(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        </div>

        <div className="">
        <p className="">Notes</p>
          <textarea type="text" placeholder='Notes' 
            value={notes}
            onChange={ev => setNotes(ev.target.value)}
            className="border-2 border-gray-300 rounded-md p-1 w-full 
            mb-2 focus:border-blue-900" 
          /> 
       </div>

        <Button onClick={createReminder} className="mt-2">
          {
            remLoading? "Creating..." : "Create Reminder"
          }
        </Button>
      </div>
    </div>
  );
};

export default AddReminderModal;