"use client"
import AnimatedText from '@/components/AnimatedText';
import { Button } from '@/components/ui/button';
import { useMainProvider } from '@/providers/MainProvider';
import axios from 'axios';
import { Loader, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';
import moment from 'moment';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;


const AddVisit = () => {
  const {orgMode, tempUser, currentUser, currentClient, setCurrentClient} = useMainProvider();
  const [myClients, setMyClients] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showcalendar, setShowcalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const router = useRouter();
  console.log("myClients: ", myClients);

  const fetchClients = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/clients/?owner_id=${currentUser?._id}`);
      const data = response.data
      setAllClients(data.results);
    } catch (error) {
      toast.error("Fetching Clients failed. Try Again!")
    } 
  }
  useEffect(() => {
    setCurrentClient(null)
    fetchClients()
  }, [])

  const handleMyClients = () => {
    if (orgMode){
      const myClients = allClients.filter((client) => client.staff_id === tempUser?._id);
      setMyClients(myClients)
      return;
    }
    setMyClients(allClients)
  }

  useEffect(() => {
    handleMyClients()
  }, [allClients.length])
  
  const generateNewReport = async(isBlank) => {
    if(!currentClient){
      toast.error("Select a client to generate report")
      setLoading(false);
      return;
    }
    const data = {
      client_id: currentClient?.id,
      title: `Daily report For ${currentClient?.client_name}`,
      client_name: currentClient?.client_name,
      description: "Daily report draft",
      status: "completed",
      report_type: "Transition Services",
      client_phone_number:currentClient?.phone_number,
      staff_id: orgMode? tempUser?._id : currentUser._id,
      staff_name: orgMode? tempUser?.name : currentUser.name,
      owner_id: currentUser?._id,
      report_date: moment(date).format('YYYY-MM-DD'),

      start_time: moment(new Date().toISOString()).format('HH:mm:ss'),
      end_time: moment(new Date().toISOString()).format('HH:mm:ss'), 

      report_draft: "No draft", 
      report_final: "No final report", 
      housing_coordinator_name: orgMode? tempUser?.name : currentUser?.name,
      housing_coordinator_id : orgMode? tempUser?._id : currentUser?._id,
    }
    console.log("Data: ", data)
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/drf-api/reports/`, data);
      const report = response.data
      // console.log("Report Details: ", report)
      if (response.status === 201) {
        if (isBlank) {
          router.push(`/reports/${report.pkid}`)
        } else {
          router.push(`/reports/${report.pkid}/?searchTerm=${currentClient?.city}`)
        }
      }
      setLoading(false);
    } catch (error) {
      toast.error("Report Generation failed. Try Again!")
      console.log("Error: ", error)
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-8 text-[#0B2B5F]">
      <AnimatedText text={"start Working on A Client"} />
      {
        loading && (
          <p className="flex text-2xl flex-row gap-2 items-center">
            <Loader className='animate-spin w-24 h-24' /> Loading...
          </p>
          )
      }
      <div className="mb-4">
        <label className="block text-lg font-bold mb-2">
          Select Client
        </label>
        <select
          className="shadow appearance-none border rounded w-full md:w-[40%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
          id="bill_status"
          name="bill_status"
          value={currentClient?.id || ""}
          onChange={(e) => {
            const selectedClient = myClients.find(client => client.id === e.target.value);
            setCurrentClient(selectedClient);
          }}
        >
          <option value="">-Select Client-</option>
          {
            myClients?.map((client) => (
              <option key={client.id} value={client.id}>
                {client.client_name}
              </option>
            ))
          }
        </select>
      </div>
      <div className="relative flex flex-col mb-4 ">
          <p className="font-semibold">Report For:</p>
          <div className="flex gap-4 flex-row mb-2">
            <button onClick={() => setShowcalendar(!showcalendar)} className="border px-2 border-black">
              Date :  {moment(date).format("MM/DD/YYYY")}
            </button>
          </div> 
          {
            showcalendar && (
              <div className="absolute top-10 left-0 z-10">
                <Calendar onChange={(date) => {
                  setDate(date)
                  setShowcalendar(false)
                }} value={date} />
              </div>
            )
          }
        </div>
      <div className="flex flex-col w-auto gap-2">
        <Button className="self-start" onClick={() => generateNewReport(true)}>
           <p className="mr-2">
            {
              loading ? "Loading Report..." : "PROCEED"
            }
           </p>
            <PlusCircle />
        </Button>
        <Button className="self-start" onClick={() => generateNewReport(false)}>
           <p className="mr-2">
            {
              loading ? "Loading Report..." : "PROCEED WITH HOUSING SEARCH"
            }
           </p>
            <PlusCircle />
        </Button>
      </div>
    </div>
  )
}

export default AddVisit