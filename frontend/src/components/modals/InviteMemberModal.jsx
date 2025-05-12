"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMainProvider } from '@/providers/MainProvider';

const InviteMemberModal = ({ isOpen, onClose, setLoading }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const {currentUser} = useMainProvider();
  const username = currentUser?.orgName || currentUser?.username || " ";

  const inviteMember = async(e) => {
    e.preventDefault()
    setLoading(true);
    if(!email |!username |!firstName){
      toast.error("You have missing details!");
      return
    }
    const data = {username, role, name:firstName + " " + lastName, firstName, lastName, email, _id:currentUser._id};
    toast.info(`Inviting ${email} to your organization`)
    try {
      const response = await axios.post('/api/invite-member', data);
      console.log("Response: ", response);
      if (response.status === 200){
        toast.success("Invitation sent successfully!")
      }
      onClose()
      setLoading(false); setEmail('');
      setFirstName(''); setLastName('');
    } catch (error) {
      setLoading(false)
      if (error.response && error.response.status === 422) {
        toast.error("user with this email already Exists or is a staff in another organization!")
      } else {
        toast.error(`Invitation failed! ${error.message}`);
      }
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
        <p className="font-semibold pr-2">Invite A Staff Member</p>
        <p className="">Add Email</p>
        <input type="email" placeholder='Email' 
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          className="border-2 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 
        <p className="">First Name: </p>
        <input type="text" placeholder='First Name' 
          value={firstName}
          onChange={ev => setFirstName(ev.target.value)}
          className="border-2 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 
        <p className="">Last Name: </p>
        <input type="text" placeholder='Last Name' 
          value={lastName}
          onChange={ev => setLastName(ev.target.value)}
          className="border-2 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 
        <p className="">Role: </p>
        <input type="text" placeholder='Member Role' 
          value={role}
          onChange={ev => setRole(ev.target.value)}
          className="border-2 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 
        <Button onClick={inviteMember} className="mt-2">Invite{firstName && " " +firstName + " " + lastName}</Button>
      </div>
    </div>
  );
};

export default InviteMemberModal;