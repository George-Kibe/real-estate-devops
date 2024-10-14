"use client"

import axios from 'axios';
import { useParams } from 'next/navigation';
import { CalendarDays, Mail, PhoneCall, Users2, ScrollText} from "lucide-react"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import moment from 'moment';
import Image from 'next/image';

const SingleProfessional = () => {
  const [professional, setProfessional] = useState();
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
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
    {/* LEFT */}
    <div className="w-full xl:w-2/3">
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
            <p className="text-sm text-gray-500">
              {professional?.bio || "No User Bio"}
            </p>
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
                <span>{professional?.status || 'Active'}</span>
              </div>
              <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                <p className="">Profession:</p>
                <span>{professional?.profession || 'No Profession'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SingleProfessional