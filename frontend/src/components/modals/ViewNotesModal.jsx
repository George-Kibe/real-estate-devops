"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FilePen, FilePenLine} from 'lucide-react'
import { useMainProvider } from '@/providers/MainProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const ViewNotesModal = ({
  currentBilling,
  isOpen,
  onClose,
  fetchBillings
}) => {
  const { orgMode} = useMainProvider();
  const [notes, setNotes] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateBilling = async () => {
    setLoading(true);
    try {
        const data = {
          notes: notes,
        }
        const response = await axios.put(`${BACKEND_URL}/api/billings/${currentBilling.pkid}/`, data);
        toast.success("Billing updated successfully");
        fetchBillings()
        onClose();
    } catch (error) {
        console.log(error);
        toast.error("Error updating billing");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setNotes(currentBilling?.notes || '');
  }, [currentBilling])
  
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
          <div className="mt-4 border border-gray p-2 mb-2 relative">
            {
              !editMode && (
                <FilePenLine className="absolute top-2 right-2 cursor-pointer" onClick={() => setEditMode(!editMode)} />
              )
            }
            <p className="">{currentBilling?.notes}</p>
          </div>

          {
            editMode && (
              <div className="">
                <textarea type="text" placeholder='Enter Your Notes here...'
                  value={notes}
                  onChange={ev => setNotes(ev.target.value)}
                  className="border-2 h-48 border-gray-300 rounded-md p-1 w-full
                  mb-2 focus:border-blue-900"
                />
              </div>
            )
          }
          </div>
        {
          !orgMode &&
          <Button onClick={updateBilling} className="mt-2">
            { loading ? "Saving..." : "Save"}
          </Button>
        }
      </div>
    </div>
  );
};

export default ViewNotesModal;