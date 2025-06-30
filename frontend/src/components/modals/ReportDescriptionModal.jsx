"use client"

import React, { useEffect, useState } from 'react';
import { staffActivities } from '../../../data/staff-activities';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';

const ReportDescriptionModal = ({ isOpen, onClose, reportActivities, setReportActivities }) => {
  const [activities, setActivities] = useState(staffActivities);
  const [searchText, setSearchText] = useState("");
  
  useEffect(() => {
    if (searchText) {
      const filteredActivities = staffActivities.filter((activity) =>
        activity.value.toLowerCase().includes(searchText.toLowerCase())
      );
      setActivities(filteredActivities);
    } else {
      setActivities(staffActivities);
    }
  }, [searchText])
  
  return (
    <div 
      //onClick={onClose}
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full md:w-1/2 dark:bg-black rounded-xl p-2 md:p-4 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <button onClick={onClose}
          className='absolute top-0 right-0 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-2">X</p>
        </button>

        <div className="flex flex-col p-2 ">   
          <label className="block my-2 font-bold text-2xl ">
              Select Activities
            </label>           
          <div className="mb-4 h-full border rounded-md p-2">  
            <div className="flex items-center gap-2">
              <Search className='h-6 w-6'/>
              <input type="text" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-[200px] p-1 rounded-md px-2 outline-none border-1" />
            </div>
            <select
              className="shadow appearance-none h-[60vh]   w-full py-2 px-4 focus:outline-none focus:shadow-outline" 
              id="reportActivities"
              name="reportActivities"
              value={Array.isArray(reportActivities) ? reportActivities : []}
              multiple
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions, option => option.value);
                setReportActivities(options);
              }}
            >
              <option value="my-2">-Select Activity-</option>
              {/* <button className="">
                Search...
              </button> */}
              {
                activities?.map((activity, index) => (
                  <option className="mt-1 my-4" key={activity.id} value={activity.value}>
                    • {activity.value}
                  </option>
                ))
              }
            </select>
            <Button
              onClick={onClose}
              className="mt-2 self-start bg-blue-500 text-white hover:bg-blue-700"
              disabled={!reportActivities}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDescriptionModal;