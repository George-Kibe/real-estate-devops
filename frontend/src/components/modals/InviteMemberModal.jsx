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
  const username = currentUser?.name

  const inviteMember = async(e) => {
    e.preventDefault()
    setLoading(true);
    if(!email |!username |!name){
      toast.error("You have missing details!");
      return
    }
    const data = {username, role, name:firstName + " " + lastName, email, _id:currentUser._id};
    toast.info(`Inviting ${email} to your organization`)
    try {
      // invite member logic
      const response = await axios.post('/api/invite-member', data);
      onClose()
      if (response.status === 200){
        toast.success("Invitation sent successfully!")
      }
      setLoading(false);
      setEmail('');
      setName('')
    } catch (error) {
      toast.error("Sending Invitation failed! Try Again!")
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
        <p className="font-semibold pr-2">Invite A member</p>
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