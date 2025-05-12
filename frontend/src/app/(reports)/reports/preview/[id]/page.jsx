"use client"

import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import { LoaderCircle, Loader, Plus, Search, CloudDownload } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import { getTimeDifference } from "@/lib/getTimeDifference";
import ConfirmExportModal from "@/components/modals/ConfirmExportModal";
import { FaHeart } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import { GeneralSearchButton } from "@/components/TableSearch";
import { generalAIPrompt } from "@/utils/functions";
import Image from "next/image";
import SmartText from "@/components/SmartText";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default function MembersPage() {
  const {currentClient, setTempProperty} = useMainProvider();
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  
  const [report, setReport] = useState(null);
  const [searchText, setSearchText] = useState('');

  const [properties, setProperties] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
  // states for a single property
  const [comments, setComments] = useState('');

  // report states
  const [errors, setErrors] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [staffLocation, setStaffLocation] = useState('');
  const [visitType, setVisitType] = useState('');
  const [loading, setLoading] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [summary, setSummary] = useState();
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [summaryFinal, setSummaryFinal] = useState('');
  const [anyAnswer, setAnyAnswer] = useState('');
  const [questionMode, setQuestionMode] = useState(false);
  const [anyQLoading, setAnyQLoading] = useState(false);

  // console.log("User Properties: ", userProperties);
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
    const truncateText = (text, maxLength = 32767) => text?.substring(0, maxLength) || "";
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
        report_final: report?.report_final,
        follow_up_notes: report?.follow_up_notes,
        additional_resources: report.additional_resources
        ?.map((resource, index) => `${index + 1}. name: ${resource.name}, url: ${resource.url}`)
        .join(' ') || "",
      }
    ];
    const mainSheet = XLSX.utils.json_to_sheet(mainData);
     // Manually set larger column widths and enable wrap text for mainSheet
    mainSheet['!cols'] = [
      { wch: 10 }, // pkid
      { wch: 10 }, // id
      { wch: 15 }, // created_at
      { wch: 15 }, // updated_at
      { wch: 20 }, // title
      { wch: 20 }, // description (allow larger width)
      { wch: 20 }, // client_name
      { wch: 10 }, // client_id
      { wch: 15 }, // report_type
      { wch: 10 }, // status
      { wch: 50 }, // report_draft (allow larger width)
      { wch: 50 },  // report_final (allow larger width)
      { wch: 50 }, // follow up notes
      { wch: 50 }, // additional resources
    ];
    XLSX.utils.book_append_sheet(workbook, mainSheet, 'Main Report');

    // Properties data
    const propertiesData = report.properties.map(property => ({
      title: property.title,
      street_address: property.street_address,
      price: property.price,
      description: property.description,
      bathrooms: property.bathrooms,
      phone_number: property.phone_number,
      amenities: property.amenities?.join(', ') || "",
      images: truncateText(property.images?.join(', ') || ""),
      comments: property.comments,
      isFavorite: property.isFavorite? "Yes": "No",
      additional_resources: Array.isArray(property?.additionalResources)
        ? property.additionalResources
          .map((resource, index) => `${index + 1}. name: ${resource.name}, url: ${resource.url}`)
          .join(' ')
        : "",  
    }));
    const propertiesSheet = XLSX.utils.json_to_sheet(propertiesData);
     // Set column widths for the Properties sheet, especially for long text fields like comments
    propertiesSheet['!cols'] = [
      { wch: 10 }, // Title
      { wch: 10 }, // Street address
      { wch: 10 }, // Price
      { wch: 20 }, // Description
      { wch: 10 }, // Bathrooms
      { wch: 15 }, // Phone number
      { wch: 30 }, // Amenities
      { wch: 30 }, // Images
      { wch: 40 },  // Comments
      { wch: 10 },  // isFavorite
      { wch: 40 },  // additional resources 
    ];

    XLSX.utils.book_append_sheet(workbook, propertiesSheet, 'Properties');

    // Generate the Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });
    saveAs(blob, `${report?.client_name}-${moment(report?.created_at).format('MM-DD-YYYY')}-report.xlsx`);
  };


  const fetchReport = async() => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/reports/${id}`);
      const data = response.data
      // console.log("Report Data: ", data.properties.length)
      setReport(data); setSummaryFinal(data?.report_final); 
      setStartTime(data?.start_time); setEndTime(data?.end_time);
      setSummary(data?.report_draft)
      setStaffLocation(data?.report_location);
      setVisitType(data?.report_view_type);
      setFollowUpNotes(data?.follow_up_notes);
      if (data?.properties.length > 0){
        setUserProperties(data.properties)
      }
      setLoading(false);
    } catch (error) {
      toast.error("Fetching report failed. Try Again!")
      console.log("Error: ", error.message)
      setErrors([...errors, error.message])
      setLoading(false);
    }
  }
  const handleAiSearch = async() => {
    if (!searchText) {
      toast.error("Please enter a search phrase!");
      return;
    }
    setAnyQLoading(true)
    try {
      const result = await generalAIPrompt(searchText);
      // console.log("Search Result: ", results)
      setAnyAnswer(result)
      setSearchText('')
      setAnyQLoading(false)
    } catch (error) {
      toast.error("Some Error occured while searching. Try Again!")
      setAnyQLoading(false)
    }
  }

  useEffect(() => {
    fetchReport();
  }, [])

  const handleExit = () => {
    router.push(`/reports`);
  }

  const deleteReport = async() => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/drf-api/reports/${id}/`);
      const data = response.data
      toast.success("Report Deleted Successfully!")
      router.push(`/reports`)
      setLoading(false);
    } catch (error) {
      toast.error("Report Delete failed. Try Again!")
      setLoading(false);
    }
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
  }
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <div ref={divRef} className="">
      
      <AnimatedText text={`Report for ${report?.client_name}-${moment(
        report?.report_date ? report?.report_date : report?.created_at).format('MMMM Do YYYY')} `} />
      <ConfirmExportModal 
        exportAction={exportToExcel} 
        isOpen={exportModalOpen} 
        onClose={() => setExportModalOpen(false)} 
      />
      <ConfirmDeleteModal 
        deleteAction={deleteReport} 
        isOpen={deleteModalOpen} 
        onClose={closeDeleteModal} 
        title={report?.title}
      />

        <div className="px-2">
          {
            errors.length > 0 &&(
              <div className="p-2 flex flex-col items-center gap-2">
                <p className="text-red-500">Errors!!</p>
                {
                  errors.map((error, index) => (
                    <div className="flex flex-row">
                      <p key={index} className="text-red-500">
                        {index+1}. {error}
                      </p>
                    </div>
                  ))
                }
              </div>
            ) 
          }
          <div className="flex flex-col md:flex-row md:flex-wrap">
            <div className="flex gap-2 w-full md:w-1/3 my-2 ">
              <div className="flex flex-col gap-1 w-full">
                <p className="font-semibold">Report Title:</p>
                <div className=" border p-2 rounded-sm">
                  <p>{report?.title}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-1/3 my-2">
              <div className="flex flex-col gap-1 w-full">
                <p className="font-semibold">Report Title:</p>
                <div className="w-full border p-2 rounded-sm">
                  <p>{report?.report_type}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-1/3 my-2">
              <div className="flex flex-col gap-1 w-full">
                <p className="font-semibold">Location</p>
                <div className="relative w-full border rounded-sm">
                  <p className="p-2">{report?.report_location || staffLocation || "None"}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-1/3 my-2">
              <div className="flex flex-col gap-1 w-full">
                <p className="font-semibold">Report By:</p>
                <div className="w-full border p-2 rounded-sm">
                  <p>{report?.staff_name}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-1/3 my-2">
              <div className="flex flex-col gap-1 w-full">
                <p className="font-semibold">Visit Date:</p>
                <div className="w-full border p-2 rounded-sm">
                  <p>{moment(report?.report_date ? report?.report_date : report?.created_at).format('MMMM DD YYYY')}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-1/3 my-2">
              <div className="flex flex-col gap-1 w-full">
                <p className="font-semibold">Report Visit Type:</p>
                <div className="relative w-full border p-2 rounded-sm">
                  <p className="">
                    {report?.report_view_type || visitType || "None"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-1/3 my-2">
              <div className="flex flex-col gap-1 w-full">
                <p className="font-semibold">{report?.start_time ? "Edit": "Set"} Start Time:</p>
                <div className="w-full border flex gap-4 p-2 rounded-sm">
                  <input 
                    type="time" 
                    id="startTimeInput"
                    value={startTime} 
                    onChange={e => setStartTime(e.target.value)} 
                  />
                  {/* <p className="">{startTime ||report?.start_time}</p> */}
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-1/3 my-2">
              <div className="flex flex-col gap-1 w-full">
                <p className="font-semibold">{report?.end_time ? "Edit": "Set"} End Time:</p>
                <div className="w-full border p-2 rounded-sm">
                  <input 
                    type="time" 
                    id="startTimeInput"
                    value={endTime} 
                    //className="opacity-0 absolute t-0 l-0"
                    onChange={e => setEndTime(e.target.value)} 
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-1/3 my-2">
              <div className="flex flex-col gap-1 w-full">
                <p className="font-semibold">Time Spent:</p>
                <div className="w-full border p-2 rounded-sm">
                  <p>
                    {getTimeDifference(report?.start_time , report?.end_time)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-row gap-2 my-4 md:my-8'>
            <p className='flex flex-row gap-4'><p className="font-semibold">Report Description:</p> {report?.report_activities.join(" ")}</p>
          </div>
        </div>
      
        <div className="relative shadow-md sm:rounded-lg">
          <table className="w-full table-row text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-1 w-24">
                  No
                </th>
                <th scope="col" className="px-2 py-1">
                  Image
                </th>
                <th scope="col" className="px-2 py-1">
                    Name
                </th>
                <th scope="col" className="px-2 py-1">
                    Address
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
                  Resources
                </th>
                <th scope="col" className="px-2 py-1">
                  Comments
                </th>
                <th scope="col" className="px-2 py-1">
                  Tracking
                </th>
              </tr>
            </thead>
            {
              propertiesLoading && 
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center flex flex-row"><LoaderCircle className="animate-spin mr-2" />Loading Properties...</td>
                  </tr>
              </tbody>
            }
            {
              !propertiesLoading && !userProperties.length && !properties?.length &&
              <tbody>
                <tr className="mt-2 md:mt-4">
                    <td colSpan={7} className="text-center mt-2 md:mt-4">No Properties Found</td>
                  </tr>
              </tbody>
            }
            {/* user properties; These are properties Added to report */}
            <tbody>
              {
                userProperties?.map((property, index) => (
                  <tr key={property.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="">
                      {index+1}.
                    </td>
                    <td scope="row" className="flex gap-2 relative items-center py-2 text-gray-900 whitespace-nowrap dark:text-white">
                      {
                        property.isFavorite && <FaHeart className='h-6 w-6 absolute top-3 left-0 text-red-500 mr-2'  />
                      }
                      {property?.images?.[0] ? (
                        <Image width={60} height={40} src={property.images[0]} className="rounded-md object-fill" alt="image" />
                      ) : (
                        <p>No Image</p>
                      )}
                      {/* <div className="max-w-60">
                        <div className="text-base text-wrap ">Name: {property.title}</div>
                        <div className="text-sm font-semibold text-wrap">Address: {property.street_address || property.address}</div>
                        <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                          <p className="font-bold mr-2">Amenities:</p> {property?.amenities?.map((a, index) => <p className="ml-1" key={index}>{a +", "}</p>)}
                        </div>
                        <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                          <p className="font-bold mr-2">Bathrooms:</p>{property.bathrooms}  
                        </div>
                        <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                          <p className="font-bold mr-2">Website:</p>{property.website}  
                        </div>
                      </div>   */}
                    </td>
                    <td className="px-2 py-1">
                      {property.title}
                    </td>
                    <td className="px-2 py-1">
                      {property.property_address || property.street_address}
                    </td>
                    <td className="px-2 py-1">
                      {property.price}
                    </td>
                    <td className="px-2 py-1">
                        <div className="flex items-center w-28">
                            {property.phone_number}
                        </div>
                    </td>
                    <td className="px-2 py-1">
                      <SmartText text={property.description} />
                    </td>
                    <td className="px-2 py-1">
                      <div className="flex flex-col items-center gap-2">
                        {property.additionalResources?.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            <p className="flex flex-row gap-1">{resource.name} <CloudDownload className="h-6 w-6" /></p>
                          </a>
                        ))}
                      </div>
                    </td>
                    <td className="px-2 py-1">
                      <SmartText text={property.comments} />
                    </td>
                    <td className="px-2 py-1">
                      <p className="">Tracking</p>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        
        <div className='flex p-4 flex-col gap-4'>
          <form className='mt-7'>
            {
              summaryFinal && (
                <div className='flex flex-col  items-start'>
                  <label className="font-semibold mt-2">Final Summary</label>
                  <p className="text-sm mt-2 border border-gray p-2 mb-2 relative">
                    {summaryFinal}
                  </p>
                </div>
              )
            }
            {
              followUpNotes && (
                <div className='flex flex-col  items-start'>
                  <label className="font-semibold mt-2">Follow up Notes</label>
                  <p className="text-sm mt-2 border border-gray p-2 mb-2 relative">
                    {followUpNotes}
                  </p>
                </div>
              )
            }
          </form>
          <div>
            {
              !questionMode && (
                <div className='flex justify-between'>
                  <Button variant="outline" onClick={() => setQuestionMode(true)} 
                  type="button" size="sm" className="border-primary text-primary flex gap-2"> 
                   <p className="flex items-center gap-2"><Plus className='h-4 w-4' /> Any Questions?</p>
                  </Button>
                </div>
              )
            }
            {
              questionMode && (
                <div className="flex w-[80%] items-center mt-4 mx-8  my-2 flex-col md:flex-row">
                  <GeneralSearchButton 
                    onClick={handleAiSearch} 
                    value={searchText} 
                    setSearchText={setSearchText} 
                  />
                  {
                    anyQLoading ?  (
                      <p className="flex items-center justify-center">
                        <Loader className="animate-spin ml-auto" /> Loading....
                      </p>
                    ):
                    (
                      <button onClick={handleAiSearch} className="flex items-center ml-auto gap-2">
                        <Search className='h-4 w-4'  /> Search
                      </button>
                    )
                  }
                   <button onClick={() => setQuestionMode(false)}
                      className='top-2 right-2 p-1 px-2 rounded-lg text-red-700 bg-white'
                    >
                      <p className="font-bold text-2xl p-4">X</p>
                    </button>
                </div>
              )
            }
            {
              anyAnswer && (
                <div className='flex flex-col  items-start'>
                  <label className="mt-2 font-bold">Answer</label>
                  <ReactMarkdown>
                    {anyAnswer}
                  </ReactMarkdown>
                </div>
              )
            }

          </div>
          <div className='flex gap-2'>
            <Button 
              className='border-2 text-white rounded-full md:p-6 md:px-16'
              onClick={() => setDeleteModalOpen(true)} variant="destructive">{loading? 'Loading...': 'Delete Report'}</Button>
            <Button 
              className='border-2 bg-white text-black rounded-full md:p-6 md:px-16 hover:bg-gray-300'
              onClick={handlePrint} >
              Export PDF
            </Button>
            <Button 
              className='border-2 bg-white text-black rounded-full md:p-6 md:px-16 hover:bg-gray-300'
              onClick={() => setExportModalOpen(true)}>
                Export Excel
            </Button>
            <Button 
              className='border-2 bg-white text-black rounded-full md:p-6 md:px-16 hover:bg-gray-300'
              onClick={() => router.push(`/reports/${report.pkid}`)}>
              Edit
            </Button>
            <Button 
              className='border-2 bg-white text-black rounded-full md:p-6 md:px-16 hover:bg-gray-300'
              onClick={handleExit}>
                Exit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}