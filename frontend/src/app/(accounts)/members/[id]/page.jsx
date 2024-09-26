"use client"
import LoadingPage from '@/components/Loading';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import moment from "moment";
import { useMainProvider } from '@/providers/MainProvider';
import EditRoleModal from '@/components/modals/EditRoleModal';
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal';
import Performance from '@/components/Performance';
import Image from 'next/image';
import BarGraph from '@/components/BarGraph';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const SingleMemberPage = () => {
  const [member, setMember] = useState();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const {orgMode, currentUser, setCurrentUser} = useMainProvider();
  const router = useRouter();
  // console.log("Member: ", member?.createdAt)

  const {id} = useParams();

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
      fetchMemberDetails()
    }
  }, [id])

  const exportDataToExcel = (reports) => {
    const workbook = XLSX.utils.book_new();

    const mainReportData = [];
    const propertiesData = [];

    reports.forEach(report => {
      const mainData = {
        date: moment(report?.created_at).format('MMMM Do YYYY'),
        created_at: report?.created_at,
        updated_at: report?.updated_at,
        title: report?.title,
        description: report?.description,
        client_name: report?.client_name,
        client_id: report?.client_id,
        report_type: report?.report_type,
        status: report?.status,
        report_draft: report?.report_draft,
        report_final: report?.report_final
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
    saveAs(blob, `${member?.name}-reports.xls`);
  };

  const exportToExcel = async() => {
    setExcelLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reports/?staff_id=${id}`);
      const reports = response?.data?.results
      //console.log("Reports: ", reports)
      if (reports.length === 0) {
        toast.error("No reports found for this staff member");
        setExcelLoading(false);
        return;
      }
      if (response.status === 200){
        exportDataToExcel(reports);
      }
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
                    <Image src="/images/date.png" alt="" width={14} height={14} />
                    <span>A+</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/images/date.png" alt="" width={14} height={14} />
                    <span>Joined:{moment(member?.createdAt).format('MMMM Do YYYY')}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/images/mail.png" alt="" width={14} height={14} />
                    <span>{member?.email}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/images/phone.png" alt="" width={14} height={14} />
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
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/images/plus.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-xl font-semibold">90%</h1>
                  <span className="text-sm text-gray-400">Attendance</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/images/date.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-xl font-semibold">2</h1>
                  <span className="text-sm text-gray-400">Branches</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/images/plus.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-xl font-semibold">6</h1>
                  <span className="text-sm text-gray-400">Lessons</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/images/date.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-xl font-semibold">6</h1>
                  <span className="text-sm text-gray-400">Classes</span>
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
          <Button className="my-4" onClick={exportToExcel}>
            {
              excelLoading? "Exporting to Excel..." :
              `Export Reports Done by ${member?.firstName || member?.name} to Excel`
            }
          </Button>
          {/* BOTTOM */}
          <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
            <h1>{member?.name}&apos;s Performance</h1>
            <BarGraph />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <Performance />
        </div>
      </div>
    </div>
  )
}

export default SingleMemberPage