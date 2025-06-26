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
import { Loader } from "lucide-react";
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
    header: "Date",
    accessor: "date",
  },
  {
    header: "Title",
    accessor: "title",
    className: "md:table-cell",
  },
  {
    header: "Client Name",
    accessor: "clientName",
    className: "md:table-cell",
  },
  {
    header: "Staff Name",
    accessor: "staffName",
    className: "md:table-cell",
  },
  {
    header: "Report Type",
    accessor: "reporttype",
    className: "hidden lg:table-cell",
  },
  {
    header: "Location",
    accessor: "location",
    className: "hidden md:table-cell",
  },
  {
    header: "Properties",
    accessor: "rProperties",
    className: "hidden md:table-cell",
  },
  {
    header: "Time",
    accessor: "time",
    className: "hidden md:table-cell",
  },
  {
    header: "Action",
    accessor: "action",
    className: "md:table-cell",
  },
];

export default function ReportsPage({searchParams}) {
  const search = searchParams?.search;
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportsLoading, setReportsLoading] = useState(false);
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
  const handleDelete = (id) => {
    setreportId(id);
    setShowDeleteModal(true);
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

  const truncateText = (text, maxLength = 32767) => text?.substring(0, maxLength) || "";
  
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
        description: truncateText(report?.description),
        client_name: report?.client_name,
        client_id: report?.client_id,
        report_type: report?.report_type,
        status: report?.status,
        report_draft: truncateText(report?.report_draft),
        report_final: truncateText(report?.report_final),
        follow_up_notes: truncateText(report?.follow_up_notes),
        updated_at: moment(report?.updated_at).format('MMMM Do YYYY'),
        additional_resources: report.additional_resources
        ?.map((resource, index) => `${index + 1}. name: ${resource.name}, url: ${resource.url}`)
        .join(' ') || "",
      };
      mainReportData.push(mainData);

      report.properties.forEach(property => {
        const propertyData = {
          date: moment(report?.created_at).format('MMMM Do YYYY'),
          property_title: property?.title,
          street_address: property?.street_address,
          price: property?.price,
          description: truncateText(property?.description),
          bathrooms: property?.bathrooms,
          phone_number: property?.phone_number,
          amenities: truncateText(property?.amenities?.join(', ') || ""),
          images: truncateText(property?.images?.join(', ') || ""),
          comments: truncateText(property?.comments),
          isFavorite: property.isFavorite? "Yes": "No",
          additional_resources: Array.isArray(property?.additionalResources)
            ? property.additionalResources
              .map((resource, index) => `${index + 1}. name: ${resource.name}, url: ${resource.url}`)
              .join(' ')
            : "",
        };
        propertiesData.push(propertyData);
      });
    });

    const mainSheet = XLSX.utils.json_to_sheet(mainReportData);
    const propertiesSheet = XLSX.utils.json_to_sheet(propertiesData);
    mainSheet['!cols'] = [
      { wch: 15 }, // created_at
      { wch: 20 }, // title
      { wch: 20 }, // description (allow larger width)
      { wch: 20 }, // client_name
      { wch: 10 }, // client_id
      { wch: 10 }, // report_type
      { wch: 10 }, // status
      { wch: 50 }, // report_draft (allow larger width)
      { wch: 50 },  // report_final (allow larger width)
      { wch: 50 }, // follow_up_notes
      { wch: 15 }, // updated_at
      { wch: 50 }, // additional resources

    ];
    propertiesSheet['!cols'] = [
      { wch: 15 }, // date
      { wch: 20 }, // title
      { wch: 20 }, // address      
      { wch: 10 }, // price
      { wch: 20 }, // description (allow larger width)
      { wch: 10 }, // bathrooms
      { wch: 15 }, // phone number
      { wch: 20 }, // amenities
      { wch: 20 }, // images
      { wch: 40 }, // comments
      { wch: 10 }, // isFavorite
      { wch: 40 }, // additional resources
    ];

    XLSX.utils.book_append_sheet(workbook, mainSheet, 'Summary Reports');
    XLSX.utils.book_append_sheet(workbook, propertiesSheet, 'Properties Details Report');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });
    saveAs(blob, `${name}-reports.xlsx`);
  };
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
  

  const exportAllClientsReportsToExcel = async( ) => {
    try {
      setReportsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/drf-api/reports/?owner_id=${currentUser?._id}`);
      const data = response.data
      const refinedReports = data.results.filter(report => report.properties.length > 0)
      const reportName = `All-reports-for-${currentUser?.name}-as-at-${moment(new Date()).format('hh-mm A, dddd, MMMM DD, YYYY')}`
      exportToExcel(refinedReports, reportName);
      setReportsLoading(false);
    } catch (error) {
      toast.error("Fetching Reports failed. Try Again!")
      console.log("Error: ", error.message)
      setReportsLoading(false);
    }
  }
  const generateBilling = async(report) => {
    if (!report?.start_time || !report?.end_time){
      toast.error("Start time and end time are required to Generate Billing!")
      return;
    }
    setLoading(true)
    try {
      // get the client
      const owner_org_id = currentUser._id;
      const response = await axios.get(`${BACKEND_URL}/drf-api/clients?client_id=${report.client_id}`)
      if (response.data.results.length > 0) {
        const client = response.data.results[0];
        const billingResponse = await generateReportBilling(report, client, owner_org_id);
        console.log("Billing Response: ", billingResponse);
        if (billingResponse) {
          toast.success("Billing Generated Successfully!")
        }else{
          toast.error("Billing Generation Failed!")
        }
      } else {
        toast.error("Billing Generation failed")
      }
    } catch (error) {
      console.log("Error: ", error.message);
      toast.error("Billing Generation failed. Try Again!")
    } finally {
      setLoading(false)
    }
  }

  const renderRow = (report) => (
    <tr
      key={report.id}
      className="border border-gray-200 text-sm"
    >
      <td className="md:table-cell font-semibold">{moment(report.report_date).format('MMMM DD YYYY')}</td>
      <td className="md:table-cell text-xs">{report.title.substring(0, 50)}</td>
      <td className="md:table-cell">{report.client_name}</td>
      <td className="hidden md:table-cell">{report.staff_name}</td>
      <td className="md:table-cell">{report.report_type}</td>
      <td className="md:table-cell">{report.report_location}</td>
      <td className="hidden md:table-cell">{report.properties.length}</td>
      <td className="hidden md:table-cell">
        <p className="">
        {moment(report.start_time, "HH:mm:ss").isValid()
          ? moment(report.start_time, "HH:mm:ss").format("hh:mm A")
          : ""} 
        - 
        {moment(report.end_time, "HH:mm:ss").isValid()
          ? moment(report.end_time, "HH:mm:ss").format("hh:mm A")
          : ""}
        </p>
      </td>
      <td>
        <SingleClientReportActions 
          viewReport={()=>viewReport(report?.pkid)} 
          handleDelete={()=>handleDelete(report?.pkid)}
          showGenerateBilling={!report.isBilled}
          generateBilling = {() => generateBilling(report)}
        />
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
      <AnimatedText text={"All Reports"} />
      {
        (loading || initLoading) && (
          <div className="flex flex-row gap-2 tex-2xl justify-center items-center">
            <Loader className="animate-spin w-24 h-24" />
            Loading ...
          </div>
        )
      }
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
      {
        !orgMode && (
          <div className="flex w-full">
            <Button onClick={exportAllClientsReportsToExcel} className="ml-auto">
              {
                reportsLoading? <Loader className="animate-spin mr-2" />
                : "Export All Clients Reports to Excel"
              }
            </Button>
          </div>
        )
      }
      <ConfirmDeleteModal 
        deleteAction={deleteReport} 
        title={"Report"}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
      <Table columns={columns} renderRow={renderRow} data={reports} />
    </div>
  );
}