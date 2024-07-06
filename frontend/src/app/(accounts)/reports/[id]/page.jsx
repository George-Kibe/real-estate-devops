"use client"

import AnimatedText from "@/components/AnimatedText";
import InviteClientModal from "@/components/modals/InviteClientModal";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import {Trash2, Pencil} from 'lucide-react';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

export default function MembersPage() {
  const {currentUser} = useMainProvider();
  const [report, setReport] = useState(null);
  const {id} = useParams()

  const fetchReport = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reports/${id}`);
      const data = response.data
      // console.log("Report Data: ", data)
      setReport(data);
    } catch (error) {
      toast.error("Fetching Clients failed. Try Again!")
    }
  }
  useEffect(() => {
    fetchReport();
  }, [])

  const updateReport = async() => {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/reports/${id}`, formData);
      const data = response.data
      console.log("Update Report Data: ", data)
      toast.success("Report Updated Successfully!")
    } catch (error) {
      toast.error("Report Update failed. Try Again!")
    }
  }
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={`Report ID ${id}`} />
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          <p className='text-lg font-semibold'>Report Title: {report?.title}</p>
          <p className='text-lg font-semibold'>Report Description: {report?.description}</p>
          <p className='text-lg font-semibold'>Report Status: {report?.status}</p>
        </div>
        <div className='flex gap-2'>
          <Button onClick={updateReport}>Update Report</Button>
          <Button variant="destructive">Delete Report</Button>
        </div>
      </div>
    </div>
  );
}