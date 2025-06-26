"use client"

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useMainProvider } from '@/providers/MainProvider';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const FollowUpModal = ({ isOpen, onClose, currentProperty, currentClient,report }) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [contact, setContact] = useState('');
    const [priority, setPriority] = useState("");
    const [email, setEmail] = useState('');
    const [landLordName, setLandLordName] = useState("");
    const [landLordReferralId, setLandLordReferralId] = useState('');
    const [propertyNameAndAddress, setPropertyNameAndAddress] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');
    const [followUpTime, setFollowUpTime] = useState('');
    const [notes, setNotes] = useState('');
  
    const {currentUser, orgMode, tempUser} = useMainProvider();
    const username = currentUser?.orgName || currentUser?.username || " ";
    const currentUserName = orgMode? tempUser.firstName : currentUser.firstName;
    const staff_id = orgMode? tempUser._id : currentUser._id;

   

    const createFollowUp = async(e) => {
      e.preventDefault()
      if(!title |!followUpDate){
        toast.error("You have missing mandatory details!");
        return
      }
      const data = {
        client_name: currentClient.client_name, 
        client_referral_id: currentClient.id,
        property_name_and_address: propertyNameAndAddress,
        landlord_name: landLordName,
        landlord_referral_id: landLordReferralId,
        date: followUpDate,
        time: followUpTime,
        title,
        priority,
        staff_name: currentUserName,
        staff_id: staff_id, 
        notes: notes,
        contact: contact,
        email, 
        property: currentProperty,
        owner_id:currentUser._id,
        report: report.pkid,
      };
      console.log("Create Reminder Data: ", data)
  
      try {
        setLoading(true);
        const response = await axios.post(`${BACKEND_URL}/drf-api/reminders/`, data);
        const newReminder = response.data
        console.log("Create Reminder Data: ", newReminder)
        if (response.status === 201){
          toast.success("Reminder Created successfully!");
          setTitle("");
          setLandLordName("");
          setLandLordReferralId("");
          setPropertyNameAndAddress("");
          setFollowUpDate("");
          setFollowUpTime("");
          setNotes("");
          setPriority("");
          setContact("");
          setEmail("");
        }
        onClose()
      } catch (error) {
        console.log("Error: ", error.message)
      } finally {
        fetchReminders();
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
        <p className="font-semibold text-xl mb-4 pr-2">Add A Follow Up </p>

        <div className="">
          <p className="">Follow Up Name or Title</p>
          <input type="text" placeholder='Reminder Name or Title' 
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            className="border-2 border-gray-300 rounded-md p-1 w-full 
            mb-2 focus:border-blue-900" 
          /> 
       </div>

       <div className="flex flex-wrap gap-2">

       </div>

       <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col">
            <p className="">Follow Up Date: </p>
            <input type="date" placeholder='Follow Up Date' 
              value={followUpDate}
              onChange={ev => setFollowUpDate(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
           <div className="flex flex-col w-full ">
            <p className="">Follow Up Time: </p>
            <input type="time" placeholder='Follow Up Time' 
              value={followUpTime}
              onChange={ev => setFollowUpTime(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>

           <div className="w-full">
            <p className="">Contact: </p>
            <input type="text" placeholder='Landlord Contact' 
              value={contact}
              onChange={ev => setContact(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="w-full">
            <p className="">Landlord Email</p>
            <input type="text" placeholder='Landlord Email' 
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>

          <div className="">
          <p className="">Reminder Notes</p>
            <textarea type="text" placeholder='Notes' 
              value={notes}
              onChange={ev => setNotes(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
        </div>

        </div>

        <div className="flex flex-col items-start p-2 my-4">
          <h2 className="text-xl font-bold mb-4">Priority</h2>
          <div className="flex">
            <RadioGroup value={priority} defaultValue="Medium" className={"flex justify-around w-full gap-4"} onValueChange={setPriority}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="High" id="r1" />
                <Label htmlFor="r1">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium" id="r2" />
                <Label htmlFor="r2">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Low" id="r3" />
                <Label htmlFor="r3">Low</Label>
              </div>
            </RadioGroup>
          </div>
        </div>


        <div className="flex flex-col justify-end md:flex-row gap-4">
          <Button onClick={onClose} className='bg-white hover:bg-gray-50 text-black border-1 mt-2 rounded-xs'>
            Cancel
          </Button>
          <Button onClick={createFollowUp} className="mt-2 bg-green-600 hover:bg-lime-500 rounded-xs">
            {loading? "Creating...": "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpModal;