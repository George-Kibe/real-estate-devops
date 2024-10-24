"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';
import axios from 'axios';
import { useMainProvider } from '@/providers/MainProvider';
import { toast } from 'react-toastify';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const CustomDateModal = ({ selectedDate, setSelectedDate, isOpen, onClose }) => {
  const router = useRouter();
  const {orgMode, tempUser, currentUser, currentClient} = useMainProvider();
  const [loading, setLoading] = useState(false);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const generateReport = async() => {
    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    }
    const formattedDate = selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : null;
    setLoading(true);
    const data = {
      client_id: currentClient?.id,
      title: `Daily report For ${currentClient?.client_name}`,
      client_name: currentClient?.client_name,
      description: "Daily report draft",
      status: "completed",
      report_type: "Daily",
      client_phone_number:currentClient?.phone_number,
      staff_id: orgMode? tempUser?._id : currentUser._id,
      owner_id: currentUser?._id,
      report_date: formattedDate
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/api/reports/`, data);
      const report = response.data
      // console.log("Report Details: ", report)
      if (response.status === 201) {
        router.push(`/reports/${report.pkid}/?searchTerm=${currentClient?.city}`)
      }
      setLoading(false);
    } catch (error) {
      toast.error("Report Generation failed. Try Again!")
      console.log("Error: ", error)
      setLoading(false);
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

        <div className="flex flex-col h-[20vh] items-center justify-center p-4 bg-gray-100">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Select a Date</h2>

          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholderText="MM/DD/YYYY"
            />
            <div className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v1h12V4a2 2 0 00-2-2H6zM4 8h12v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm3 3a1 1 0 112 0v3a1 1 0 11-2 0v-3zm4 0a1 1 0 112 0v3a1 1 0 11-2 0v-3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {selectedDate && (
            <div className="mt-4">
              <Button onClick={generateReport}>
                {loading? "Generating Report...": `Generate ${currentClient?.client_name}'s Report for ${moment(selectedDate).format('MMMM Do YYYY')}`}
              </Button>
            </div>
          )}
        </div>
          
      </div>
    </div>
  );
};

export default CustomDateModal;