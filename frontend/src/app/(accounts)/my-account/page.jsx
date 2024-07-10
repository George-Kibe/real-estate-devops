"use client"
import AnimatedText from "@/components/AnimatedText";
import { useMainProvider } from "@/providers/MainProvider";
import React, { useState } from "react";
import {File} from 'lucide-react';
import { toast } from "react-toastify";

export default function MyAccountPage() {
  const {currentUser, setCurrentUser} = useMainProvider();
  //console.log("Current User: ", currentUser?.name)
  const [name, setName] = useState(currentUser?.name);
  const [userImageBase64, setUserImageBase64] = useState(currentUser?.image);
  const [email, setEmail] = useState(currentUser?.email);
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber);
  const [favouriteLocation, setFavouriteLocation] = useState(currentUser?.favouriteLocation);
  const [loading, setLoading] = useState(false);

  // console.log("Name: ", name, "Email: ", email)
  const selectFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserImageBase64(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  const handleUpdate = async() => {
    const body = {
      name,
      email,
      phoneNumber,
      favouriteLocation,
      image: userImageBase64
    }
    console.log('Updating: ', body);
    try {
      setLoading(true)
      const response = await fetch(`/api/auth/users/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (response.status === 200){
        const data = await response.json();
        console.log('Response data', data);
        setCurrentUser(data);
        toast.success("Updated Successfully")
        setLoading(false)
      }
    } catch (error) {
      toast.error("Error Updating, Try Again")
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"My Account Details"} />
      <div className="w-1/3 self-center">
        <label className='mb-[10px] block text-base font-medium text-dark dark:text-white'>
          Profile Image
        </label>
        <div className='relative'>
          <label
            htmlFor='file'
            className='flex min-h-[175px] cursor-pointer items-center justify-center rounded-md border border-dashed border-primary p-6'
          >
            <div>
              <input type='file' name='file' id='file' className='sr-only' onChange={selectFile} />
              
              <span className='mx-auto mb-3 flex h-[100px] w-[100px] items-center justify-center rounded-full border border-stroke dark:border-dark-3 bg-white dark:bg-dark-2'>
                {userImageBase64 ? (
                  <img src={userImageBase64} alt='User Image' className='h-full w-full rounded-full object-cover' />
                ) : (
                  <File className='text-dark-6 dark:text-white' />
                )}
              </span>
              <span className='text-base text-body-color dark:text-dark-6'>
                Drag &amp; drop or
                <span className='text-primary underline'> browse </span>
              </span>
            </div>
          </label>
        </div>
      </div>
      <div className="flex flex-1 w-full justify-around flex-col md:flex-row">
        <div className="">
          <label className='mb-[10px]  text-base font-medium text-dark dark:text-white'>
            Name:
          </label>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
          />
        </div>
        <div className="">
          <label className='mb-[10px]  text-base font-medium text-dark dark:text-white'>
            Email:
          </label>
          <input
            type='email'
            placeholder='Email'
            value={email}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
          />
        </div>
      </div>
      <div className="flex flex-1 w-full justify-around flex-col md:flex-row">
        <div className="">
          <label className='mb-[10px]  text-base font-medium text-dark dark:text-white'>
            Phone Number:
          </label>
          <input
            type='text'
            placeholder='Phone Number +1...'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
          />
        </div>
        <div className="">
          <label className='mb-[10px]  text-base font-medium text-dark dark:text-white'>
            Favorite location:
          </label>
          <input
            type='text'
            placeholder='Dream Location'
            value={favouriteLocation}
            onChange={(e) => setFavouriteLocation(e.target.value)}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
          />
        </div>
      </div>
        <button onClick={handleUpdate} className='border-primary border self-start rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'>
          {loading? "Loading" : "Update"}
        </button>
    </div>
  );
}