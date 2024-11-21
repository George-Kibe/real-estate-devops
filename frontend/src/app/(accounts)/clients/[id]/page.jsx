"use client"
import LoadingPage from '@/components/Loading';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Loader, Mail, Phone} from "lucide-react"
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import moment from "moment";
import AddClientModal from '@/components/modals/AddClientModal';
import { generateReportBilling } from '@/utils/functions';
import { useMainProvider } from '@/providers/MainProvider';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const SingleClientPage = () => {
  const {currentUser } = useMainProvider();
  const {id} = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [client, setClient] = useState();
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const router = useRouter();

  const fetchClientDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/clients/${id}`);
      setClient(response.data);
      // console.log(response.data);
      const reportsResponse = await axios.get(`${BACKEND_URL}/api/reports/?client_id=${response.data?.id}`);
      // console.log(reportsResponse.data.results);
      setReports(reportsResponse?.data?.results);
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
  
  const viewReport = (id) => {
    router.push(`/reports/${id}`)
  }

  const exportDataToExcel = () => {
    if (reports.length === 0){
      toast.error("No reports found for this client.");
      return;
    }
    
    const workbook = XLSX.utils.book_new();

    const mainReportData = [];
    const propertiesData = [];

    const truncateText = (text, maxLength = 32767) => text?.substring(0, maxLength) || "";
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
        report_final: report?.report_final,
        follow_up_notes: report?.follow_up_notes,
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

  const editClient = async(client) => {
    setClient(client)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const generateBilling = async(report) => {
    if (!report?.start_time || !report?.end_time){
      toast.error("Start time and end time are required to generate billing!")
      return;
    }
    setLoading(true)
    try {
      const owner_org_id = currentUser._id;
      const billingResponse = await generateReportBilling(report, owner_org_id);
      console.log("Billing Response: ", billingResponse);
      if (billingResponse) {
        toast.success("Billing Generated Successfully!")
        fetchClientDetails();
      }else{
        toast.error("Billing Generation Failed!")
      }
      setLoading(false)
    } catch (error) {
      toast.error("Billing Generation Failed!")
      setLoading(false)
    }
  }
  
  // if (loading) {
  //   return (
  //     <LoadingPage />
  //   )
  // }
  return (
    <div className="">
      <div className="w-full p-4 md:p-8 flex-col md:flex-row flex-1 flex items-center overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/* <img className="rounded-full object-center object-contain h-24 md:h-48" src={client?.image} alt="user avatar" /> */}
        {
          loading && <Loader className="animate-spin h-32 w-32" /> 
        }
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

      <div className="">
      {
        !reports?.length && <p className="">You do not have any reports for this client yet!</p>
        }
        <div className="w-full overflow-hidden rounded-lg border shadow-md m-5">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="">
              <tr>
                <th scope="col" className="px-2 py-1 font-medium">#</th>
                <th scope="col" className="px-2 py-1 font-medium">Report Title</th>
                <th scope="col" className="px-2 py-1 font-medium">Is Billed</th>
                <th scope="col" className="px-2 py-1 font-medium">Report Date</th>
                <th scope="col" className="px-2 py-1 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y ">
              {
                reports?.map((report, index) => (
                  <tr className="w-full flex-1" key={index}>
                    <td className="">{index+1}.</td>
                    <td className="">{report?.title}</td>
                    <td className="">{report?.isBilled? "Yes": "No"}</td>
                    <td className="px-2 py-1">
                      {moment(report?.created_at).format('MM/DD/YYYY')}
                    </td>
                    <td className="px-2 py-1 gap-2">
                      <Button onClick={()=>viewReport(report?.pkid)}>Edit Report</Button>
                      {
                        !report?.isBilled && (
                          <Button className='bg-lime-600 ml-2' onClick={()=>generateBilling(report)}>
                            {loading? <p className='flex gap-2'><Loader className='animate-spin' />Adding...</p>: "Add Billing"}
                          </Button>
                        )
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <Button className="m-4" onClick={exportDataToExcel}>
        Export {client?.client_name || client?.name}'s Reports to Excel
      </Button>
    </div>
  )
}

export default SingleClientPage