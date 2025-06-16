"use client"

import { useMainProvider } from "@/providers/MainProvider";
import { useParams, useRouter } from 'next/navigation';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowDownUp, BadgeCheck, CalendarDays, ChevronRight, Clock, Eye, FolderUp, Loader, Plus, SlidersHorizontal, Trash, TriangleAlert } from "lucide-react";
import Table from "@/components/Table";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { logs, reminders } from "@/constants/reminders";
import CallReminder from "@/components/follow-ups/CallReminder";
import { Button } from "@/components/ui/button";
import AddLogModal from "@/components/modals/AddLogModal";
import AddReminderModal from "@/components/modals/AddReminderModal";
import { set } from "mongoose";

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

export default function TrackingPage({params}) {
  const {id} = useParams();
  const { search } =  React.use(params)
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [showReminderModal , setshowReminderModal ] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [reportLogs, setReportLogs] = useState([]);
  const [report, setReport] = useState();
  const [currentStaff, setCurrentStaff] = useState(null);
  const {orgMode, currentUser, currentClient, setCurrentClient} = useMainProvider();
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
          <span className="">No Response</span>
        )}</td>
      <td className="">
        {log.notes}
      </td>
      <td className="">
        <button onClick={() => router.push(`/tracking/logs/${log.id}`)} className="">
          <Eye />
        </button>
      </td>
    </tr>
  );

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
        title={"Report"}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
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
                <p className="font-semibold">{reminders.length +  reportLogs.length}</p>
            </div>
            <div className="flex gap-4">
                <p className="">Responses from Follow Ups: </p>
                <p className="font-semibold">12</p>
            </div>
        </div>
        <div className="mt-4 md:mt-8 flex gap-4 flex-wrap">
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
                <div className="flex flex-col gap-4">
                    <h2 className="">No Response</h2>
                    <p className="">12</p>
                </div>
                <div className="">
                    <TriangleAlert className="text-blue-500" />
                </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
                <div className="flex flex-col gap-4">
                    <h2 className="">Applications</h2>
                    <p className="">27</p>
                </div>
                <div className="">
                    <FolderUp className="text-blue-500" />
                </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
                <div className="flex flex-col gap-4">
                    <h2 className="">Follow Up Again</h2>
                    <p className="">7</p>
                </div>
                <div className="">
                    <CalendarDays className="text-blue-500" />
                </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
                <div className="flex flex-col gap-4">
                    <h2 className="">Approved</h2>
                    <p className="">12</p>
                </div>
                <div className="">
                    <BadgeCheck className="text-green-500" />
                </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
                <div className="flex flex-col gap-4">
                    <h2 className="">Pending</h2>
                    <p className="">1</p>
                </div>
                <div className="">
                    <Clock className="text-blue-500" />
                </div>
            </div>
            <div className="flex bg-gray-200 gap-6 items-center p-2 px-4 rounded-md">
                <div className="flex flex-col gap-4">
                    <h2 className="">Deleted</h2>
                    <p className="">9</p>
                </div>
                <div className="">
                    <Trash className="text-red-500" />
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
          <p className="mb-2">You have {reminders.length} Call remainders today</p>
          <div className="flex flex-col md:flex-row md:flex-wrap w-full">
              {
                  reminders.map((reminder, index) => (
                      <CallReminder index={index} reminder={reminder} />
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
      <Table columns={columns} renderRow={renderRow} data={reportLogs} headerClassName={"h-12 bg-[#E5FBDE]"}/>
    </div>
  );
}