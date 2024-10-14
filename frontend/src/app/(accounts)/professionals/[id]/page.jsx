"use client"

import axios from 'axios';
import { useParams } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

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
    <div>
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
                <p className="">Role:</p>
                <span>{professional?.role || 'No Role'}</span>
              </div>
            </div>
          </div>
        </div>
        {/* SMALL CARDS */}
        <div className="flex-1 flex gap-4 justify-between flex-wrap">
          {/* CARD */}
          <div className=" p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
            <ScrollText />
            <div className="">
              <h1 className="text-xl font-semibold">{staffReports.length}</h1>
              <span className="text-sm text-gray-400">Reports Done</span>
            </div>
          </div>
          {/* CARD */}
          <div className="p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
            <Users2/>
            <div className="">
              <h1 className="text-xl font-semibold">{staffClients.length}</h1>
              <span className="text-sm text-gray-400">Allocated clients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProfessional