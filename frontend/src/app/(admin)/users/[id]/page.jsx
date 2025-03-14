"use client"

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const SingleAgencyView = () => {
  const {id} = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agency, setAgency] = useState({});
  const getAgencyData = async() => {
    try {
      const response = await axios.get(`/api/auth/users/${id}`);
      console.log("Agency Data: ", response.data)
      setAgency(response.data);
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Error fetching agency data");
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!id){
      return;
    }
    getAgencyData();
  }, [id])
  
  if (loading) {
    return <LoadingPage />
  }
  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">{agency.orgName}</h1>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-4">
          <button
            className="md:hidden block text-blue-600 mb-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          </button>
          <ul className={`space-y-3 ${isMobileMenuOpen ? "block" : "hidden md:block"}`}>
            {["Agency Information", "Location", "Division", "Department", "Maintenance Issue"].map(
              (item, index) => (
                <li key={index} className="p-3 bg-gray-200 rounded-md text-gray-700">
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Agency Name */}
            <div>
              <label className="text-gray-600 text-sm">Agency Name</label>
              <input
                type="text"
                value={agency.orgName}
                disabled
                className="w-full mt-1 p-2 bg-gray-100 rounded-md"
              />
            </div>

            {/* Contact Person */}
            <div>
              <label className="text-gray-600 text-sm">Agency Contact Person Name</label>
              <input
                type="text"
                value={agency.name}
                disabled
                className="w-full mt-1 p-2 bg-gray-100 rounded-md"
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="text-gray-600 text-sm">Postal Code*</label>
              <input
                type="text"
                value="55423"
                disabled
                className="w-full mt-1 p-2 bg-gray-100 rounded-md"
              />
            </div>

            {/* City */}
            <div>
              <label className="text-gray-600 text-sm">City*</label>
              <input
                type="text"
                value="Minneapolis"
                disabled
                className="w-full mt-1 p-2 bg-gray-100 rounded-md"
              />
            </div>

            {/* State */}
            <div>
              <label className="text-gray-600 text-sm">State*</label>
              <input
                type="text"
                value="Minnesota"
                disabled
                className="w-full mt-1 p-2 bg-gray-100 rounded-md"
              />
            </div>

             {/* State */}
             <div>
              <label className="text-gray-600 text-sm">Phone Number</label>
              <input
                type="text"
                value={agency.phoneNumber}
                disabled
                className="w-full mt-1 p-2 bg-gray-100 rounded-md"
              />
            </div>

            {/* Address */}
            <div className="col-span-1 md:col-span-2">
              <label className="text-gray-600 text-sm">Address*</label>
              <input
                type="text"
                value="6417 Penn Ave S Ste 7"
                disabled
                className="w-full mt-1 p-2 bg-gray-100 rounded-md"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Remove Agency
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Edit Agency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAgencyView;
