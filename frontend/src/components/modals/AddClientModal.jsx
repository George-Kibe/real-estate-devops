"use client"

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import axios from 'axios';
import { useMainProvider } from '@/providers/MainProvider';
import { insurance_companies } from '../../../data/insurance';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

const AddClientModal = ({ isOpen, onClose, setLoading, client=null }) => {  
  const {currentUser, tempUser} = useMainProvider();
  const [members, setMembers] = useState([]);
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [house_type, setHouse_type] = useState('');
  const [additional_info, setAdditional_info] = useState('');
  const [staff_id, setStaff_id] = useState('');
  const [payor, setPayor] = useState('');
  const [procode, setProcode] = useState('');
  const [units, setUnits] = useState('');
  const [modifier, setModifier] = useState('');
  const [service_type, setServiceType] = useState('');
  const [pmiNumber, setPmiNumber] = useState('');
  const [insuranceMemberID, setInsuranceMemberID] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState(''); 

  const handleClose = () => {
    onClose();
    setLoading(false); setEmail(''); setFirst_name(''); 
    setLast_name(''); setAddress(''); setPhoneNumber('');
    setHouse_type(''); setAdditional_info(''); setCity('');
    setPayor(''); setProcode(''); setUnits('');
    setModifier(''); setServiceType('');
    setStaff_id(''); setFirst_name(''); setLast_name('');
  }
  
  const getMembers = async() => {
    try {
      const response = await axios.get(`/api/members/?owner_id=${currentUser?._id}`);
      console.log("Members Fetched : ", response.data)
      setMembers(response.data);
    } catch (error) {
      toast.error("Fetching Members failed. Try Again!")
    }
  }

  useEffect(() => {
    if (client?.client_name) {
      setFirst_name(client.first_name);
      setLast_name(client.last_name);
      setEmail(client.email);
      setAddress(client.address);
      setPhoneNumber(client.phone_number);
      setHouse_type(client.house_type);
      setAdditional_info(client.additional_info);
      setCity(client.city);
      setStaff_id(client.staff_id);
      setStatus(client.status);
      setPayor(client.payor);
      setProcode(client.procode);
      setUnits(client.units);
      setModifier(client.modifier);
      setServiceType(client.service_type);
      return;
    }
  }, [client]);
  // console.log("Staff ID: ", staff_id)
  const handleSelectChange = (event) => {
    //console.log("Selected ID: ",event.target.value);
    setStaff_id(event.target.value)
  };

  const saveClient = async(e) => {
    e.preventDefault()
    if(!email |!first_name |!last_name |!address |!city |!phone_number |!house_type |!payor |!procode |!modifier |!service_type){
      toast.error("You have missing details!");
      return
    }
    setLoading(true);
    const data = {
      first_name, last_name, 
      client_name:first_name + " " + last_name, 
      email, address,phone_number,
      house_type, city, staff_id: staff_id, 
      additional_info, status,
      payor, procode, units, modifier, 
      service_type, pmiNumber, insuranceMemberID,
      owner_id: currentUser._id,
      staff_name: orgMode? tempUser.firstName : currentUser.firstName,
      staff_contact: orgMode? tempUser.email : currentUser.email,
    };
    // console.log(data)

    if (client){
      toast.info(`Updating ${email}'s Details`)
    }else{
      toast.info(`Adding ${email} to your organization`)
    }
    if (client){
      try {
        const res = await axios.put(`${BACKEND_URL}/drf-api/clients/${client.pkid}/`, data)
        if (res.status === 200){
          toast.success("Client Edited Successfully")
          handleClose()
        }
      } catch (error) {
        toast.error(error.response.data.message)
        setLoading(false)
      }
    }else{
      try {
        // create client login
        const response = await axios.post(`${BACKEND_URL}/drf-api/clients/`, data);
        if (response.status === 201){
          toast.success("Client Created Successfully!")
          handleClose()
        }
      } catch (error) {
        toast.error("Adding your client failed. Try Again!")
      }
    }
  }

  useEffect(() => {
    getMembers()
  }, [])

  return (
    <div 
      // onClick={handleClose}
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={` h-[90vh] w-full overflow-auto bg-white p-4 rounded-md
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
        <p className="font-semibold pr-2 text-2xl">{client? `Update ${client.client_name}'s Details` : "Add New Client"}</p>

        <div className="flex w-full flex-col md:flex-row gap-4">
          <div className="w-[50%]">
            <p className="">First Name</p>
            <input type="text" placeholder='First Name' 
              value={first_name}
              onChange={ev => setFirst_name(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="w-[50%]">
            <p className="">Last Name</p>
            <input type="text" placeholder='Last Name' 
              value={last_name}
              onChange={ev => setLast_name(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        </div>
        <div className="flex w-full flex-col md:flex-row gap-4">
          <div className="w-[50%]">
            <p className="">Email</p>
            <input type="email" placeholder='Email' 
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="w-[50%]">
            <p className="">Current Address: </p>
            {/* <input type="text" placeholder='Address' 
              value={address}
              onChange={ev => setAddress(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            />  */}
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_MAPS_API_KEY}
              selectProps={{
                address,
                placeholder: "Search Location...",
                isClearable: true,  
                isDisabled: false,  
                isLoading: false,  
                onChange: (val) => setAddress(val ? val.label : null)
              }}
            />
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row gap-4">
          <div className="w-[50%]">
            <p className="">Phone Number</p>
            <input type="text" placeholder='Phone Number' 
              value={phone_number}
              onChange={ev => setPhoneNumber(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="w-[50%]">
            <p className="">Preferred House Type </p>
            <input type="text" placeholder='House Type' 
              value={house_type}
              onChange={ev => setHouse_type(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row gap-4">
          <div className="w-[50%]">
            <p className="">Preferred City</p>
            {/* <input type="text" placeholder='City' 
              value={city}
              onChange={ev => setCity(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            />  */}
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_MAPS_API_KEY}
              selectProps={{
                city,
                placeholder: "Search City...",
                isClearable: true,  
                isDisabled: false,  
                isLoading: false,  
                onChange: (val) => setCity(val ? val.label : null)
              }}
            />
          </div>
          <div className="mb-4 w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="dropdown"
              onChange={(event) => setStatus(event.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">-Select Status-</option>
              <option value={"Active"}>{"Active"}</option>
              <option value={"Completed"}>{"Completed"}</option>
            </select>
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row gap-4">
          <div className="mb-4 w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payor
            </label>
            <select
              id="dropdown"
              value={payor}
              onChange={(event) => setPayor(event.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">-Select Payor-</option>
              {
                insurance_companies.map((company, index) => (
                  <option key={index} value={company.name}>{company.name}</option>
                  )
                )
              }
            </select>
          </div>
          <div className="w-[50%]">
            <p className="">Insurance Membership ID</p>
            <input type="text" placeholder='12334...' 
              value={insuranceMemberID}
              onChange={ev => setInsuranceMemberID(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row gap-4">
          <div className="w-[50%]">
            <p className="">PMI Number</p>
            <input type="text" placeholder='PMI Number' 
              value={pmiNumber}
              onChange={ev => setPmiNumber(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="w-[50%]">
            <p className="">Units </p>
            <input type="text" placeholder='Units' 
              value={units}
              onChange={ev => setUnits(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row gap-4">
          <div className="mb-4 w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Procedure Code
            </label>
            <select
              value={procode}
              onChange={(event) => setProcode(event.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">-Select-</option>
              <option value={"H2015"}>{"H2015"}</option>
            </select>
          </div>
          <div className="mb-4 w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modifier
            </label>
            <select
              value={modifier}
              onChange={(event) => setModifier(event.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">-Select-</option>
              <option value={"M8"}>{"M8"}</option>
            </select>
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row gap-4">
          <div className="mb-4 w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type
            </label>
            <select
              value={service_type}
              onChange={(event) => setServiceType(event.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">-Select-</option>
              <option value={"Housing Transition"}>{"Housing Transition"}</option>
              <option value={"Housing Enquiry"}>{"Housing Enquiry"}</option>
            </select>
          </div>
          {/* <div className="mb-4 w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modifier
            </label>
            <select
              value={modifier}
              onChange={(event) => setModifier(event.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">-Select-</option>
              <option value={"M8"}>{"M8"}</option>
            </select>
          </div> */}
        </div>

        <div className="flex w-full gap-4">
          <div className="w-full">
            <p className="">Additional Information</p>
            <textarea type="text" placeholder='Additional Information' 
              value={additional_info} 
              onChange={ev => setAdditional_info(ev.target.value)}
              className="h-32 border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {
            members && (
              <div className="mb-4">
                <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to Staff
                </label>
                <p className="mb-2">Current Staff: 
                  {members?.find((member) => member._id === staff_id)?.name || "None"}
                </p>
                  <select
                    onChange={handleSelectChange}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">-Select Staff-</option>
                      {members.map((member, index) => (
                        <option key={index} value={member._id}>{member.name}</option>
                      ))}
                  </select>
              </div>
            )
          }
        </div>
        <Button onClick={saveClient} className="mt-2">{client? "Update": "Add"} Client Details</Button>
      </div>
    </div>
  );
};

export default AddClientModal;