"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { File } from 'lucide-react';
import { toast } from 'react-toastify';

const AddPropertyModal = ({ isOpen, onClose, setUserProperties }) => {
  const [title, setTitle] = useState('');
  const [street_address, setStreet_address] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [amenities, setAmenities] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [comments, setComments] = useState('');
  //console.log("Current Property: ", currentProperty?.comments)

  const selectFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleAddProperty = () => {
    if (!title || !street_address || !phone_number || !description || !amenities || !price || !comments){
      toast.error("Please fill in all fields");
      return
    }
    const amenitiesList = amenities.split(',').map(item => item.trim());
    const newProperty = {
      title,
      comments,
      street_address,
      phone_number,
      images: [imageBase64], // Assuming image is a URL or file path
      description,
      amenities: amenitiesList,
    };
    console.log("New Property: ", newProperty)
    setUserProperties((prev) => [...prev, newProperty]);
    onClose()
    toast.success("Property Added Successfully");
    //reset everything to null
    setImageBase64(''); setTitle(''); setStreet_address(''); setPhone_number('');
    setDescription(''); setAmenities(''); setPrice(''); setComments('');
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
        className={`h-[90vh] w-full overflow-auto bg-white p-4 rounded-md
          md:w-1/2 dark:bg-black md:p-16 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <button onClick={onClose}
          className='absolute top-2 right-2 p-1 px-2 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-4">X</p>
        </button>
        <p className="font-bold text-xl">Add Custom Property Details</p>
        <div className="flex flex-col md:flex-wrap">
          <div className="">
            <p className="">Property Title:</p>
            <input type="text" placeholder='Property Title' 
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">Property Address:</p>
            <input type="text" placeholder='Property Address' 
              value={street_address}
              onChange={ev => setStreet_address(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">Phone Number:</p>
            <input type="text" placeholder='Phone Number' 
              value={phone_number}
              onChange={ev => setPhone_number(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="">Price:</p>
            <input type="text" placeholder='Price' 
              value={price}
              onChange={ev => setPrice(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        </div>
        <p className="font-semibold pr-2">Description</p>
        <textarea type="text" placeholder='Enter Your Description here...' 
          value={description} 
          onChange={ev => setDescription(ev.target.value)}
          className="border-2 h-16 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 
         <p className="font-semibold pr-2">Amenities</p>
        <textarea type="text" placeholder='Amenities, separate with commas' 
          value={amenities} 
          onChange={ev => setAmenities(ev.target.value)}
          className="border-2 h-16 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 
        <p className="font-semibold pr-2">Add Comments</p>
        <textarea type="text" placeholder='Enter Your comments here...' 
          value={comments} 
          onChange={ev => setComments(ev.target.value)}
          className="border-2 h-16 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 
        <p className="font-semibold pr-2">Property Image</p>
        <div className=''>
          <label
            htmlFor='file'
            className='flex h-24 cursor-pointer items-center justify-center rounded-md border border-dashed border-primary'
          >
            <div className='flex items-center'>
              <input type='file' name='file' id='file' className='sr-only' onChange={selectFile} />
              
              <span className='mx-auto flex h-[90px] w-[100px] items-center justify-center rounded-full border border-stroke dark:border-dark-3 bg-white dark:bg-dark-2'>
                {imageBase64 ? (
                  <img src={imageBase64} alt='User Image' className='h-full w-full rounded-md object-cover' />
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
        <Button onClick={handleAddProperty} className="mt-2">
          Add Property
        </Button>
      </div>
    </div>
  );
};

export default AddPropertyModal;