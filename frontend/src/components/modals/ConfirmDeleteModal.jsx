"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';

const ConfirmDeleteModal = ({ deleteAction, title, isOpen, onClose }) => {

  const handleDelete = () => {
    deleteAction();
    onClose();
  };

  return (
    <div 
      //onClick={onClose}
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
          <p className="font-bold text-2xl p-4">X</p>
        </button>
        <p className="font-semibold pr-2">Are you sure you want to remove {title}? </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Button className='bg-green-600 hover:bg-lime-500 mt-2' onClick={handleDelete}>
            Yes
          </Button>
          <Button onClick={onClose} className="mt-2">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;