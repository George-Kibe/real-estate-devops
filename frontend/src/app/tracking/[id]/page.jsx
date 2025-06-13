"use client"

import { useMainProvider } from "@/providers/MainProvider";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
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

export default function TrackingPage({searchParams}) {
  const search = searchParams?.search;
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [showReminderModal , setshowReminderModal ] = useState(false);
  const [clients, setClients] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [members, setMembers] = useState([]);
  const [reports, setReports] = useState([]);
  const [logId, setlogId] = useState('');
  const [currentStaff, setCurrentStaff] = useState(null);
  const {orgMode, currentUser, currentClient, setCurrentClient} = useMainProvider();
  const router = useRouter();
  
  const getMembers = async() => {
    try {
      const response = await axios.get(`/api/members/?owner_id=${currentUser?._id}`);
      // console.log("Members Fetched : ", response.data)
      setMembers(response.data);
    } catch (error) {
      toast.error("Fetching Members failed. Try Again!")
    }
  }

  const fetchClients = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/clients/?owner_id=${currentUser?._id}`);
      const data = response.data
      setClients(data.results);
    } catch (error) {
      toast.error("Fetching Clients failed. Try Again!")
    }
  }

  useEffect(() => {
    fetchClients()
  }, [loading]);

  useEffect(() => {
    getMembers()
  }, [])

  const fetchAllReports = async( ) => {
    setInitLoading(true)
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/logs/?owner_id=${currentUser?._id}`);
      setAllReports(response.data.results);
      setReports(response.data.results);
    } catch (error) {
      toast.error("Fetching Reports failed. Try Again!")
    } finally {
      setInitLoading(false)
    }
  }
  useEffect(() => {
    fetchAllReports();
  }, [loading])
  
  const renderRow = (log) => (
    <tr
      key={log.id}
      className="border border-gray-200 text-sm h-10"
    >
      <td className="md:table-cell font-semibold ">{log.serialNumber}</td>
      <td className="md:table-cell text-xs">{log.date}/ {log.time}</td>
      <td className="md:table-cell">{log.staffName}</td>
      <td className="hidden md:table-cell">{log.nameAndAddress}</td>
      <td className="md:table-cell">{log.phone}</td>
      <td className="md:table-cell">{log.actionPerformed}</td>
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

  useEffect(() => {
    if (currentClient) {
      const filteredReports = allReports.filter(log => log.client_id === currentClient.id);
      setReports(filteredReports);
    } else {
      setReports(allReports);
    }
  }, [currentClient, allReports]);

  useEffect(() => {
    if (currentStaff) {
      const filteredReports = allReports.filter(log => log.staff_id === currentStaff._id);
      setReports(filteredReports);
    } else {
      setReports(allReports);
    }
  }, [currentStaff, allReports]);

  // console.log("search: ", search)
  // Filter logs based on search query
  useEffect(() => {
    if (search) {
      const filteredReports = allReports.filter(log => {
        const searchQuery = search.toLowerCase();
        return (
          log?.title?.toLowerCase().includes(searchQuery) ||
          log?.client_name?.toLowerCase().includes(searchQuery) ||
          log?.staff_name?.toLowerCase().includes(searchQuery)
        );
      });
      setReports(filteredReports);
    } else {
      setReports(allReports);
    }
  }, [search, allReports]);
  
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
        onClose={() => setShowAddLogModal(false)}
      />

      <AddReminderModal
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
            <h2 className="font-bold text-xl">John Doe</h2>
            <p className="">johndoe@gmail.com</p>
        </div>
      </div>
      <div className="bg-gray-100 m-2 p-2">
        <h2 className="font-bold text-xl mb-2 md:mb-4">Apartment Status</h2>
        <div className="flex flex-col md:flex-row md:gap-4">
            <div className="flex gap-4">
                <p className="">Number of Follow Ups:</p>
                <p className="font-semibold">32</p>
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
          <p className="mb-2">You have 3 Call remainders today</p>
          <div className="flex flex-col md:flex-row md:gap-4 w-full">
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
      <Table columns={columns} renderRow={renderRow} data={logs} headerClassName={"h-12 bg-[#E5FBDE]"}/>
    </div>
  );
}