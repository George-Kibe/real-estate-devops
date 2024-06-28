"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMainProvider } from '@/providers/MainProvider';

const InviteMemberModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const {currentUser} = useMainProvider()
  const router = useRouter();
  const username = currentUser?.name

  const inviteMember = async(e) => {
    e.preventDefault()
    if(!email |!username){
      toast.error("You have missing details!");
      return
    }
    const data = {username, email}
    toast.info(`Inviting ${email} to your organization`)
    try {
      // invite member logic
      onClose()
    } catch (error) {
      toast.error("Post not added to database. Try again!")
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
        <p className="font-semibold pr-2">Invite A member</p>
        <p className="">Add Email</p>
        <input type="email" placeholder='Email' 
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          className="border-2 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 
        <Button onClick={inviteMember} className="mt-2">Invite</Button>
      </div>
    </div>
  );
};

export default InviteMemberModal;