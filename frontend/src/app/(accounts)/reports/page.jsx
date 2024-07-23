"use client"
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import moment from "moment";
import { set } from "mongoose";
import { Loader } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [reports, setReports] = useState([]);
  const {orgMode, tempUser, currentUser} = useMainProvider();
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
      //console.log("client ID: ", currentClient?.id)
      //console.log("Reports Data: ", data)
      const refinedReports = data.results.filter(report => report.properties.length > 0)
      setReports(refinedReports);
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
    //console.log("Selected Client ID: ", selectClient?.id)
  }
  const generateReport = async() => {
    setLoading(true);
    //const date = new Date().toISOString;
    //console.log("Date: ", date)
    const data = {
      client_id: currentClient?.id,
      title: `Daily report For ${currentClient?.client_name}`,
      client_name: currentClient?.client_name,
      description: "Daily report draft",
      status: "completed",
      report_type: "Daily",
      client_phone_number:currentClient?.phone_number,
      staff_id: orgMode? tempUser?._id : currentUser._id,
      owner_id: currentUser?.id
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/api/reports/`, data);
      const report = response.data
      // console.log("Report Details: ", report)
      if (response.status === 201) {
        router.push(`/reports/${report.pkid}/?searchTerm=${currentClient?.city}`)
      }
      setLoading(false);
    } catch (error) {
      toast.error("Report Generation failed. Try Again!")
      setLoading(false);
    }
  }
  const viewReport = (id) => {
    router.push(`/reports/${id}`)
  }

  const exportToExcel = (reports, name) => {
    if (reports.length === 0) {
      toast.error("No reports to export.");
      return;
    }

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    const mainReportData = [];
    const propertiesData = [];

    reports.forEach(report => {
      const mainData = {
        date: moment(report?.created_at).format('MMMM Do YYYY'),
        title: report?.title,
        description: report?.description,
        client_name: report?.client_name,
        client_id: report?.client_id,
        report_type: report?.report_type,
        status: report?.status,
        report_draft: report?.report_draft,
        report_final: report?.report_final,
        created_at: moment(report?.created_at).format('MMMM Do YYYY'),
        updated_at: moment(report?.updated_at).format('MMMM Do YYYY'),
      };
      mainReportData.push(mainData);

      report.properties.forEach(property => {
        const propertyData = {
          date: moment(report?.created_at).format('MMMM Do YYYY'),
          property_title: property?.title,
          street_address: property?.street_address,
          price: property?.price,
          description: property?.description,
          bathrooms: property?.bathrooms,
          phone_number: property?.phone_number,
          amenities: property?.amenities.join(', '),
          images: property?.images.join(', '),
          comments: property?.comments
        };
        propertiesData.push(propertyData);
      });
    });

    const mainSheet = XLSX.utils.json_to_sheet(mainReportData);
    const propertiesSheet = XLSX.utils.json_to_sheet(propertiesData);

    XLSX.utils.book_append_sheet(workbook, mainSheet, 'Summary Reports');
    XLSX.utils.book_append_sheet(workbook, propertiesSheet, 'Properties Details Report');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xls', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });
    saveAs(blob, `${name}-reports.xls`);
  };

  const exportAllClientReportsToExcel = async( ) => {
    try {
      setReportsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/reports/?owner_id=${currentUser?._id}`);
      const data = response.data
      const refinedReports = data.results.filter(report => report.properties.length > 0)
      exportToExcel(refinedReports, currentUser?.name);
      setReportsLoading(false);
    } catch (error) {
      toast.error("Fetching Reports failed. Try Again!")
      setReportsLoading(false);
    }
  }

  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      {/* <AnimatedText text={"Reports Page"} /> */}
      <p className="self-center font-bold text-2xl mb-4 md:mb-8">Select Client to View their  Reports</p>

      <div className="flex w-full">
        <Button onClick={exportAllClientReportsToExcel} className="ml-auto">
          {
            reportsLoading? <Loader className="animate-spin mr-2" />: "Export All Clients Reports to Excel"
          }
        </Button>
      </div>
      {
        !clients?.length && <p className="">You do not have any clients Reports yet!</p>
      }
      <div className="overflow-hidden rounded-lg border shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="">
            <tr>
              <th scope="col" className="px-2 py-1 font-medium">#</th>
              <th scope="col" className="px-2 py-1 font-medium">First Name</th>
              <th scope="col" className="px-2 py-1 font-medium">Last Name</th>
              <th scope="col" className="px-2 py-1 font-medium">House Type</th>
              <th scope="col" className="px-2 py-1 font-medium">Preferred City</th>
            </tr>
          </thead>
          <tbody className="divide-y ">
            {
              clients?.map((client, index) => (
                <tr onClick={() => selectClient(client)} key={index}
                  className={client.id === currentClient?.id ? "bg-lime-500 w-full cursor-pointer": "w-full cursor-pointer"}
                >
                    <td className="px-2 py-1 text-sm">{index + 1}</td>
                    <th className="flex gap-3 px-2 py-1 font-normal">
                      <div className="text-sm">
                        <div className="font-medium ">
                          <Button>
                          {client.first_name || client.client_name}
                          </Button>
                        </div>
                        {/* <div className="">{client.email}</div> */}
                      </div>
                    </th>
                    <td className="px-2 py-1">{client.last_name || client.client_name}</td>
                    <td className="px-2 py-1">
                      <div className="flex gap-2">
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                        >
                          {client.house_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-1">{client.city}</td>
                  </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        currentClient && (
          <div className="flex flex-col items-center justify-center">
            <p className="self-center font-bold text-2xl mb-4 md:mb-8">Reports for: {currentClient?.client_name}</p>
            <div className="flex-1 w-full flex flex-col md:flex-row justify-around">
              <Button onClick={generateReport}>
                {loading? "Generating Report...": `Generate ${currentClient?.client_name}'s Report for Today`}
              </Button>
              <Button onClick={() => exportToExcel(reports, currentClient?.client_name)}>
                {loading? "Generating Report...": `Export ${currentClient?.client_name}'s Reports to Excel`}
              </Button>
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
                        <th className="flex gap-3 px-2 py-1 font-normal">
                          <div className="text-sm flex">
                            <div className="font-medium text-lime-500">{index+1}.</div>
                            <div className="">{report?.report_final}</div>
                          </div>
                        </th>
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