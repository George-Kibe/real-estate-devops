"use client"

import AnimatedText from "@/components/AnimatedText";
import Property from "@/components/Property";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default function ServicesPage() {
  const [loading, setLoading] = useState(false);
  const {currentUser} = useMainProvider();
  const [myData, setMyData] = useState(null);
  const [staffId, setStaffId] = useState('');
  const [staffData, setStaffData] = useState(null);
  const [ownerID, setOwnerID] = useState('');
  const [ownerData, setOwnerData] = useState(null);
  const [reports, setReports] = useState([]);
  const email = currentUser?.email;
  const router = useRouter();

  const fetchClientData = async() => {
    try {
      console.log("API URL: ", `${BACKEND_URL}/drf-api/clients/?email=${email}`)
      const response = await axios.get(`${BACKEND_URL}/drf-api/clients/?email=${email}`)
      if (response.status === 200 && response?.data?.results?.length > 0) {
        setMyData(response.data.results[0]);
        setStaffId(response.data.results[0].staff_id);
        setOwnerID(response.data.results[0].owner_id);
      }
    } catch (error) {
      consolerror(error.message);
    }
  }

  useEffect(() => {
    fetchClientData();
  }, [])

  const getUserData = async(id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/auth/users/${id}`)
      if (response.status === 200) {
        if (staffId === id) {
          setStaffData(response.data);
        } else {
          setOwnerData(response.data);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("Fetching user failed");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (staffId) {
      getUserData(staffId);
    }
  }, [staffId])
  useEffect(() => {
    if (ownerID) {
      getUserData(ownerID);
    }
  }, [ownerID])

  const fetchReports = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/reports/?client_id=${myData?.id}`);
      const data = response.data
      const refinedReports = data.results.filter(report => report.properties.length > 0)
      setReports(refinedReports);
      console.log("Reports Data: ", refinedReports)
    } catch (error) {
      toast.error("Fetching Reports failed. Try Again!")
    }
  }
  
  useEffect(() => {
    if(myData?.id){
      fetchReports();
    }
  }, [myData?.id])

  const viewReport = (id) => {
    router.push(`/services/${id}`)
  }
  
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"Properties' Services"} />
      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Organization Name: {loading? "Loading...": ownerData?.orgName || ownerData?.name || "None"}</h1>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Assigned Staff Name: {loading? "Loading..." : staffData?.lastName || "None"}-{staffData?.phoneNumber}</h1>
      </div>
      {
        reports?.length > 0 && (
          <div className="">
            <AnimatedText text={"My Reports"}/>
            <div className="w-full overflow-hidden rounded-lg border shadow-md m-5">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="">
                  <tr>
                    <th scope="col" className="px-2 py-1 font-medium">#</th>
                    <th scope="col" className="px-2 py-1 font-medium">Report Title</th>
                    <th scope="col" className="px-2 py-1 font-medium">Report Date</th>
                    <th scope="col" className="px-2 py-1 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y ">
                  {
                    reports?.map((report, index) => (
                      <tr className="w-full flex-1" key={index}>
                        <td className="">{index+1}.</td>
                        <td className="">{report?.title}</td>
                        <td className="px-2 py-1">
                          {moment(report?.created_at).format('MM/DD/YYYY')}
                        </td>
                        <td className="px-2 py-1">
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