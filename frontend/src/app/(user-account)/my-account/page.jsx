"use client"
import AnimatedText from "@/components/AnimatedText";
import { useMainProvider } from "@/providers/MainProvider";
import React, { useState } from "react";
import {File} from 'lucide-react';
import { toast } from "react-toastify";
import { handleFileUpload } from "@/utils/google-cloud";

export default function MyAccountPage() {
  const {currentUser, setCurrentUser, orgMode} = useMainProvider();
  const [userImage, setUserImage] = useState(currentUser?.image);
  const [uplaodLoading, setUploadLoading] = useState(false);
  const [firstName, setFirstName] = useState(currentUser?.firstName || currentUser?.name);
  const [lastName, setLastName] = useState(currentUser?.lastName);
  const [orgName, setOrgName] = useState(currentUser?.orgName);
  const [email, setEmail] = useState(currentUser?.email);
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber);
  const [isAvailable, setIsAvailable] = useState(currentUser?.isAvailable);
  const [favouriteLocation, setFavouriteLocation] = useState(currentUser?.favouriteLocation);
  const [loading, setLoading] = useState(false);

  // console.log("Name: ", name, "Email: ", email)
  const uploadImage = async (e) => {
    e.preventDefault()
    setUploadLoading(true);
    try {
      const fileUrl = await handleFileUpload(e.target.files[0]);
      setUserImage(fileUrl)
    } catch (error){
      toast.error("Error uploading file")
    } finally {
      setUploadLoading(false);
    }
  }

  const handleUpdate = async() => {
    const body = {
      name: firstName + " " + lastName,
      firstName,
      lastName,
      orgName,
      email,
      phoneNumber,
      isAvailable,
      image: userImage
    }
    //console.log('Updating: ', body);
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
        //console.log('Response data', data);
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
    <div className='p-4 md:p-8'>
      <AnimatedText text={"Account Details"} />
      <div className="w-1/3 self-center">
        <label className='mb-[10px] block text-base font-medium text-dark dark:text-white'>
          Profile Image
        </label>
        <div className='relative'>
          <label
            className='flex min-h-[175px] cursor-pointer items-center justify-center rounded-md border border-dashed border-primary p-6'
          >
            <div>
              <input type='file' id='file' accept="image/*" className='sr-only' onChange={uploadImage} />
              <span className='mx-auto mb-3 flex h-[100px] w-[100px] items-center justify-center rounded-full border border-stroke dark:border-dark-3 bg-white dark:bg-dark-2'>
                {userImage ? (
                  <img src={userImage} alt='User Image' className='h-full w-full rounded-full object-cover' />
                ) : (
                  <File className='text-dark-6 dark:text-white' />
                )}
              </span>
              <span className='text-base text-body-color dark:text-dark-6'>
                <span className='text-center underline'>
                  {uplaodLoading ? "Uploading..." : "Browse"}
                </span>
              </span>
            </div>
          </label>
        </div>
      </div>
      <div className="px-4 md:px-8 flex-1 justify-between flex-col md:flex-row">
        <div className="">
          <label className='mb-[10px] text-base font-medium text-dark dark:text-white'>
            First Name:
          </label>
          <input
            type='text'
            placeholder='Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
          />
        </div>
        <div className="">
          <label className='mb-[10px] text-base font-medium text-dark dark:text-white'>
            Last Name:
          </label>
          <input
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
          />
        </div>
        {
          !orgMode && (
            <div className="">
              <label className='mb-[10px] text-base font-medium text-dark dark:text-white'>
                Organization Name:
              </label>
              <input
                type='text'
                placeholder='Organization Name'
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
              />
            </div>
          )
        }
        <div className="">
          <label className='mb-[10px]  text-base font-medium text-dark dark:text-white'>
            Email(Read Only):
          </label>
          <input
            type='email'
            placeholder='Email'
            value={email}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
          />
        </div>
      </div>
      <div className="px-4 md:px-8 flex-1 justify-between flex-col md:flex-row">
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
        {/* <div className="">
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
        </div> */}
        {
          currentUser?.isProfessional && (
            <div className="flex flex-col justify-center mt-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Set Your Availability</h2>
              <div className="flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-green-600 focus:ring-green-500"
                    name="availability"
                    value="available"
                    checked={isAvailable === true}
                    onChange={() => setIsAvailable(true)}
                  />
                  <span className="ml-2 text-gray-700">Available</span>
                </label>

                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-red-600 focus:ring-red-500"
                    name="availability"
                    value="unavailable"
                    checked={isAvailable === false}
                    onChange={() => setIsAvailable(false)}
                  />
                  <span className="ml-2 text-gray-700">Unavailable</span>
                </label>
              </div>

              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                <p className="text-gray-700 text-lg">
                  You are currently:{" "}
                  <span className={`font-bold capitalize ${isAvailable ? "text-green-600" : "text-red-600"}`}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>
                </p>
              </div>
            </div>
          )
        }
      </div>
        <button onClick={handleUpdate} className='mt-4 border-primary border self-start rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'>
          {loading? "Loading" : "Update Details"}
        </button>
    </div>
  );
}