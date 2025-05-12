"use client"

import React, { useState } from 'react';
import { staffActivities } from '../../../data/staff-activities';
import { Button } from '../ui/button';

const ReportDescriptionModal = ({ isOpen, onClose, reportActivities, setReportActivities }) => {

  return (
    <div 
      //onClick={onClose}
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full md:w-1/2 dark:bg-black rounded-xl p-2 md:p-8 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <button onClick={onClose}
          className='absolute top-0 right-0 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-2">X</p>
        </button>

        <div className="flex flex-col p-2">              
          <div className="mb-4">
            <label className="block my-2 font-bold text-xl ">
              Select Activities
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="reportActivities"
              name="reportActivities"
              value={Array.isArray(reportActivities) ? reportActivities : []}
              multiple
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions, option => option.value);
                setReportActivities(options);
              }}
            >
              <option value="">-Select Activity-</option>
              {
                staffActivities?.map((activity, index) => (
                  <option className="mt-1" key={activity.id} value={activity.value}>
                    {index + 1}. {activity.value}
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