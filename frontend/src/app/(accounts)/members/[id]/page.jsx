"use client"
import LoadingPage from '@/components/Loading';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Mail} from "lucide-react"
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import moment from "moment";
import { useMainProvider } from '@/providers/MainProvider';
import EditRoleModal from '@/components/modals/EditRoleModal';
import { set } from 'mongoose';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const SingleMemberPage = () => {
  const [member, setMember] = useState();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);
  const {orgMode} = useMainProvider();

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

  const removeFromOrganization = () => {
    console.log("Remove from organization")
  }
  const editRole = async() => {
    setModalOpen(true);
  }
  const handleClose = () => {
    setModalOpen(false);
  }
  
  if (loading) {
    return (
      <LoadingPage />
    )
  }
  return (
    <div className="">
      <div className="w-full p-4 md:p-8 flex-col md:flex-row flex-1 flex items-center overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img className="rounded-full object-center object-contain h-24 md:h-48" src={member?.image} alt="user avatar" />

        <EditRoleModal isOpen={modalOpen} onClose={handleClose} member={member} />

        <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">First Name: {member?.firstName || member?.name}</h1>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Last Name: {member?.lastName}</h1>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <Mail />
                <h1 className="px-2 text-sm">{member?.email}</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <p className="">Role: </p>
                <h1 className="px-2 text-sm">{member?.role}</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <p className="">Status: </p>
                <h1 className="px-2 text-sm">{member?.status || 'Active'}</h1>
            </div>
            {
              orgMode && (
                <div className="mt-4 flex flex-col md:flex-row gap-4 mx-2">
                  <Button onClick={editRole}>
                    Edit Role
                  </Button>
                  <Button onClick={removeFromOrganization} className="">
                    Remove from Organization
                  </Button>
                </div>
              )
            }
        </div>
      </div>
      <Button className="m-4" onClick={exportToExcel}>
        {
          excelLoading? "Exporting to Excel..." :
          `Export Reports Done by ${member?.firstName || member?.name} to Excel`
        }
      </Button>
    </div>
  )
}

export default SingleMemberPage