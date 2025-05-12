"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';

const EditRoleModal = ({isOpen, onClose, member}) => {
  //console.log("Member: ", member)
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member?.role) {
      setRole(member?.role);
    }
  }, [member?.role]);
  
  const updateRole = async() => {
    const body = {
      role,
    }
    try {
      setLoading(true)
      const response = await fetch(`/api/auth/users/${member?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (response.status === 200){
        toast.success("member Role Updated Successfully!")
        setLoading(false)
        setRole('')
        onClose();
        window.location.reload(); // Refresh the page to restore original content
      }
    } catch (error) {
      console.log("Error Updating, Try Again")
      toast.error("Error Updating, Try Again")
      setLoading(false)
    }
  }

  return (
    <div 
      //onClick={onClose}
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full md:w-1/2 dark:bg-black rounded-xl p-2 md:p-8 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
         <button onClick={onClose}
          className='absolute top-0 right-0 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-2">X</p>
        </button>
        <p className="font-semibold pr-2">Staff Name: {member?.name} </p>
        <div className="">
            <p className="">Edit Role</p>
            <input type="text" placeholder='Role...' 
              value={role}
              onChange={ev => setRole(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        <Button onClick={updateRole} className="mt-2">
          {
            loading? 'Loading...' : 'Update Role'
          }
        </Button>
      </div>
    </div>
  );
};

export default EditRoleModal;