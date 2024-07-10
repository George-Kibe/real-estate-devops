"use client"

import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import { Brain, LoaderCircle } from 'lucide-react';
import moment from "moment/moment";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

export default function MembersPage() {
  const {currentUser} = useMainProvider();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState();
  const {id} = useParams();
  const divRef = useRef();
  const router = useRouter();

  const handlePrint = () => {
    const printContent = divRef.current;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Refresh the page to restore original content
  };

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
  console.log("Current Report: ", report)
  const GenerateSummaryFromAI = async() => {
    console.log("Generate Summary from AI")
  }
  const onSave = async(e) => {
    e.preventDefault();
    console.log("On Save: ", summary)
    // updateReport(formData)
  }
  // const handlePrint = () => {
  //   window.print();
  // };

  const deleteReport = async(reportId) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/reports/${reportId}/`);
      const data = response.data
      console.log("Delete Report Data: ", data)
      toast.success("Report Deleted Successfully!")
      router.push(`/reports`)
    } catch (error) {
      toast.error("Report Delete failed. Try Again!")
    }
  }

  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={`Report for ${report?.client_name}-${moment(report?.created_at).format('MMMM Do YYYY')}`} />
      <div ref={divRef} className='flex flex-col gap-5'>
        <div className='flex flex-row gap-4'>
          <p className=''><p className="font-semibold">Report Title:</p> {report?.title}</p>
          <p className=''><p className="font-semibold">Report Type:</p> {report?.report_type}</p>
        </div>
        <div className='flex flex-row gap-2'>
          <p className=''><p className="font-semibold">Report Description:</p> {report?.description}</p>
        </div>
        <div className='flex flex-row gap-2'>
          <p className=''><p className="font-semibold">Report Draft:</p> {report?.report_draft}</p>
        </div>
        <div className='flex flex-row gap-2'>
          <p className=''><p className="font-semibold">Report Final:</p> {report?.report_final}</p>
        </div>
        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summary</label>
                <Button variant="outline" onClick={()=>GenerateSummaryFromAI()} 
                type="button" size="sm" className="border-primary text-primary flex gap-2"> 
                <Brain className='h-4 w-4' />  Generate Summary Using AI</Button>
            </div>
            <Textarea className="mt-5" required
                value={summary}
                defaultValue={summary?summary:report?.report_draft}
                onChange={(e)=>setSummary(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
            <Button type="submit"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
            </div>
        </form>
        <div className='flex gap-2'>
          <Button onClick={updateReport}>Update Report</Button>
          <Button onClick={() => deleteReport(id)} variant="destructive">Delete Report</Button>
          <Button onClick={handlePrint}  className="">Export PDF</Button>
          <Button onClick={handlePrint} className="">Share</Button>
        </div>
      </div>
    </div>
  );
}