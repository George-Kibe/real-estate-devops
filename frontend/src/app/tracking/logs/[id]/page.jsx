"use client"

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ArrowDownUp, CheckCircle, ChevronRight, Circle, CloudDownload, Loader, SlidersHorizontal, Trash2 } from "lucide-react";
import Table from "@/components/Table";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import TableSearch from "@/components/TableSearch";
// import { documents } from "../../../../../data/documents";
import moment from "moment";
import { Button } from "@/components/ui/button";
import next from 'next';

const options = [
    "Daily email reminders for upcoming follow ups", 
    "Urgent notification if an application deadline is approaching", 
    "Status notification if an application deadline is approcahing",
    "Status updated when a leasing office responds"
];

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

const columns = [
  {
    header: "SL No.",
    accessor: "slNo",
  },
  {
    header: "Date/Time",
    accessor: "dateAndTime",
    className: "md:table-cell",
  },
  {
    header: "Staff Name",
    accessor: "staffName",
    className: "md:table-cell",
  },
  {
    header: "Name And Address",
    accessor: "nameAndAddress",
    className: "hidden lg:table-cell",
  },
  {
    header: "Contact",
    accessor: "contact",
    className: "hidden md:table-cell",
  },
  {
    header: "Action Performed",
    accessor: "actionPerformed",
    className: "hidden md:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "md:table-cell",
  },
   {
    header: "Notes",
    accessor: "notes",
    className: "md:table-cell",
  },
//    {
//     header: "Action",
//     accessor: "Action",
//     className: "md:table-cell",
//   },
];

const docColumns = [
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Document Name",
    accessor: "documentName",
    className: "md:table-cell",
  },
  {
    header: "Document Type",
    accessor: "documentType",
    className: "md:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden lg:table-cell",
  },
  {
    header: "Notes",
    accessor: "notes",
    className: "hidden md:table-cell",
  },
]

export default function SingleLogPage({}) {
  const {id} = useParams();
  const searchParams = useSearchParams();
  const report_id  = searchParams.get('report_id');
  const client_id  = searchParams.get('client_id');
  const [nextSteps, setnextSteps] = useState();
  const [loading, setLoading] = useState(false);
  const [reportLogs, setReportLogs] = useState([]);
  const [reportLog, setReportLog] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [clientData, setClientData] = useState({});
  const [initLoading, setInitLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [report, setReport] = useState([]);
  const [documents, setDocuments] = useState([]);
  const router = useRouter();
  
  const getClientData = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/clients/?client_id=${client_id}`);
      setClientData(response.data.results[0]);
    } catch (error) {
      toast.error("Fetching client data failed!")
    }
  }
  const fetchLogData = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/report-logs/${id}`);
      const data = response.data
      setReportLog(data);
    } catch (error) {
      toast.error("Fetching Log data failed. Try Again!")
    }
  }
  
  const deleteLog = async() => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/drf-api/report-logs/${id}/`);
      const data = response.data
      router.push(`/tracking/${report_id}`);
      toast.success("Log deleted successfully!");
    } catch (error) {
      console.log("Error: ", error)
      toast.error("Deleting log failed. Try Again!")
    }
  }

  const fetchReportLogs = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/report-logs/?report_id=${parseInt(report_id)}`);
      const data = response.data
      setReportLogs(data.results);
    } catch (error) {
      console.log("Error: ", error)
    }
  }
  const fetchReport = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/reports/${report_id}`);
      const data = response.data
      setReport(data);
    } catch (error) {
      console.log("Error: ", error)
    }
  }
  const getDocuments = () => {
    const property =  report.properties.filter( property => property.title === reportLog.property?.title)[0];
    setnextSteps(property.nextSteps);
    setDocuments(property.additionalResources)
  }
  useEffect(() => {
    if (!report.id || !reportLog.id){
      return;
    }else{
      getDocuments();
    }
  }, [report.id,reportLog.id ])

  useEffect(() => {
    if (!id){
      return;
    }else{
      fetchLogData();
    }
  }, [id])
  
  useEffect(() => {
    if (!report_id){
      return;
    }else{
      fetchReportLogs();
      fetchReport();
    }
  }, [report_id])

  useEffect(() => {
    if (!client_id){
      return;
    }
    getClientData()
  }, [client_id]);


  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };
  const propertyLogs = reportLogs.filter(log => log.property.title === reportLog.property?.title);

  const renderRow = (log) => (
    <tr
      key={log.id}
      className="border border-gray-200 text-sm h-10"
    >
      <td className="md:table-cell font-semibold ">{log.pkid}</td>
      <td className="md:table-cell text-xs">{moment(log.date).format("MMMM DD YYYY")}/ {log.time}</td>
      <td className="md:table-cell">{log.staff_name}</td>
      <td className="hidden md:table-cell">{log.property?.title || log.property_name_and_address }</td>
      <td className="md:table-cell">{log.contact}</td>
      <td className="md:table-cell">{log.action_performed}</td>
      <td className="hidden md:table-cell">{
        log.status === "Applied" ? (
          <span className="text-green-500">Applied</span>
        ) : log.status === "Approved" ? (
          <span className="text-green-500">Approved</span>
        ) : log.status === "Pending" ? (
          <span className="text-yellow-500">Pending</span>
        ) : log.status === "Denied" ? (
          <span className="text-red-500">Denied</span>
        ) : log.status === "Archived" ? (
          <span className="text-blue-500">Archived</span>
        ): (
          <span className="">No Response</span>
        )}</td>
      <td className="">
        {log.notes}
      </td>
      {/* <td className="">
        <button onClick={() => router.push(`/tracking/logs/${log.id}`)} className="">
          <Eye />
        </button>
      </td> */}
    </tr>
  );

    const renderDocRow = (document) => (
    <tr
      key={document.id}
      className="border border-gray-200 text-sm h-10"
    >
      <td className="md:table-cell font-semibold ">{moment(document.date).format("MMMM DD YYYY")}</td>
      <td className="md:table-cell t">
         <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            <p className="flex flex-row gap-1">{document.name} <CloudDownload className="h-6 w-6" /></p>
          </a>
      </td>
      <td className="md:table-cell">{document.url.split(".")[3].toUpperCase()}</td>
      <td className="hidden md:table-cell">{
        document.status === "Submitted" ? (
          <span className="text-green-500">Submitted</span>
        ) : document.status === "ddd" ? (
          <span className="text-green-500">Not Submitted</span>
        ) : document.status === "Pending" ? (
          <span className="text-yellow-500">Pending</span>
        ) : document.status === "Not Submitted" ? (
          <span className="text-red-500">Not Submitted</span>
        ) : document.status === "Archived" ? (
          <span className="text-blue-500">Archived</span>
        ): (
          <span className="">No Response</span>
        )}
      </td>
      <td className="">
        {document.notes}
      </td>
    </tr>
  );
  // console.log("Report Log: ", reportLog)  
  return (
    <div className='flex flex-col justify-betweenm b-5 text-[#0B2B5F]'>
      {
        (loading || initLoading) && (
          <div className="flex flex-row gap-2 tex-2xl justify-center items-center">
            <Loader className="animate-spin w-24 h-24" />
            Loading ...
          </div>
        )
      }
      <ConfirmDeleteModal 
        title={`Log ${reportLog?.notes}`}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        deleteAction={deleteLog}
      />
      <h2 className=" font-bold text-xl md:text-2xl mb-2 md:mb-8 flex flex-wrap items-center">
        <button onClick={() => router.push("/tracking")} className="cursor-pointer">
            Follow Up Tracker
        </button>
        <ChevronRight className="h-6 w-6 ml-2 mr-2 text-[#45A71E]" />
        <button className="cursor-pointer">
            Client Follow Up
        </button>
        <ChevronRight className="h-6 w-6 ml-2 mr-2 text-[#45A71E]" />
        Log Details
      </h2>

      <div className="flex flex-col gap-2 mb-2 md:mb-4">
        <div className="w-full font-bold text-xl flex gap-4 my-2">
          <p className="font-semibold">Log Notes: </p>
          <p className="">{reportLog.notes}</p>
        </div>
        <div className="flex flex-col md:flex-row md: justify-between md:mr-8">
          <div className="gap-2 mb-2 ">
            <h2 className="font-bold text-xl gap-2">{reportLog?.property?.title || "No Title"}</h2>
            <p className="">{reportLog?.property?.street_address || "No address"}</p>
          </div>
          <Button className={"flex"} onClick={() => setShowDeleteModal(true)}>
            <Trash2 />
            Delete Log
          </Button>
        </div>
        
        <div className="flex mt-2 flex-col md:flex-row flex-wrap gap-2">
            <div className="w-full md:w-1/3 flex gap-4 my-2">
              <p className="font-semibold">Bedrooms/Bathrooms: </p>
              <p className=""> 1 Bed/ 1 Bath</p>
            </div>
            <div className="w-full md:w-1/3 flex gap-4 my-2">
                <p className="font-semibold">Agent or Landlord Name: </p>
                <p className="">{reportLog?.landlord_name}</p>
            </div>
            <div className="w-full md:w-1/3 flex gap-4 my-2">
                <p className="font-semibold">Rent Price: </p>
                <p className=""> ${reportLog?.property?.price}/Month</p>
            </div>
            <div className="w-full md:w-1/3 flex gap-4 my-2">
                <p className="font-semibold">Agent Phone Number: </p>
                <p className=""> {reportLog?.property?.phone_number}</p>
            </div>
            <div className="w-full md:w-1/3 flex gap-4 my-2">
                <p className="font-semibold">Subsidized Housing: </p>
                <p className="">
                    {reportLog?.property?.isSubsidized ? "Yes" : "No"}
                </p>
            </div>
            <div className="w-full md:w-1/3 flex gap-4 my-2">
                <p className="font-semibold">Agent ID: </p>
                <p className="">{reportLog?.agent_id || "Not Captured"}</p>
            </div>
            <div className="w-full md:w-1/3 flex gap-4 my-2">
                <p className="font-semibold">Last Contacted: </p>
                <p className="">{moment(reportLog.updated_at).format("MMMM DD YYYY")}</p>
            </div>
            <div className="w-full md:w-1/3 flex gap-4 my-2">
                <p className="font-semibold">Website</p>
                <p className="">{reportLog?.property?.website}</p>
            </div>
            <div className="w-full md:w-1/3 flex gap-4 my-2">
                <p className="font-semibold">Availability Status</p>
                <p className="">Pending Response</p>
            </div>
        </div>

      </div>
      <div className="bg-gray-100 m-2 p-2 flex flex-col md:flex-row">
        <div className="flex flex-col w-ful md:w-1/2">
            <h2 className="font-bold text-xl mb-2 md:mb-4">Client Information</h2>
            <div className="w-full flex gap-4 my-2">
                <p className="font-semibold">Client Name</p>
                <p className="">{clientData?.client_name}</p>
            </div>
            <div className="w-full flex gap-4 my-2">
                <p className="font-semibold"> Case ID</p>
                <p className="">#6272891</p>
            </div>
            <div className="w-full flex gap-4 my-2">
                <p className="font-semibold">Client Preferences</p>
                <p className="">{clientData?.house_type}</p>
            </div>
            <div className="w-full flex gap-4 my-2">
                <p className="font-semibold">Housing Assistance</p>
                <p className="">Sector 8 Voucher</p>
            </div>
            <div className="w-full flex gap-4 my-2">
                <p className="font-semibold">Application Submitted</p>
                <p className="">No</p>
            </div>
            <div className="w-full flex gap-4 my-2">
                <p className="font-semibold">Follow Up Priority</p>
                <p className="">High</p>
            </div>
            <div className="w-full flex gap-4 my-2">
                <p className="font-semibold">Case Manager</p>
                <p className="">{clientData?.staff_name}</p>
            </div>
            <div className="w-full flex gap-4 my-2">
                <p className="font-semibold"> Case Manager Contact</p>
                <p className="">{clientData?.staff_email}</p>
            </div>
        </div>
        <div className="flex flex-col w-ful md:w-1/2">
            <h2 className="font-bold text-xl mb-2 md:mb-4">Automated Reminders and Alerts</h2>
             <div className="grid  gap-4 p-4 ">
                {options.map((option) => {
                    const isSelected = selectedOptions.includes(option);
                    return (
                    <button
                        key={option}
                        onClick={() => toggleOption(option)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-md transition-all duration-200 border 
                        ${
                            isSelected
                            ? "bg-blue-100 border-blue-500 text-blue-700"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        {isSelected ? (
                        <CheckCircle className="text-blue-500" size={20} />
                        ) : (
                        <Circle className="text-gray-400" size={20} />
                        )}
                        <span className="font-medium">{option}</span>
                    </button>
                    );
                })}
            </div>
        </div>
      </div>

     <Table columns={docColumns} renderRow={renderDocRow} data={documents} headerClassName={"h-12 bg-[#E5FBDE]"}/>
     {
      documents.length === 0 && (
        <div className="flex flex-row gap-2 justify-center items-center">
          <p className="">No Documents For this Property</p>
        </div>
      )
     }
      
      <div className="flex justify-between items-center mt-8 md:mt-12">
        <h2 className="font-bold text-xl my-2 md:my-4">Follow Up History</h2>
        <div className="flex gap-8 mr-8">
          <TableSearch />
          <button className="flex gap-1">
          <ArrowDownUp />
          <p>Sort</p>
          </button> 
          <button className="flex gap-1">
          <SlidersHorizontal />
          <p>Filter</p>
          </button> 
        </div>
      </div>
     
      <Table columns={columns} renderRow={renderRow} data={propertyLogs} headerClassName={"h-12 bg-[#E5FBDE]"}/>

      <div className="bg-[#E5FBDE] m-2 md:mt-4 p-2 flex flex-col">
        <h2 className="font-bold text-xl my-2 md:my-4">Next Steps</h2>
        <div className="w-full flex gap-4 my-2">
            <p className="font-semibold">Follow Up Date:</p>
            <p className="">{moment(nextSteps?.followUpDate).format("MMMM DD YYYY")}</p>
        </div>
        <div className="w-full flex gap-4 my-2">
            <p className="font-semibold">Planned Action:</p>
            <p className="">{nextSteps?.plannedAction}</p>
        </div>
        <div className="w-full flex gap-4 my-2">
            <p className="font-semibold">Alternative Options:</p>
            <p className="">{nextSteps?.alternativeOptions}</p>
        </div>
        <div className="w-full flex gap-4 my-2">
            <p className="font-semibold">Client Status:</p>
            <p className="">{nextSteps?.clientStatus}</p>
        </div>
      </div>
      
    </div>
  );
}