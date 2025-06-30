"use client"

import { useMainProvider } from "@/providers/MainProvider";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowDownUp, BadgeCheck, Ban, CalendarDays, ChevronRight, Clock, Eye, FolderUp, Loader, Plus, SearchX, SlidersHorizontal, Trash, TriangleAlert } from "lucide-react";
import Table from "@/components/Table";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import CallReminder from "@/components/follow-ups/CallReminder";
import { Button } from "@/components/ui/button";
import AddLogModal from "@/components/modals/AddLogModal";
import AddReminderModal from "@/components/modals/AddReminderModal";
import { toast } from "react-toastify";

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
   {
    header: "Action",
    accessor: "Action",
    className: "md:table-cell",
  },
];

export default function TrackingPage() {
  const {id} = useParams();
  const searchParams = useSearchParams();
  const search  = searchParams.get('search');
  const [reminderToDelete, setReminderToDelete] = useState({});
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [showReminderModal , setshowReminderModal ] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [reportLogs, setReportLogs] = useState([]);
  const [report, setReport] = useState();
  const router = useRouter();


  const fetchReport = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/reports/${id}/`);
      const data = response.data
      setReport(data);
    } catch (error) {
      // toast.error("Fetching Clients failed. Try Again!")
      console.log("Error: ", error)
    }
  }
  const fetchReminders = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/reminders/?report_id=${parseInt(id)}`);
      const data = response.data
      setReminders(data.results);
    } catch (error) {
      // toast.error("Fetching Clients failed. Try Again!")
      console.log("Error: ", error)
    }
  }
  const fetchReportLogs = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/report-logs/?report_id=${parseInt(id)}`);
      const data = response.data
      setReportLogs(data.results);
    } catch (error) {
      // toast.error("Fetching Clients failed. Try Again!")
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    if (!id){
      return;
    }else{
      fetchReport();
      fetchReminders();
      fetchReportLogs();
    }
  }, [id]);
  const deleteReminder = async() => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/drf-api/reminders/${reminderToDelete.pkid}/`);
      const data = response.data
      fetchReminders();
    } catch (error) {
      // toast.error("Fetching Clients failed. Try Again!")
      console.log("Error: ", error)
    }
  }
  console.log(report?.properties)
  // get number of noResponses, applications, followups, approved, pending, deleted/archives
  const noResponses = report?.properties?.filter(property => !property.response).length;
  const responses = report?.properties?.filter(property => property.response).length;
  const applications = report?.properties?.filter(property => property.status?.pending === true).length;
  const approvedProperties = report?.properties?.filter(property => property.isApproved?.isApproved === true).length;
  const pendingProperties = report?.properties?.filter(property => property.status?.pending === true).length;
  const deletedproperties = report?.properties?.filter(property => property.archived?.archived === true).length;
  const nonFitProperties = report?.properties?.filter(property => property.isFit?.isFit === false).length;
  const deniedProperties = report?.properties?.filter(property => property.denied?.denied === true).length;

  // to get followups. 
  // Get all reminders, then group them by property name to get the number of unique property names
  const uniqueTitles = new Set();
  reminders.forEach(reminder => {
    const title = reminder.property?.title;
    if (title) {
      uniqueTitles.add(title);
    }
  });

  const renderRow = (log) => (
    <tr
      key={log.id}
      className="border border-gray-200 text-sm h-10"
    >
      <td className="md:table-cell font-semibold ">{log.pkid}</td>
      <td className="md:table-cell text-xs">{log.date}/ {log.time}</td>
      <td className="md:table-cell">{log.staff_name}</td>
      <td className="hidden md:table-cell">{log.property_name_and_address}</td>
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
          <span className="">{log.status}</span>
        )}</td>
      <td className="">
        {log.notes}
      </td>
      <td className="">
        <button onClick={() => router.push(`/tracking/logs/${log.pkid}/?report_id=${id}&client_id=${report.client_id}`)} className="">
          <Eye />
        </button>
      </td>
    </tr>
  );
  const handleSort = () => {
    toast.success("Property Logs sorted.")
  }

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
        title={`Reminder ${reminderToDelete?.title}`}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        deleteAction={deleteReminder}
      />
      <AddLogModal
        isOpen={showAddLogModal}
        properties={report?.properties || []}
        setLoading={setLoading}
        client_name={report?.client_name}
        client_referral_id={report?.client_referral_id}
        id={id}
        fetchReportLogs={fetchReportLogs}
        onClose={() => setShowAddLogModal(false)}
      />

      <AddReminderModal
        setLoading={setLoading}
        id={id}
        properties={report?.properties || []}
        fetchReminders={fetchReminders}
        client_name={report?.client_name}
        client_referral_id={report?.client_referral_id}
        isOpen={showReminderModal}
        onClose={() => setshowReminderModal(false)}
      />
      
      <h2 className="font-bold text-xl md:text-2xl mb-2 md:mb-8 flex flex-wrap items-center">
        <button onClick={() => router.push("/tracking")} className="cursor-pointer">
            Follow Up Tracker
        </button>
        <ChevronRight className="h-6 w-6 ml-2 mr-2 text-[#45A71E]" />
        Client Follow Up
      </h2>
      <div className="flex gap-2 mb-2 md:mb-4">
        <Image src={'/images/noAvatar.png'} width={50} height={50} className="rounded-md" />
        <div className="">
            <h2 className="font-bold text-xl">{report?.client_name}</h2>
            <p className="">{report?.client_email}</p>
        </div>
      </div>
      <div className="bg-gray-100 m-2 p-2">
        <h2 className="font-bold text-xl mb-2 md:mb-4">Apartment Status</h2>
        <div className="flex flex-col md:flex-row md:gap-4">
            <div className="flex gap-4">
                <p className="">Number of Follow Ups:</p>
                <p className="font-semibold">{reminders.length}</p>
            </div>
            <div className="flex gap-4">
                <p className="">Responses from Follow Ups: </p>
                <p className="font-semibold">{responses}</p>
            </div>
        </div>
        <div className="mt-4 md:mt-8 flex gap-4 flex-wrap">
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
              <div className="flex flex-col gap-4">
                  <h2 className="">No Response</h2>
                  <p className="">{noResponses}</p>
              </div>
              <div className="">
                  <TriangleAlert className="text-blue-500" />
              </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
              <div className="flex flex-col gap-4">
                <h2 className="">Applications</h2>
                <p className="">{applications}</p>
              </div>
              <div className="">
                <FolderUp className="text-blue-500" />
              </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
              <div className="flex flex-col gap-4">
                <h2 className="">Follow Ups</h2>
                <p className="">{uniqueTitles.size}</p>
              </div>
              <div className="">
                <CalendarDays className="text-blue-500" />
              </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
              <div className="flex flex-col gap-4">
                <h2 className="">Approved</h2>
                <p className="">{approvedProperties}</p>
              </div>
              <div className="">
                <BadgeCheck className="text-green-500" />
              </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
              <div className="flex flex-col gap-4">
                <h2 className="">Pending</h2>
                <p className="">{pendingProperties}</p>
              </div>
              <div className="">
                <Clock className="text-blue-500" />
              </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
              <div className="flex flex-col gap-4">
                <h2 className="">Deleted</h2>
                <p className="">{deletedproperties}</p>
              </div>
              <div className="">
                <Trash className="text-red-500" />
              </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
              <div className="flex flex-col gap-4">
                <h2 className="">Non Fit</h2>
                <p className="">{nonFitProperties}</p>
              </div>
              <div className="">
                <SearchX className="text-red-500" />
              </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
              <div className="flex flex-col gap-4">
                <h2 className="">Denied</h2>
                <p className="">{deniedProperties}</p>
              </div>
              <div className="">
                <Ban className="text-red-500" />
              </div>
            </div>
        </div>
      </div>
       <div className="bg-gray-100 m-2 p-2 pt-4">
          <div className="flex flex-col md:flex-row justify-between mr-8">
            <h2 className="font-bold text-xl mb-2 md:mb-4">Call Reminders</h2>
            <Button className={"flex"} onClick={() => setshowReminderModal(true)}>
              <Plus />
              Add Reminder
            </Button>
          </div>
          <p className="mb-2">You have {reminders.length} Call remainders</p>
          <div className="flex flex-col md:flex-row md:flex-wrap w-full">
            {
              reminders.map((reminder, index) => (
                  <CallReminder 
                    index={index} 
                    reminder={reminder} 
                    showDeleteModal={showDeleteModal}
                    setReminderToDelete={setReminderToDelete}
                    setShowDeleteModal={setShowDeleteModal} 
                  />
              ))
            }
          </div>
        </div>
     
      <div className="flex justify-between items-center mt-8 md:mt-12">
        <h2 className="font-bold text-xl my-2 md:my-4">Follow Up Logs</h2>
        <div className="flex gap-8 mr-8">
          <Button className={"flex"} onClick={() => setShowAddLogModal(true)}>
            <Plus />
            Add New Log
          </Button>
          <TableSearch />
          <button onClick={handleSort} className="flex gap-1">
          <ArrowDownUp />
          <p>Sort</p>
          </button> 
          {/* <button className="flex gap-1">
            <SlidersHorizontal />
            <p>Filter</p>
          </button>  */}
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={reportLogs} headerClassName={"h-12 bg-[#E5FBDE]"}/>
    </div>
  );
}