"use client"

import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import { Eye } from 'lucide-react';
import moment from "moment/moment";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

export default function MembersPage({params, searchParams}) {
  
  const {currentUser, setTempProperty} = useMainProvider();
  const [report, setReport] = useState(null);
  const [properties, setProperties] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const {id} = useParams();
  const divRef = useRef();
  const router = useRouter();

  const handlePrint = () => {
    const printContent = divRef.current;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Refresh the page to restore original content
  };
  
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    // console.log("Exporting to excel: ", report)
    // Main report data
    const mainData = [
      {
        pkid: report?.pkid,
        id: report?.id,
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
      }
    ];
    const mainSheet = XLSX.utils.json_to_sheet(mainData);
    XLSX.utils.book_append_sheet(workbook, mainSheet, 'Main Report');

    // Properties data
    const propertiesData = report.properties.map(property => ({
      title: property.title,
      street_address: property.street_address,
      price: property.price,
      description: property.description,
      bathrooms: property.bathrooms,
      phone_number: property.phone_number,
      amenities: property.amenities.join(', '),
      images: property.images.join(', '),
      comments: property.comments
    }));
    const propertiesSheet = XLSX.utils.json_to_sheet(propertiesData);
    XLSX.utils.book_append_sheet(workbook, propertiesSheet, 'Properties');

    // Generate the Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: 'xls', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });
    saveAs(blob, `${report?.client_name}-${report?.created_at}-report.xls`);
  };


  const fetchReport = async() => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/reports/${id}`);
      const data = response.data
      // console.log("Report Data: ", data.properties.length)
      setReport(data);
      if (data?.properties.length > 0){
        setUserProperties(data.properties)
      }
      setLoading(false);
    } catch (error) {
      toast.error("Fetching report failed. Try Again!")
      setLoading(false);
    }
  }
  const viewProperty = (property) => {
    setTempProperty(property);
    window.open(`/properties`, '_blank');
  }

  useEffect(() => {
    fetchReport();
  }, [])

  const handleExit = () => {
    router.push(`/services`);
  }

  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <div ref={divRef} className="">
      
      <AnimatedText text={`Report for ${report?.client_name}-${moment(report?.created_at).format('MMMM Do YYYY')}`} />
        <div className="p-4 md:p-8">
            <div className='flex flex-row gap-2'>
              <p className='flex flex-row gap-4'><p className="font-semibold">Report Title:</p> {report?.title}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <p className='flex flex-row gap-4'><p className="font-semibold">Report Type:</p> {report?.report_type}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <p className='flex flex-row gap-4'><p className="font-semibold">Report Description:</p> {report?.description}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <p className=''><p className="font-semibold">Report Last Update:</p> {report?.report_draft}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <p className=''><p className="font-semibold">Report Final:</p> {report?.report_final}</p>
            </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="p-2">
                        #
                      </th>
                      <th scope="col" className="px-2 py-1">
                        Property Details
                      </th>
                      <th scope="col" className="px-2 py-1">
                          Price
                      </th>
                      <th scope="col" className="px-2 py-1">
                          Phone Number
                      </th>
                      <th scope="col" className="px-2 py-1">
                          Description
                      </th>
                      <th scope="col" className="px-2 py-1">
                          Comments
                      </th>
                      <th scope="col" className="px-2 py-1">
                          Action
                      </th>
                  </tr>
              </thead>
              {
                !loading && !userProperties.length &&
                <tbody>
                  <tr className="mt-2 md:mt-4">
                      <td colSpan={7} className="text-center mt-2 md:mt-4">No Properties Found</td>
                    </tr>
                </tbody>
              }
              <tbody>
                  {
                    userProperties?.map((property, index) => (
                        <tr key={property.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-2">
                                {index+1}.
                            </td>
                            <th scope="row" className="flex items-center py-1 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-20 h-20 rounded-md" src={property?.images[0]} alt="Property Image" />
                                <div className="ps-3">
                                  <div className="text-base text-wrap ">{property.title}</div>
                                  <div className="text-base font-semibold text-wrap">Address: {property.street_address}</div>
                                  <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                                    <p className="font-bold mr-2">Amenities:</p> {property.amenities.map((a, index) => <p className="ml-1" key={index}>{a +", "}</p>)}
                                  </div>
                                  <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                                    <p className="font-bold mr-2">Bathrooms:</p>{property.bathrooms}  
                                  </div>
                                </div>  
                            </th>
                            <td className="px-2 py-1">
                              {property.price}
                            </td>
                            <td className="px-2 py-1">
                                <div className="flex items-center w-28">
                                    {property.phone_number}
                                </div>
                            </td>
                            <td className="px-2 py-1">
                                <p className="">{property.description}</p>
                            </td>
                            <td className="px-2 py-1">
                                <p className="">{property.comments}</p>
                            </td>
                            <td className="px-2 py-1  self-center justify-center flex-col gap-2">
                              <Button onClick={() => viewProperty(property)}>
                                <Eye className="h-5 w-5 mr-2" />
                                View Property
                              </Button>
                            </td>
                        </tr>
                      ))
                  }
              </tbody>
          </table>
        </div>
        
        <div className='flex p-4 flex-col gap-4'>
          <div className='flex gap-2'>
            <Button onClick={handlePrint}  className="">Export PDF</Button>
            {/* <Button onClick={handlePrint} className="">Share</Button> */}
            <Button onClick={exportToExcel} className="">Export Excel</Button>
            <Button onClick={handleExit} className="">Exit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}