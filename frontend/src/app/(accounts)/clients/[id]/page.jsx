"use client"
import LoadingPage from '@/components/Loading';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Mail, Phone} from "lucide-react"
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import moment from "moment";
import AddClientModal from '@/components/modals/AddClientModal';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const SingleClientPage = () => {
  const {id} = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [client, setClient] = useState();
  const [loading, setLoading] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);

  const fetchClientDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/clients/${id}`);
      const data = response.data
      //console.log("Clients Data: ", data)
      setClient(data);
      setLoading(false);
    } catch (error) {
      toast.error("Fetching Clients failed. Try Again!")
      setLoading(false);
    }
  }

  useEffect(() => {
    if(id && !modalOpen) {
      fetchClientDetails()
    }
  }, [id, modalOpen])

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
    saveAs(blob, `${client?.client_name}-reports.xls`);
  };

  const exportToExcel = async() => {
    setExcelLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reports/?client_id=${client?.id}`);
      //console.log(client.id)
      const reports = response?.data?.results
      //console.log("Reports: ", reports)
      if (reports.length === 0) {
        toast.error("No reports found for this client");
        setExcelLoading(false);
        return;
      }
      if (response.status === 200){
        exportDataToExcel(reports);
      }
    } catch (error) {
      console.log("Error: ", error)
      toast.error("Error fetching client reports")
    }
    setExcelLoading(false);
  }
  const editClient = async(client) => {
    setClient(client)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  
  if (loading) {
    return (
      <LoadingPage />
    )
  }
  return (
    <div className="">
      <div className="w-full p-4 md:p-8 flex-col md:flex-row flex-1 flex items-center overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/* <img className="rounded-full object-center object-contain h-24 md:h-48" src={client?.image} alt="user avatar" /> */}
        <AddClientModal client={client} isOpen={modalOpen} onClose={closeModal} 
      setLoading={setLoading} />

        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            First Name:     {client?.first_name || client?.client_name}
          </h1>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Last Name: {client?.last_name}
          </h1>
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <Mail />
            <h1 className="px-2 text-sm">{client?.email}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            {/* <p className="">Phone Number: </p> */}
            <Phone />
            <h1 className="px-2 text-sm">{client?.phone_number}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <p className="">Preferred city: </p>
            <h1 className="px-2 text-sm">{client?.city}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <p className="">Status: </p>
            <h1 className="px-2 text-sm">{client?.status || 'Active'}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <p className="">House Type: </p>
            <h1 className="px-2 text-sm">{client?.house_type || ''}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <p className="">Additional Information: </p>
            <h1 className="px-2 text-sm">{client?.additional_info}</h1>
          </div>

          <Button className="mt-4 px-4 md:px-8" onClick={() => editClient(client)}>
            Edit
          </Button>
        </div>
      </div>

      <Button className="m-4" onClick={exportToExcel}>
        {
          excelLoading? "Exporting to Excel..." :
          `Export ${client?.client_name || client?.name}'s Reports to Excel`
        }
      </Button>
    </div>
  )
}

export default SingleClientPage