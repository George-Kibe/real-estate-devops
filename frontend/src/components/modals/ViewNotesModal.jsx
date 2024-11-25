"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useMainProvider } from '@/providers/MainProvider';

const ViewNotesModal = ({
  currentBilling,
  isOpen,
  onClose,
}) => {
  const { orgMode} = useMainProvider();
  const [notes, setNotes] = useState('');
  if (!currentBilling) return null;
  // console.log("Current Billing: ", currentBilling)
  return (
    <div
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full md:w-1/2 dark:bg-black rounded-xl p-2 md:p-16 shadow transition-all
          ${isOpen ? "scale-100 opacity-100": "scale-125 opacity-0"}
          `}
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 p-1 px-2 rounded-lg text-red-700 bg-white hover:bg-gray-50 hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-4">X</p>
        </button>
        <div className="">
          <p className="font-semibold pr-2">Notes for {currentBilling?.client_name}-{currentBilling.service_date_start}-{currentBilling.start_time} to {currentBilling.end_time}</p>
          {/* <p className="font-semibold pr-2">Notes: </p> */}
          <textarea type="text" placeholder='Enter Your Notes here...'
            value={notes}
            initialValue={currentBilling?.notes || ""}
            onChange={ev => setNotes(ev.target.value)}
            className="border-2 h-48 border-gray-300 rounded-md p-1 w-full
            mb-2 focus:border-blue-900"
          />
          </div>
        {
          !orgMode &&
          <Button onClick={addToUserProperties} className="mt-2">Save</Button>
        }
      </div>
    </div>
  );
};

export default ViewNotesModal;