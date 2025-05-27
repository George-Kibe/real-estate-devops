"use client"

import axios from 'axios';
import { useParams } from 'next/navigation';
import { CalendarDays, Mail, PhoneCall, Star} from "lucide-react"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import moment from 'moment';
import Image from 'next/image';

const SingleProfessional = () => {
  const [professional, setProfessional] = useState();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  const fetchProfessionalDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/auth/users/${id}`);
      setProfessional(response.data)
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error)
      toast.error("Error fetching professional details")
      setLoading(false);
    }
  }
  useEffect(() => {
    if(id) {
      fetchProfessionalDetails();
    }
  }, [id])
  return (
    <div className="flex flex-col p-4 md:px-16 gap-4 text-[#0B2B5F]">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="flex flex-col lg:flex-row gap-4  shadow-lg ">
            {/* USER INFO CARD */}
            <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
              <div className="w-1/3">
                <Image
                  src={professional?.image || "/images/noAvatar.png"}
                  alt=""
                  width={144}
                  height={144}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-semibold">Name: {professional?.name}</h1>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <CalendarDays/>
                    <span>Joined:{moment(professional?.createdAt).format('MMMM Do YYYY')}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Mail/>
                    <span>{professional?.email}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <PhoneCall />
                    <span>{professional?.phoneNumber}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-lime-600"></div>
                    <span>{professional?.isAvailable?"Available" : "Not Available"}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <p className="">Profession:</p>
                    <span>{professional?.profession || 'No Profession'}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Star /> <Star /> <Star /> <Star /> <Star />
                    <p>82 reviews</p>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <p className="">12 Sales in last 12 Months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="w-full mx-auto p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold">About Me</h2>
          <p className="mt-1">Insurance agent (16 years experience)</p>
          
          <h3 className="text-lg font-semibold mt-4">Specialties:</h3>
          <div className="gap-2 mt-2 ">
            <div className="flex items-center gap-2"><span className="">🏠</span> Buyer's Agent</div>
            <div className="flex items-center gap-2"><span className="">📦</span> Relocation</div>
            <div className="flex items-center gap-2"><span className="">📜</span> Listing Agent</div>
            <div className="flex items-center gap-2"><span className="">🏢</span> Property Management</div>
            <div className="flex items-center gap-2"><span className="">💼</span> Consulting</div>
            <div className="flex items-center gap-2"><span className="">🏡</span> First Time Home Buyer</div>
          </div>
          
          <p className=" mt-4">
            {expanded
              ? "There's a reason why California is one of the fastest-growing cities in the United States - it's a wonderful place to live. The Live Music Capital of the World is home to beautiful parks, exciting entertainment, world-class dining, and a growing economy. It's a city unlike any other."
              : "There's a reason why California is one of the fastest-growing cities in the United States- it's a wonderful place to live..."}
          </p>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 font-semibold mt-2 hover:underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
        </div>
        <div className="flex mt-16 lg:m-auto w-full self-center lg:w-1/4">
          <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Contact Me</h2>
          <p className="text-sm ">You can contact us if you need our help</p>
          
          <div className="mt-4 space-y-3">
            <input type="text" placeholder="Name" className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" placeholder="Phone" className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea placeholder="Message" className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          
          <button className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700">
            Contact Me
          </button>
          
          <hr className="my-4" />
          
          <h3 className="text-md font-semibold text-gray-800">Professional Information</h3>
          <p className="text-sm ">This is professional information of us</p>
          
          <div className="mt-3 text-sm  space-y-2">
            <p><span className="font-semibold">Broker Address:</span> 2300 First Street #316, Livermore, CA 94550</p>
            <p><span className="font-semibold">Cell Phone:</span> (512) 241-2169</p>
            <p><span className="font-semibold">Websites:</span> <a href="#" className="text-blue-500">Website</a>, <a href="#" className="text-blue-500">Blog</a>, <a href="#" className="text-blue-500">Facebook</a></p>
            <p><span className="font-semibold">Screen Name:</span> Tiffany Holloway Team</p>
            <p><span className="font-semibold">Member Since:</span> 11/4/2015</p>
            <p><span className="font-semibold">Licenses:</span> 01739552 (CA)</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProfessional