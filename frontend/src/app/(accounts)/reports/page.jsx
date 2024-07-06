
"use client"

import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [reports, setReports] = useState([]);
  const {currentUser} = useMainProvider();
  const router = useRouter();
  //console.log("Current Client: ", currentClient)

  const fetchClients = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/clients/?owner_id=${currentUser?._id}`);
      const data = response.data
      // console.log("Clients Data: ", data)
      setClients(data.results);
    } catch (error) {
      toast.error("Fetching Clients failed. Try Again!")
    }
  }
  const fetchReports = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reports/?client_id=${currentClient?.id}`);
      const data = response.data
      console.log("Reports Data: ", data)
      setReports(data.results);
    } catch (error) {
      toast.error("Fetching Reports failed. Try Again!")
    }
  }
  useEffect(() => {
    fetchClients()
  }, [loading])

  useEffect(() => {
    if(currentClient){
      fetchReports();
    }else{
      setReports([]);
    }
  }, [currentClient?.id])

  const selectClient = (client) => {
    setCurrentClient(client)
    console.log("Selected Client ID: ", id)
  }
  const generateReport = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reports/generate-report/${currentClient?._id}`);
      const data = response.data
      console.log("Report Data: ", data)
      toast.success("Report Generated Successfully!")
    } catch (error) {
      toast.error("Report Generation failed. Try Again!")
    }
  }
  const viewReport = (id) => {
    router.push(`/reports/${id}`)
  }

  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      {/* <AnimatedText text={"Reports Page"} /> */}
      <p className="self-center font-bold">Select Client to View their  Reports</p>
      {
        !clients?.length && <p className="">You do not have any clients Reports yet!</p>
      }
      <div className="overflow-hidden rounded-lg border shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm">
          <tbody className="divide-y ">
            {
              clients?.map((client, index) => (
                <button onClick={() => selectClient(client)} 
                  className={client.id === currentClient?.id ? "bg-lime-500 w-full": "w-full"}
                >
                  <tr className="" key={index}>
                  <th className="flex gap-3 px-6 py-4 font-normal">
                    <div className="text-sm">
                      <div className="font-medium ">{index+1}.{"  "+ client.client_name}</div>
                      <div className="">{client.email}</div>
                    </div>
                  </th>

                  <td className="px-6 py-4">{client.city}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                      >
                        {client.phone_number}
                      </span>
                    </div>
                  </td>
                </tr>
                </button>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        currentClient && (
          <div className="flex flex-col items-center justify-center">
            <p className="self-center font-bold">Reports for: {currentClient?.client_name}</p>
            <div className="">
              <Button onClick={generateReport}>Generate Today's Report</Button>
            </div>
            {
              !reports?.length && <p className="">You do not have any reports for this client yet!</p>
            }
            <div className="overflow-hidden rounded-lg border shadow-md m-5">
              <table className="w-full border-collapse text-left text-sm">
                <tbody className="divide-y ">
                  {
                    reports?.map((report, index) => (
                      <tr className="" key={index}>
                      <th className="flex gap-3 px-6 py-4 font-normal">
                        <div className="text-sm flex">
                          <div className="font-medium text-lime-500">{index+1}.</div>
                          <div className="">{report?.report_final}</div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{report?.created_at}</td>
                      <td className="px-6 py-4">
                        <Button onClick={()=>viewReport(report?.pkid)}>View Report</Button>
                      </td>
                    </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    </div>
  );
}