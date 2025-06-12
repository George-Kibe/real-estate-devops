"use client"

import { useMainProvider } from "@/providers/MainProvider";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { Loader, Pencil, Trash2 } from "lucide-react";
import { SingleClientReportActions } from "@/components/SingleClientReportActions";
import Table from "@/components/Table";
import AnimatedText from "@/components/AnimatedText";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import TableSearch from "@/components/TableSearch";
import { generateReportBilling } from "@/utils/functions";


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

const columns = [
  {
    header: "Client Name",
    accessor: "clientName",
  },
  {
    header: "Email",
    accessor: "email",
    className: "md:table-cell",
  },
  {
    header: "Contact Number",
    accessor: "contactNumber",
    className: "md:table-cell",
  },
  {
    header: "AgentResponsible",
    accessor: "agentResponsible",
    className: "md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Last Follow Up",
    accessor: "lastFollowUp",
    className: "hidden md:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden md:table-cell",
  },
  {
    header: "Action",
    accessor: "action",
    className: "md:table-cell",
  },
];

export default function TrackingPage({searchParams}) {
  const search = searchParams?.search;
  const [loading, setLoading] = useState(false);
  const [activeName, setActiveName] = useState("All")
  const [initLoading, setInitLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [members, setMembers] = useState([]);
  const [reports, setReports] = useState([]);
  const [reportId, setreportId] = useState('');
  const [currentStaff, setCurrentStaff] = useState(null);
  console.log("BACKEND API URL:", process.env.NEXT_PUBLIC_BACKEND_API_URL);
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

  const deleteReport = async() => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/drf-api/reports/${reportId}/`);
      const data = response.data
      toast.success("Report Deleted Successfully!")
      router.push(`/reports`)
      setLoading(false);
    } catch (error) {
      toast.error("Report Delete failed. Try Again!")
      setLoading(false);
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

  const viewReport = (id) => {
    router.push(`/reports/preview/${id}`)
  }
  
  const fetchAllReports = async( ) => {
    setInitLoading(true)
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/reports/?owner_id=${currentUser?._id}`);
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
  
  const renderRow = (report) => (
    <tr
      key={report.id}
      className="border border-gray-200 text-sm h-10"
    >
      <td className="md:table-cell font-semibold ">{report.client_name}</td>
      <td className="md:table-cell text-xs">{report.client_email}</td>
      <td className="md:table-cell">{report.client_phone_number}</td>
      <td className="hidden md:table-cell">{report.staff_name}</td>
      <td className="md:table-cell">{report.client_address}</td>
      <td className="md:table-cell">{moment(report.updated_at).format("MM/DD/YYYY")}</td>
      <td className="hidden md:table-cell">{
        report.status === "completed" ? (
          <span className="text-green-500">Completed</span>
        ) : report.status === "pending" ? (
          <span className="text-yellow-500">Pending</span>
        ) : (
          <span className="text-red-500">Cancelled</span>
        )}</td>
      <td className="">
        <button className="cursor-pointer" onClick={() =>{}}>
          <Pencil className="h-4 w-4 text-green-600 font-bold"/>
        </button>
        <button className="cursor-pointer ml-4" onClick={() =>{}}>
          <Trash2 className="h-4 w-4 text-red-600 font-bold"/>
        </button>
      </td>
    </tr>
  );

  useEffect(() => {
    if (currentClient) {
      const filteredReports = allReports.filter(report => report.client_id === currentClient.id);
      setReports(filteredReports);
    } else {
      setReports(allReports);
    }
  }, [currentClient, allReports]);

  useEffect(() => {
    if (currentStaff) {
      const filteredReports = allReports.filter(report => report.staff_id === currentStaff._id);
      setReports(filteredReports);
    } else {
      setReports(allReports);
    }
  }, [currentStaff, allReports]);

  // console.log("search: ", search)
  // Filter reports based on search query
  useEffect(() => {
    if (search) {
      const filteredReports = allReports.filter(report => {
        const searchQuery = search.toLowerCase();
        return (
          report?.title?.toLowerCase().includes(searchQuery) ||
          report?.client_name?.toLowerCase().includes(searchQuery) ||
          report?.staff_name?.toLowerCase().includes(searchQuery)
        );
      });
      setReports(filteredReports);
    } else {
      setReports(allReports);
    }
  }, [search, allReports]);
  
  
  
  return (
    <div className='flex flex-col justify-betweenm b-5 text-[#0B2B5F]'>
      <h2 className="font-bold text-xl md:text-4xl mb-2 md:mb-8">Follow Up Tracker</h2>
      <h2 className="font-semibold text-xl md:text-2xl mb-2 md:mb-4">
        View and manage follow up records for each client
      </h2>
      {
        (loading || initLoading) && (
          <div className="flex flex-row gap-2 tex-2xl justify-center items-center">
            <Loader className="animate-spin w-24 h-24" />
            Loading ...
          </div>
        )
      }
      <div className="flex flex-col text-xl md:flex-row gap-4 md:gap-8 font-semibold mb-4">
        <button 
          className={`flex gap-2 items-center ${activeName === "All" && 'text-green-400'}`}
          onClick={() => setActiveName("All")}
        >
          <p className="">All</p>
          <p className="text-xs">10</p>
        </button>
        <button 
          className={`flex gap-2 items-center ${activeName === "Completed" && 'text-green-500'}`}
          onClick={() => setActiveName("Completed")}
        >
          <p className="">Completed</p>
          <p className="text-xs">12</p>
        </button>
        <button 
          className={`flex gap-2 items-center ${activeName === "InProgress" && 'text-green-500'}`}
          onClick={() => setActiveName("InProgress")}
        >
          <p className="">In Progress</p>
          <p className="text-xs">6</p>
        </button>
        <button 
          className={`flex gap-2 items-center ${activeName === "Pending" && 'text-green-500'}`}
          onClick={() => setActiveName("Pending")}
        >
          <p className="">Pending</p>
          <p className="text-xs">8</p>
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="mb-2">
          <label className="block text-lg font-bold mb-2">
            Filter By Client
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
            id="bill_status"
            name="bill_status"
            value={currentClient?.id || ""}
            onChange={(e) => {
              const selectedClient = clients.find(client => client.id === e.target.value);
              setCurrentClient(selectedClient);
            }}
          >
            <option value="">-Select Client-</option>
            {
              clients?.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.client_name}
                </option>
              ))
            }
          </select>
        </div>
        {
          members.length > 0 && (
            <div className="mb-2">
              <label className="block text-lg font-bold mb-2">
                Filter By Staff 
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="bill_status"
                name="bill_status"
                value={currentStaff?._id || ""}
                onChange={(e) => {
                  const selectedStaff = members?.find(member => member._id === e.target.value);
                  setCurrentStaff(selectedStaff);
                }}
              >
                <option value="">-Select Staff-</option>
                {
                  members?.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name}
                    </option>
                  ))
                }
              </select>
            </div>
          )
        }
        <div className="flex flex-col gap-4 ">
          <label className="block text-md ">
            Search by Title, Client Name, or Staff Name 
          </label>
          <TableSearch />
        </div>
      </div>
      <ConfirmDeleteModal 
        deleteAction={deleteReport} 
        title={"Report"}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
      <Table columns={columns} renderRow={renderRow} data={reports} className={""}/>
    </div>
  );
}