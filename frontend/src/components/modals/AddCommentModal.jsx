"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const AddCommentModal = ({ 
  currentProperty, 
  comments, setComments,
  isOpen, 
  onClose, 
  agentName, setAgentName,
  addToUserProperties,
  additionalResources, setAdditionalResources,
  editMode 
}) => {
  //console.log("Current Property: ", currentProperty?.comments)
  const [selected, setSelected] = useState('');
  const [addSelected, setAddSelected] = useState('');
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

          <div className="flex flex-col items-start p-2">
            <h2 className="text-xl font-bold mb-4">Did you call the agent?</h2>
            <div className="">
              <RadioGroup value={selected} defaultValue="Yes" onValueChange={setSelected}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="r1" />
                  <Label htmlFor="r1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="r2" />
                  <Label htmlFor="r2">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {selected === "Yes" && (
            <div className="">
              <p className="">Agent Name:</p>
              <input type="text" placeholder='Agent Name' 
                value={agentName || currentProperty?.agentName || ''} 
                onChange={ev => setAgentName(ev.target.value)}
                className="border-2 border-gray-300 rounded-md p-1 w-full 
                mb-2 focus:border-blue-900" 
              /> 
            </div>
          )}

          <div className="flex flex-col items-start p-2">
            <h2 className="text-xl font-bold mb-4">Did you call the agent?</h2>
            <div className="">
              <RadioGroup value={addSelected} defaultValue="Yes" onValueChange={setAddSelected}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="r1" />
                  <Label htmlFor="r1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="r2" />
                  <Label htmlFor="r2">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {addSelected === "Yes" && (
            <div className="">
              <p className="">Additional Resources:</p>
              <input type="text" placeholder='Additional Resources'
                value={additionalResources || currentProperty?.additionalResources || ''}
                onChange={ev => setAdditionalResources(ev.target.value)}
                className="border-2 border-gray-300 rounded-md p-1 w-full
                mb-2 focus:border-blue-900"
              />
            </div>
              )}
          </div>
        <Button onClick={addToUserProperties} className="mt-2">Save</Button>
      </div>
    </div>
  );
};

export default AddCommentModal;