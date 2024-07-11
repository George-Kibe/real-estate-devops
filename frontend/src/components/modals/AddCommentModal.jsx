"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';

const AddCommentModal = ({ currentProperty, comments, isOpen, onClose, setComments, addToUserProperties, editMode }) => {
  //console.log("Current Property: ", currentProperty?.comments)
  return (
    <div 
      onClick={onClose}
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
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
        <p className="font-semibold pr-2">Property: {currentProperty?.title} Address: {currentProperty?.street_address}</p>
        <p className="font-semibold pr-2">Phone: {currentProperty?.phone_number}</p>
        <p className="font-semibold pr-2">Add Comments</p>
        <textarea type="text" placeholder='Enter Your comments here...' 
          value={comments} 
          initialValue={currentProperty?.comments}
          onChange={ev => setComments(ev.target.value)}
          className="border-2 h-48 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 
        <Button onClick={addToUserProperties} className="mt-2">Save Comments</Button>
      </div>
    </div>
  );
};

export default AddCommentModal;