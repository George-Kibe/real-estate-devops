"use client"

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';


const MarkAsNonFitModal = ({ isOpen, onClose, currentProperty, userProperties, setUserProperties, currentIndex }) => {
  const [reason, setReason] = useState('');
  console.log("Current Property: ", currentProperty)


  const markAsNonFit = () => {
    const updatedProperty = { ...currentProperty, isFit: { isFit: currentProperty?.isFit?.isFit? false : true, reason: reason} };
    const updatedProperties = userProperties.map((prop, index) =>
      index === currentIndex ? updatedProperty : prop
    );
    setUserProperties(updatedProperties);
    onClose();
    setReason('');
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
        className={`bg-white max-w-xl md:w-1/2 dark:bg-black rounded-xl p-2 md:p-8 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <button onClick={onClose}
          className='absolute top-0 right-0 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-2">X</p>
        </button>
        <p className="font-semibold text-xl mb-4 pr-2">Mark Property as Non Fit Property </p>
        <p className="">
          You are about to mark this proiperty as a non fit. This action will remove it from the active listings and notify the relevant team.
        </p>
        <div className="flex flex-col gap-2 mt-4 ">
            <p className="font-semibold pr-2">
              Please let us know why this property is not a good fit
            </p>
            <textarea type="text" className="border-1" placeholder="e.g. property doesn't meet client requirements" value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>
        <div className="flex flex-col justify-end md:flex-row gap-4">
          <Button onClick={onClose} className='bg-white hover:bg-gray-50 text-black border-1 mt-2 rounded-xs'>
            Cancel
          </Button>
          <Button onClick={markAsNonFit} className="mt-2 bg-green-600 hover:bg-lime-500 rounded-xs">
            Not Fit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarkAsNonFitModal;