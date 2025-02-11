"use client"
import LoadingPage from '@/components/Loading';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { CalendarDays, Mail, PhoneCall, Users2, ScrollText} from "lucide-react";
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import moment from "moment";
import { useMainProvider } from '@/providers/MainProvider';
import EditRoleModal from '@/components/modals/EditRoleModal';
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal';
import PieChartGraph from '@/components/PieChartGraph';
import Image from 'next/image';
import BarGraph from '@/components/BarGraph';
import LineGraph from '@/components/LineGraph';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const SingleMemberPage = () => {
  const [member, setMember] = useState();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const {orgMode, currentUser, setCurrentUser} = useMainProvider();
  const [staffClients, setStaffClients] = useState([]);
  const [staffReports, setStaffReports] = useState([]);

  const router = useRouter();
  const {id} = useParams();

  const workedOnClients = new Set(staffReports?.map(report => report.client_id)).size
  const allClients =  new Set(staffClients?.map(client => client.id)).size


  const fetchStaffClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/clients/?staff_id=${id}`);
      const clients = response?.data?.results
      if (clients.length === 0) {
        toast.error("No clients found for this staff member");
        setExcelLoading(false);
        return;
      }
      setStaffClients(clients)
    } catch (error) {
      console.log("Error: ", error)
      toast.error("Error fetching staff clients")
      setLoading(false);
    }
  }
  const fetchStaffReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/reports/?staff_id=${id}`);
      const reports = response?.data?.results
      setStaffReports(reports);
    } catch (error) {
      console.log("Error: ", error.message)
    }
  }

  const fetchMemberDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/auth/users/${id}`);
      // console.log("response: ", response.data)
      setMember(response.data)
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error)
      toast.error("Error fetching member details")
      setLoading(false);
    }
  }

  useEffect(() => {
    if(id) {
      fetchMemberDetails();
      fetchStaffClients();
      fetchStaffReports();
    }
  }, [id])

  const exportDataToExcel = (reports) => {
    const workbook = XLSX.utils.book_new();

    const mainReportData = [];
    const propertiesData = [];

    const truncateText = (text, maxLength = 32767) => text?.substring(0, maxLength) || "";
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
        follow_up_notes: report?.follow_up_notes,
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
          description: property?.description,
          bathrooms: property?.bathrooms,
          phone_number: property?.phone_number,
          amenities: property?.amenities?.join(', ') || "",
          images: truncateText(property?.images?.join(', ') || ""),
          comments: property?.comments,
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
      { wch: 50 }, //follow_up_notes
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
      { wch: 50 }, // additional resources
    ];

    XLSX.utils.book_append_sheet(workbook, mainSheet, 'Summary Reports');
    XLSX.utils.book_append_sheet(workbook, propertiesSheet, 'Properties Details Report');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });
    saveAs(blob, `${member?.name}-reports-as-at-${moment(new Date()).format('hh-mm, MMMM DD, YYYY')}.xlsx`);
  };

  const exportToExcel = async() => {
    setExcelLoading(true);
    try {
      if (staffReports.length === 0) {
        toast.error("No reports found for this staff member");
        setExcelLoading(false);
        return;
      }
      exportDataToExcel(staffReports);
    } catch (error) {
      console.log("Error: ", error)
      toast.error("Error fetching member reports")
    }
    setExcelLoading(false);
  }

  const removeFromOrganization = async() => {
    const body={ownerId: currentUser?._id, staffId: member?._id}
    try {
      setRemoveLoading(true);
      //console.log("Body: ", body)
      const response = await axios.post(`/api/remove-staff`, body);
      // console.log("Response: ", response)
      if (response.status === 200){
        toast.success("Member removed from organization successfully!")
        // remove this member form currentUser members
        const newMembers = currentUser?.members?.filter(m => m?._id !== member?._id)
        setCurrentUser({...currentUser, members: newMembers})
        router.push('/members')
      }
      setRemoveLoading(false);
    } catch (error) {
      toast.error("Error removing member from organization. Try again!")
      setRemoveLoading(false);
    }
  }
  const editRole = async() => {
    setModalOpen(true);
  }
  const handleClose = () => {
    setModalOpen(false);
  }
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  }
  const averageDraftLength = parseInt( staffReports?.reduce((total, report) => {
      return total + (report.report_draft?.length || 0); // Add the length or 0 if undefined
    }, 0) / (staffReports?.length || 1)
  );
  
  
  if (loading) {
    return (
      <LoadingPage />
    )
  }
  return (
    <div className="">
      <EditRoleModal isOpen={modalOpen} onClose={handleClose} member={member} />
      <ConfirmDeleteModal isOpen={deleteModalOpen} onClose={closeDeleteModal} deleteAction={removeFromOrganization} title={member?.name} />
      
      <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3">
          {/* TOP */}
          <div className="flex flex-col lg:flex-row gap-4  shadow-lg ">
            {/* USER INFO CARD */}
            <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
              <div className="w-1/3">
                <Image
                  src={member?.image || "/images/noAvatar.png"}
                  alt=""
                  width={144}
                  height={144}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-semibold">Name: {member?.name}</h1>
                </div>
                <p className="text-sm text-gray-500">
                  {member?.bio || "No User Bio"}
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <CalendarDays/>
                    <span>Joined:{moment(member?.createdAt).format('MMMM Do YYYY')}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Mail/>
                    <span>{member?.email}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <PhoneCall />
                    <span>{member?.phoneNumber}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-lime-600"></div>
                    <span>{member?.status || 'Active'}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <p className="">Role:</p>
                    <span>{member?.role || 'No Role'}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* SMALL CARDS */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              {/* CARD */}
              <div className="p-2 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <ScrollText />
                <div className="">
                  <h1 className="text-xl font-semibold">{staffReports.length}</h1>
                  <span className="text-xs text-gray-400">Reports Done</span>
                </div>
              </div>
              {/* CARD */}
              <div className="p-2 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Users2/>
                <div className="">
                  <h1 className="text-xl font-semibold">{staffClients.length}</h1>
                  <span className="text-xs text-gray-400">Allocated clients</span>
                </div>
              </div>
              {/* CARD */}
              <div className="p-2 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Users2/>
                <div className="">
                  <h1 className="text-xl font-semibold">{workedOnClients}</h1>
                  <span className="text-xs text-gray-400">Worked On clients</span>
                </div>
              </div>
              <div className="p-2 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Users2/>
                <div className="">
                  <h1 className="text-xl font-semibold">{allClients - workedOnClients}</h1>
                  <span className="text-xs text-gray-400">Pending Clients</span>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4">
            {
              !orgMode && (
                <div className="mt-4 flex flex-col md:flex-row gap-4 mx-2">
                  <Button onClick={editRole}>
                    Edit Role
                  </Button>
                  <Button onClick={() => (setDeleteModalOpen(true))} className="">
                    {
                      removeLoading? "Removing..." : "Remove from Organization"
                    }
                  </Button>
                </div>
              )
            }
        </div>
          
          {/* BOTTOM */}
          <div className="mt-4 rounded-md">
            <h1 className='font-semibold text-xl'>{member?.name}&apos;s Performance</h1>
            <BarGraph staffReports={staffReports}/>
            <LineGraph staffReports={staffReports}/>
            <Button className="" onClick={exportToExcel}>
            {
              excelLoading? "Exporting to Excel..." :
              `Export Reports Done by ${member?.firstName || member?.name} to Excel`
            }
          </Button>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <PieChartGraph averageDraftLength={averageDraftLength} />
        </div>
      </div>
    </div>
  )
}

export default SingleMemberPage