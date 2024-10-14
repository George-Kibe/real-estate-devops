"use client"

import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import { Brain, LoaderCircle, Eye, Pencil, Trash, DiamondPlus, Loader, Share2 } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AddCommentModal from "@/components/modals/AddCommentModal";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';
import AddPropertyModal from "@/components/modals/AddPropertyModal";
import EditLocationModal from "@/components/modals/EditLocationModal";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import SendClientAlertModal from "@/components/modals/SendClientAlertModal";
import { getTimeDifference } from "@/lib/getTimeDifference";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

export default function MembersPage({params, searchParams}) {
  const location = searchParams?.searchTerm || '';
  const {currentClient, setTempProperty} = useMainProvider();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState(location);
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [report, setReport] = useState(null);
  const [properties, setProperties] = useState([]);
  const [currentProperties, setCurrentProperties] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
  const [comments, setComments] = useState('');
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [currentProperty, setCurrentProperty] = useState({});
  const [currentIndex, setCurrentIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [summaryAiLoading, setSummaryAiLoading] = useState(false);
  const [summary, setSummary] = useState();
  const [summaryFinal, setSummaryFinal] = useState('');
  const [currentPropertiesIndex, setcurrentPropertiesIndex] = useState(5);
  // console.log("Report: ", report)
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
      { wch: 50 }  // report_final (allow larger width)
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
      amenities: property.amenities.join(', '),
      images: property.images.join(', '),
      comments: property.comments
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
      { wch: 100 }  // Comments (increase this value to make sure it accommodates long text)
    ];

    XLSX.utils.book_append_sheet(workbook, propertiesSheet, 'Properties');

    // Generate the Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.ms-excel' });
    const formattedDate = moment(report?.created_at).format('MM-DD-YYYY');
    saveAs(blob, `${report?.client_name}-${formattedDate}-report.xlsx`);
    // saveAs(blob, `${report?.client_name}-${report?.created_at}-report.xls`);
  };


  const fetchReport = async() => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reports/${id}`);
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
    // router.push(`/properties`)
    window.open(`/properties`, '_blank');
  }
  const fetchProperties = async() => {
    setLoading(true); setPropertiesLoading(true)
    try {
      const response = await axios.get(`${BACKEND_URL}/api/scrapping?search=${searchLocation}`);
      const data = response.data
      setProperties(data);
      setCurrentProperties(data.slice(0, currentPropertiesIndex));
      // console.log("Properties Data: ", data)
      setLoading(false); setPropertiesLoading(false)
    } catch (error) {
      toast.error("Fetching Properties failed. Try Again!")
      setLoading(false); setPropertiesLoading(false)
    }
  }
  const loadMore = () => {
    if (currentPropertiesIndex >= properties.length) {
      toast.info("No more properties to load!");
      return;
    }
    setCurrentProperties(properties.slice(currentPropertiesIndex, currentPropertiesIndex+5));
    setcurrentPropertiesIndex(currentPropertiesIndex + 5);
  }
  const addLocalProperties = async() => {
    if (!searchLocation){
      toast.error("Please Add or Change search Location!");
      return;
    }
    try {
      setLocalLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/search-properties/?search=${searchLocation}`)
      if (response.data.count > 0){
        setProperties(response.data.results.slice(0, 40))
        setCurrentProperties(response.data.results.slice(0, 5))
        toast.success('Local properties added at the bottom of your other properties');
        setLocalLoading(false);
      }else{
        toast.error('No properties found for the given location. Try Another Location');
        setLoading(false);
      } 
    } catch (error) {
      toast.error("Error searching. Please try again");
      console.log(error)
      setLocalLoading(false);
    }
  }

  useEffect(() => {
    if (searchLocation){
      fetchProperties();
    }
  }, [location])

  useEffect(() => {
    fetchReport();
  }, [])
  useEffect(() => {
    if (currentProperty?.comments) {
      setComments(currentProperty.comments);
    }
  }, [currentProperty]);

  const updateReport = async() => {
    setLoading(true)
    const data = {report_final: summaryFinal, start_time: startTime, end_time: endTime, report_draft: summary, properties: userProperties}
    console.log(data)
    try {
      const response = await axios.put(`${BACKEND_URL}/api/reports/${id}/`, data);
      const reportData = response.data
      // console.log("Update Report Data: ", reportData)
      toast.success("Report Updated Successfully!")
      fetchReport();
      setLoading(false);
    } catch (error) {
      toast.error("Report Update failed. Try Again!")
      setLoading(false)
    }
  }
  // console.log("Current Report: ", report)
  const GenerateSummaryFromAI = async() => {
    try {
      setSummaryAiLoading(true);
      setSummaryFinal('This is a sample summary generated by AI. It is just a placeholder. You can replace it with your own summary.');
      // handle ChatGPT API to get finalSummary
      // const response = await axios.post(`${BACKEND_URL}/api/generate-summary/`, {report: summary});
      setSummaryAiLoading(false);
    } catch (error) {
      toast.error("Error generating summary. Try Again!");
      setSummaryAiLoading(false); 
    }
  }
  const handleExit = () => {
    router.push(`/reports`);
  }

  const deleteReport = async() => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/reports/${id}/`);
      const data = response.data
      toast.success("Report Deleted Successfully!")
      router.push(`/reports`)
      setLoading(false);
    } catch (error) {
      toast.error("Report Delete failed. Try Again!")
      setLoading(false);
    }
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const closePropertyModal = () => {
    setPropertyModalOpen(false)
  }
  const closeLocationModal = () => {
    setLocationModalOpen(false)
  }
  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
  }
  const closeSendModal = () => {
    setSendModalOpen(false)
  } 

  const addToUserProperties = () => {
    if(!comments){
      toast.error("Please add comments before adding property!")
      return;
    }
    currentProperty.comments = comments
    if (editMode) {
      const updatedProperties = userProperties.map((p, i) => {
        if (i === currentIndex) {
          return currentProperty;
        }
        return p;
      });
      setUserProperties(updatedProperties);
      setComments('');
      setModalOpen(false);
      setCurrentProperty(null);
      setEditMode(false);
      return;
    }
    setUserProperties([...userProperties, currentProperty]);
    setComments('');
    setModalOpen(false);
    setCurrentProperties(currentProperties.filter((p, i) => i !== currentIndex));
    setCurrentProperty(null);
    setCurrentIndex(null);
    setEditMode(false);
  }
  const handleAdd = (property, index) => {
    setModalOpen(true);
    setCurrentProperty(property);
    setCurrentIndex(index);
  }
  const handleEdit = (property, index) => {
    setModalOpen(true);
    setCurrentIndex(index);
    setCurrentProperty(property);
    setEditMode(true)
  }
  const handleRemove = (index) => {
    //setProperties(properties.filter((p, i) => i !== index));
    setCurrentProperties(currentProperties.filter((p, i) => i !== index));
  }
  const handleShareProperty = (prop) => {
    setSendModalOpen(true);
    setCurrentProperty(prop);
  }

  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <div ref={divRef} className="">
      
      <AnimatedText text={`Report for ${report?.client_name}-${moment(report?.created_at).format('MMMM Do YYYY')}`} />
      <AddCommentModal comments={comments} isOpen={modalOpen} onClose={closeModal} setComments={setComments} currentProperty={currentProperty} addToUserProperties={addToUserProperties} editMode={editMode}/>
      <AddPropertyModal isOpen={propertyModalOpen} onClose={closePropertyModal} setUserProperties={setUserProperties}
      />
      <EditLocationModal isOpen={locationModalOpen} onClose={closeLocationModal} searchLocation={searchLocation} fetchProperties={fetchProperties} setSearchLocation={setSearchLocation} 
      />
      <ConfirmDeleteModal deleteAction={deleteReport} isOpen={deleteModalOpen} onClose={closeDeleteModal} title={report?.title}
      />
      <SendClientAlertModal isOpen={sendModalOpen} onClose={closeSendModal} client={currentClient} property={currentProperty} />

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
              <p className=''><p className="font-semibold">Report Draft:</p> {report?.report_draft}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <p className=''><p className="font-semibold">Report Final:</p> {report?.report_final}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <p className='flex flex-row gap-4'><p className="font-semibold">Time Spent:</p> { getTimeDifference(report?.start_time , report?.end_time)}</p>
            </div>

            <div className="mt-4 relative md:mt-6 cursor-pointer flex flex-row items-center gap-2">
              <p className="">{report?.start_time ? "Edit": "Set"} Start Time:</p>
              <input 
                  type="time" 
                  id="startTimeInput"
                  value={startTime} 
                  //className="opacity-0 absolute t-0 l-0"
                  onChange={e => setStartTime(e.target.value)} 
              />
              <p className="">{startTime ||report?.start_time}</p>
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row w-full justify-between">
          <Button onClick={() => setPropertyModalOpen(true)} className='m-4 '>
            Add Custom Property
          </Button>
          <Button onClick={addLocalProperties} className='m-4 '>
            {
              localLoading? "Loading Affordable Properties" : "Import Affordable Properties"
            }
          </Button>
          <Button onClick={() => setLocationModalOpen(true)} className='m-4'>
            Change Search Location
          </Button>
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
                propertiesLoading && 
                <tbody>
                  <tr>
                    <td colSpan={7} className="text-center flex flex-row"><LoaderCircle className="animate-spin mr-2" />Loading Properties...</td>
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
                              <Button className='mb-2' onClick={() => handleEdit(property, index)}>
                              <Pencil className="h-5 w-5 mr-2" />
                                Edit Details
                                </Button>
                              <Button onClick={() => viewProperty(property)}>
                                <Eye className="h-5 w-5 mr-2" />
                                View Property
                              </Button>
                              <Button className='mt-2' onClick={() => handleShareProperty(property)}>
                                <Share2 className="h-5 w-5 mr-2" />
                                Share With Client
                              </Button>
                            </td>
                        </tr>
                      ))
                  }
              </tbody>
              <tbody>
                  {
                    currentProperties?.map((property, index) => (
                        <tr key={property.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-2 ">
                                {userProperties.length + index+1}.
                            </td>
                            <th scope="row" className="flex justify-center items-center py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-20 h-20 rounded-md" src={property?.images[0]} alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-base text-wrap ">{property.title}</div>
                                    <div className="text-base font-semibold text-wrap">Address: {property.street_address}</div>
                                    <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                                      <p className="font-bold mr-2">Amenities:</p> {property.amenities.map((a, index) => <p className="ml-1" key={index}>{a +", "}</p>)}
                                    Bathrooms: {property.bathrooms}  
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
                                <div className="flex w-28 items-center">
                                    {property.phone_number}
                                </div>
                            </td>
                            <td className="px-2 py-1">
                                <p className="text-justify">{property.description}</p>
                            </td>
                            <td className="px-2 py-1">
                                <p className=""></p>
                            </td>
                            <td className="px-2 py-1  self-center justify-center flex-col gap-2">
                                <Button className='mb-2' onClick={() => handleAdd(property, index)}>
                                  <DiamondPlus className="h-5 w-5 mr-4" />
                                  Add
                                </Button>
                                <Button className='mb-2' onClick={() => viewProperty(property)}>
                                  <Eye className="h-5 w-5 mr-2" />
                                  View Property
                                </Button>
                                <Button className='mb-2' onClick={() => handleRemove(index)}  variant='destructive'>
                                  <Trash className="h-5 w-5 mr-2" />
                                  Remove
                                </Button>
                                <Button className='mt-2' onClick={() => handleShareProperty(property)}>
                                  <Share2 className="h-5 w-5 mr-2" />
                                  Share With Client
                              </Button>
                            </td>
                        </tr>
                      ))
                  }
              </tbody>
              {
                properties?.length > currentPropertiesIndex && (
                  <div className="flex w-full m-4 items-center justify-center">
                    <Button className='flex self-center' onClick={loadMore}>
                      Load More...
                    </Button>
                  </div>
                )
              }
          </table>
        </div>
        
        <div className='flex p-4 flex-col gap-4'>
          <form className='mt-7'>
              <div className='flex justify-between items-end'>
                  <label>Add Summary</label>
                  <Button variant="outline" onClick={GenerateSummaryFromAI} 
                  type="button" size="sm" className="border-primary text-primary flex gap-2"> 
                   
                  {
                    summaryAiLoading ? <p className="flex items-center justify-center"><Loader className="animate-spin mr-2" /> Loading....</p> :
                    <p className="flex items-center gap-2"><Brain className='h-4 w-4' /> Generate Summary Using AI</p>
                  }
                  </Button>
              </div>
              <Textarea className="mt-5" required
                  value={summary}
                  defaultValue={summary?summary:report?.report_draft}
                  onChange={(e)=>setSummary(e.target.value)}
              />
          </form>
          <div className="mt-4 relative md:mt-6 cursor-pointer flex flex-row items-center gap-2">
            <p className="">{report?.end_time ? "Edit": "Set"} End Time:</p>
            <input 
                type="time" 
                id="startTimeInput"
                value={endTime} 
                //className="opacity-0 absolute t-0 l-0"
                onChange={e => setEndTime(e.target.value)} 
            />
            <p className="">{endTime|| report?.end_time}</p>
          </div>
          <div className='flex gap-2'>
            <Button onClick={updateReport}>{loading? 'Loading...': 'Save Report'}</Button>
            <Button onClick={() => setDeleteModalOpen(true)} variant="destructive">{loading? 'Loading...': 'Delete Report'}</Button>
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