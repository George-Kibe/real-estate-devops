"use client"

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import axios from 'axios';
import { useMainProvider } from '@/providers/MainProvider';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const AddLogModal = ({ isOpen, onClose, setLoading, id, client_name, client_referral_id, fetchReportLogs, properties }) => {
  const [logLoading, setLogLoading] = useState(false);
  const [property, setProperty] = useState();
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [actionPerformed, setActionPerformed] = useState('');
  const [landLordName, setLandLordName] = useState("");
  const [landLordReferralId, setLandLordReferralId] = useState('');
  const [propertyNameAndAddress, setPropertyNameAndAddress] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpTime, setFollowUpTime] = useState('');
  const [notes, setNotes] = useState('');

  const {currentUser, orgMode, tempUser} = useMainProvider();
  const username = currentUser?.orgName || currentUser?.username || " ";
  const currentUserName = orgMode? tempUser.firstName : currentUser.firstName;

  const createLog = async(e) => {
    e.preventDefault()
    setLoading(true);
    if( !landLordName){
      toast.error("You have missing details!");
      return
    }
    const data = {
      client_name: client_name, 
      client_referral_id: client_referral_id || "",
      property_name_and_address: propertyNameAndAddress,
      landlord_name: landLordName,
      landlord_referral_id: landLordReferralId,
      date: followUpDate,
      time: followUpTime,
      staff_name: currentUserName,
      staff_id: orgMode? tempUser._id : currentUser._id, 
      notes: notes,
      contact: contact,
      email, 
      action_performed: actionPerformed,
      owner_id:currentUser._id,
      property,
      report: id
    };
    console.log("Create Report Log Data: ", data)
    try {
      setLogLoading(true);
      const response = await axios.post(`${BACKEND_URL}/drf-api/report-logs/`, data);
      const newLog = response.data
      console.log("Create Report Log Data: ", newLog)
      if (response.status === 201){
        toast.success("Report Log Created successfully!");
        setLandLordName("");
        setLandLordReferralId("");
        setProperty("");
        setPropertyNameAndAddress("");
        setFollowUpDate("");
        setFollowUpTime("");
        setNotes("");
        setContact("");
        setEmail("");
        setActionPerformed("");
      }
      onClose()
    } catch (error) {
      console.log("Error: ", error.message);
      toast.error(`Error: ${error.message}`)
    } finally {
      setLoading(false);
      setLogLoading(false);
      fetchReportLogs();
    }
  }

  return (
    <div 
      // onClick={onClose}
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={` h-[60vh] w-full overflow-auto bg-white p-4 rounded-md
          md:w-1/2 dark:bg-black md:p-8 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <button onClick={onClose}
          className='absolute top-0 right-0 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-2">X</p>
        </button>
        <p className="font-semibold text-xl pr-2">Add a Property Report Log </p>
        <p className="">Log a follow up for a specific client and property</p>
        <div className="mb-2">
          <p className="font-semibold">Created by {currentUserName}</p>
        </div>
      
        <div className="mb-4 md:w-[50%]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property
          </label>
          <select
            id="dropdown"
            onChange={(event) => {
              const selectedId = event.target.value;
              const selectedProperty = properties.find(p => p.title === selectedId);
              setProperty(selectedProperty);
            }}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">-Select Property-</option>
            {
              properties.map((property) => (
                <option key={property.title} value={property.title}>{property.title}</option>
              ))
            }
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* <div className="w-full md:w-1/3">
            <p className="">Client Name</p>
            <input type="text" placeholder='Client Name' 
              value={clientName}
              onChange={ev => setClientName(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="w-full md:w-1/3">
            <p className="">Client Referral ID: </p>
            <input type="text" placeholder='Client Referral ID' 
              value={clientReferralId}
              onChange={ev => setClientReferralId(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div> */}
          
          <div className="w-full md:w-1/3">
            <p className="">Landlord Name: </p>
            <input type="text" placeholder='Landlord Name' 
              value={landLordName}
              onChange={ev => setLandLordName(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="w-full md:w-1/3">
            <p className="">Landlord Referral ID: </p>
            <input type="text" placeholder='Landlord Referral Id' 
              value={landLordReferralId}
              onChange={ev => setLandLordReferralId(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="w-full md:w-1/3">
            <p className="">Contact: </p>
            <input type="text" placeholder='Landlord Contact' 
              value={contact}
              onChange={ev => setContact(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="w-full md:w-1/3">
            <p className="">Landlord Email</p>
            <input type="text" placeholder='Landlord Email' 
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        </div>

        <div className="">
          <p className="">Property Address</p>
            {/* <input type="text" placeholder='Property Name And Address' 
              value={propertyNameAndAddress}
              onChange={ev => setPropertyNameAndAddress(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            />  */}
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_MAPS_API_KEY}
              selectProps={{
                propertyNameAndAddress,
                placeholder: "Search Location...",
                isClearable: true,  
                isDisabled: false,  
                isLoading: false,  
                onChange: (val) => setPropertyNameAndAddress(val ? val.label : null)
              }}
            />
        </div>
          <div className="">
          <p className="">Action Performed</p>
            <input type="text" placeholder='Action Performed' 
              value={actionPerformed}
              onChange={ev => setActionPerformed(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
        </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-1/3">
              <p className="">Report Log Date: </p>
              <input type="date" placeholder='Follow Up Date' 
                value={followUpDate}
                onChange={ev => setFollowUpDate(ev.target.value)}
                className="border-2 border-gray-300 rounded-md p-1 w-full 
                mb-2 focus:border-blue-900" 
              /> 
            </div>
            <div className="w-full md:w-1/3">
              <p className="">Report Log Time: </p>
              <input type="time" placeholder='Follow Up Time' 
                value={followUpTime}
                onChange={ev => setFollowUpTime(ev.target.value)}
                className="border-2 border-gray-300 rounded-md p-1 w-full 
                mb-2 focus:border-blue-900" 
              /> 
            </div>
          </div>

          <div className="">
          <p className="">Notes</p>
            <textarea type="text" placeholder='Notes' 
              value={notes}
              onChange={ev => setNotes(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
        </div>

        <Button onClick={createLog} className="mt-2">
          {
            logLoading? "Creating..." : "Create Log"
          }
        </Button>
      </div>
    </div>
  );
};

export default AddLogModal;