"use client"

import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import { Brain, LoaderCircle, Loader, Plus, Search } from 'lucide-react';
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
import ConfirmExportModal from "@/components/modals/ConfirmExportModal";
import { PropertyActions } from "@/components/PropertyActions";
import { FaHeart } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import { GeneralSearchButton, SearchButton } from "@/components/TableSearch";
import { callAIPrompt, generalAIPrompt, generateAISummary, shuffleArray } from "@/utils/functions";
import Image from "next/image";
import { user } from "@nextui-org/react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default function MembersPage({params, searchParams}) {
  const location = searchParams?.searchTerm || '';
  const {currentClient, setTempProperty} = useMainProvider();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState(location);
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [report, setReport] = useState(null);
  const [searchText, setSearchText] = useState('');

  const [properties, setProperties] = useState([]);
  const [currentProperties, setCurrentProperties] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
  // states for a single property
  const [comments, setComments] = useState('');
  const [agentSelected, setAgentSelected] = useState('');
  const [resourcesSelected, setResourcesSelected] = useState('');
  const [agentName, setAgentName] = useState('');
  const [additionalResources, setAdditionalResources] = useState('');
  // report states
  const [errors, setErrors] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [staffLocation, setStaffLocation] = useState('');
  const [visitType, setVisitType] = useState('');
  const [currentProperty, setCurrentProperty] = useState({});
  const [currentIndex, setCurrentIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [summaryAiLoading, setSummaryAiLoading] = useState(false);
  const [summary, setSummary] = useState();
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [summaryFinal, setSummaryFinal] = useState('');
  const [anyAnswer, setAnyAnswer] = useState('');
  const [questionMode, setQuestionMode] = useState(false);
  const [anyQLoading, setAnyQLoading] = useState(false);


  const [currentPropertiesIndex, setCurrentPropertiesIndex] = useState(5);
  // console.log("User Properties: ", userProperties);
  // console.log("Current Properties: ", currentProperties)
  const allComments = userProperties.map(p => p.comments).join(' ');
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
      { wch: 50 } // follow up notes
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
      { wch: 40 },  // Comments (increase this value to make sure it accommodates long text)
      { wch: 10 },  // isFavorite
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
  const viewProperty = (property) => {
    setTempProperty(property);
    window.open(`/properties`, '_blank');
  }
  const fetchProperties = async() => {
    setLoading(true); setPropertiesLoading(true)
    try {
      const response = await axios.get(`${BACKEND_URL}/api/scrapping?search=${searchLocation}`);
      const data = shuffleArray(response.data)
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
    setCurrentPropertiesIndex(currentPropertiesIndex + 5);
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

  const handleGeneralSearch = async() => {
    if (!searchText) {
      toast.error("Please enter a search phrase!");
      return;
    }
    if (!searchLocation) {
      toast.error("Please add or change search location!");
      return;
    }
    setSearchLoading(true)
    try {
      const results = await callAIPrompt(searchLocation, searchText);
      console.log("Search Result: ", results)
      setProperties(results)
      setCurrentProperties(results.slice(0, 5))
      setSearchText('')
      setSearchLoading(false)
    } catch (error) {
      toast.error("Some Error occured while searching. Try Again!")
      setSearchLoading(false)
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
    setErrors([]);
    setLoading(true);
    if (!startTime || !endTime) {
      toast.error("Please enter start and end time!");
      setErrors([...errors, "Please enter start and end time!"])
      setLoading(false);
      return;
    }
    if (!staffLocation || !visitType) {
      toast.error("Please enter staff location!");
      setErrors([...errors, "Please enter staff location and visit Type!"])
      setLoading(false);
      return;
    }
    const data = {
      start_time: startTime, 
      end_time: endTime, 
      report_draft: summary? summary : allComments, 
      report_final: summaryFinal, 
      properties: userProperties,
      report_view_type: visitType,
      follow_up_notes: followUpNotes,
      report_location: staffLocation
    }

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
    if (!summary && ! allComments) {
      toast.error("Please enter a summary!");
      return;
    }
    try {
      setSummaryAiLoading(true);
      let text;
      if (summary){
        text = summary;
      }else{
        text = allComments;
      }
      const responseText = await generateAISummary(text);
      console.log("AI Summary: ", responseText)
      setSummaryFinal(responseText);
      toast.success("Summary Generated Successfully!");
      setSummaryAiLoading(false);
    } catch (error) {
      toast.error("Error generating summary. Try Again!");
      setSummaryAiLoading(false); 
    }
  }
  const GenerateFollowUpSummaryAI = async() => {
    if (!followUpNotes) {
      toast.error("Please enter notes to summarize!");
      return;
    }
    try {
      setSummaryAiLoading(true);
      const responseText = await generateAISummary(followUpNotes);
      console.log("AI Summary: ", responseText)
      setFollowUpNotes(responseText);
      toast.success("Summary Generated Successfully!");
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
    if (agentSelected === "Yes" && (!agentName && !currentProperty.agentName)){
      console.log(agentSelected)
      toast.error("Please add agent name before adding property!")
      return;
    }
    if (resourcesSelected === "Yes" && (!additionalResources && !currentProperty.additionalResources )){
      toast.error("Please add additional resources before adding property!")
      return;
    }
    currentProperty.comments = comments
    // modify agentName only if agentname exists
    if (agentName){
      currentProperty.agentName = agentName
    }
    if (additionalResources){
      currentProperty.additionalResources = additionalResources
    }
    if (editMode) {
      const updatedProperties = userProperties.map((p, i) => {
        if (i === currentIndex) {
          return currentProperty;
        }
        return p;
      });
      setUserProperties(updatedProperties);
      setComments(''); setAgentName(''); setAdditionalResources('');
      setModalOpen(false);
      setCurrentProperty(null);
      setEditMode(false);
      return;
    }
    setUserProperties([...userProperties, currentProperty]);
    setComments(''); setAgentName(''); setAdditionalResources('');
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
    if (property.isCustom){
      setCurrentIndex(index);
      setEditMode(true)
      setCurrentProperty(property);
      setPropertyModalOpen(true);
      return;
    }
    setModalOpen(true);
    setCurrentIndex(index);
    setCurrentProperty(property);
    setEditMode(true)
  }
  
  const handleRemove = (index) => {
    setCurrentProperties(currentProperties.filter((p, i) => i !== index));
  }
  const handleMarkFavorite = (index) => {
    const propertyToFavorite = currentProperties[index]
    const tempProperties = currentProperties.filter((p, i) => i !== index);
    if (propertyToFavorite.isFavorite) {
      propertyToFavorite.isFavorite = false;
    } else {
      propertyToFavorite.isFavorite = true;
    }
    tempProperties.splice(index, 0, propertyToFavorite);
    setCurrentProperties(tempProperties);
  }
  const handleMarkFavoriteUser = (index) => {
    const propertyToFavorite = userProperties[index]
    const tempProperties = userProperties.filter((p, i) => i !== index);
    if (propertyToFavorite.isFavorite) {
      propertyToFavorite.isFavorite = false;
    } else {
      propertyToFavorite.isFavorite = true;
    }
    tempProperties.splice(index, 0, propertyToFavorite);
    setUserProperties(tempProperties);
  }

  const handleRemoveUserProperty = (title) => {
    console.log("Removing property with id: ", id)
    setUserProperties(userProperties.filter(p => p.title !== title))
  }
  const handleShareProperty = (prop) => {
    setSendModalOpen(true);
    setCurrentProperty(prop);
  }

  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <div ref={divRef} className="">
      
      <AnimatedText text={`Report for ${report?.client_name}-${moment(
        report?.report_date ? report?.report_date : report?.created_at).format('MMMM Do YYYY')} `} />
      <AddCommentModal 
        comments={comments} 
        setComments={setComments} 
        isOpen={modalOpen} 
        onClose={closeModal}         
        currentProperty={currentProperty} 
        addToUserProperties={addToUserProperties} 
        editMode={editMode}
        setAgentName={setAgentName}
        agentName={agentName}
        agentSelected={agentSelected}
        setAgentSelected={setAgentSelected}
        additionalResources={additionalResources}
        setAdditionalResources={setAdditionalResources}
        resourcesSelected={resourcesSelected}
        setResourcesSelected={setResourcesSelected}
      />
      <AddPropertyModal
       currentProperty={currentProperty} 
       editMode={editMode}
       setEditMode={setEditMode}
       userProperties={userProperties}
       currentIndex={currentIndex}
       setUserProperties={setUserProperties}
       isOpen={propertyModalOpen} 
       onClose={closePropertyModal} 
      />
      <ConfirmExportModal 
        exportAction={exportToExcel} 
        isOpen={exportModalOpen} 
        onClose={() => setExportModalOpen(false)} 
      />
      <EditLocationModal 
        isOpen={locationModalOpen} 
        onClose={closeLocationModal} 
        searchLocation={searchLocation} 
        fetchProperties={fetchProperties} 
        setSearchLocation={setSearchLocation} 
      />
      <ConfirmDeleteModal 
        deleteAction={deleteReport} 
        isOpen={deleteModalOpen} 
        onClose={closeDeleteModal} 
        title={report?.title}
      />
      <SendClientAlertModal 
        isOpen={sendModalOpen} 
        onClose={closeSendModal} 
        client={currentClient} 
        property={currentProperty} 
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

          <div className="flex flex-col p-2">              
            {/* Location Dropdown */}
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium ">Select Location</label>
              <div className="flex items-center gap-4">
                <select
                  value={staffLocation}
                  onChange={(e) => setStaffLocation(e.target.value)}
                  className="block border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
                >
                  <option value="" disabled>Select Location</option>
                  <option value="office">Office</option>
                  <option value="home">Home</option>
                </select>
                <p className="text-sm">Selected Location: <span className="font-semibold ">{report?.report_location || staffLocation || 'None'}</span></p>
              </div>
            </div>

            {/* Visit Type Dropdown */}
            <div className="w-full mt-2">
              <label className="block mb-2 text-sm font-medium">Visit Type</label>
              <div className="flex items-center gap-4">
                <select
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value)}
                  className="block border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
                >
                  <option value="" disabled>Select Visit Type</option>
                  <option value="direct">Direct</option>
                  <option value="indirect">Indirect</option>
                </select>
                <p className="text-sm">Selected Visit Type: <span className="font-semibold">{visitType || 'None'}</span></p>
              </div>
            </div>
          </div>
        </div>
        
       
        <div className="flex w-[80%] items-center mt-4 mx-8  my-2 flex-col md:flex-row">
          {/* <h2 className="font-semibold text-xl mr-2 ml-4">Search for:</h2>  */}
          <SearchButton 
            onClick={handleGeneralSearch} 
            value={searchText} 
            setSearchText={setSearchText} 
          />
          {
            searchLoading ?  (
              <p className="flex items-center justify-center">
                <Loader className="animate-spin ml-auto" /> Loading....
              </p>
            ):
            (
              <button onClick={handleGeneralSearch} className="flex items-center ml-auto gap-2">
                <Search className='h-4 w-4'  /> Search
              </button>
            )
          }
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
      
        <div className="relative shadow-md sm:rounded-lg">
          <table className="w-full table-row text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-1 w-24">
                  No
                </th>
                <th scope="col" className="px-2 py-1">
                  Details
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
                      <Image width={100} height={100} src={property.images[0]} className="rounded-md object-fill" alt="image" />
                    ) : (
                      <p>No Image</p>
                    )}
                    <div className="">
                      <div className="text-base text-wrap ">Name: {property.title}</div>
                      <div className="text-base font-semibold text-wrap">Address: {property.street_address || property.address}</div>
                      <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                        <p className="font-bold mr-2">Amenities:</p> {property?.amenities?.map((a, index) => <p className="ml-1" key={index}>{a +", "}</p>)}
                      </div>
                      <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                        <p className="font-bold mr-2">Bathrooms:</p>{property.bathrooms}  
                      </div>
                      <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                        <p className="font-bold mr-2">Website:</p>{property.website}  
                      </div>
                    </div>  
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
                      <p className="">{property.description}</p>
                  </td>
                  <td className="px-2 py-1">
                      <p className="">{property.comments}</p>
                  </td>
                  <td className="px-2 py-1  self-center justify-center flex-col gap-2">
                    <PropertyActions 
                      handleEdit={() => handleEdit(property, index)}
                      viewProperty={() => viewProperty(property)} 
                      handleShareProperty={() => handleShareProperty(property)} 
                      handleRemoveProperty={() =>handleRemoveUserProperty(property.title)} 
                      isFavorite={property.isFavorite}
                      handleMarkFavorite={() => handleMarkFavoriteUser(index)}
                  />
                  </td>
                  </tr>
                ))
              }
            </tbody>
            {/* user properties; These are properties Searched or scrapped pending works */}
            <tbody>
                {
                  currentProperties?.map((property, index) => (
                    <tr key={property.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="">
                        {userProperties.length + index+1}.
                      </td>
                      <td scope="row" className="flex gap-2 relative items-center py-2 text-gray-900 whitespace-nowrap dark:text-white">
                        {
                          property.isFavorite && <FaHeart className='h-6 w-6 absolute top-3 left-0 text-red-500 mr-2'  />
                        }
                        {property?.images?.[0] ? (
                          <Image width={100} height={100} src={property.images[0]} className="rounded-md object-fill" alt="image" />
                        ) : (
                          <p>No Image</p>
                        )}
                        <div className="">
                          <div className="text-base text-wrap ">Name: {property.title}</div>
                          <div className="text-base font-semibold text-wrap">Address: {property.street_address || property.address}</div>
                          <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                            <p className="font-bold mr-2">Amenities:</p> {property?.amenities?.map((a, index) => <p className="ml-1" key={index}>{a +", "}</p>)}
                          </div>
                          <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                            <p className="font-bold mr-2">Bathrooms:</p>{property.bathrooms}  
                          </div>
                          <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                            <p className="font-bold mr-2">Website:</p>{property.website}  
                          </div>
                        </div>  
                      </td>
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
                      <PropertyActions 
                        handleAddProperty={() => handleAdd(property, index)} 
                        isNew={true}                               
                        viewProperty={() => viewProperty(property)} 
                        handleShareProperty={() => handleShareProperty(property)} 
                        handleRemoveProperty={() => handleRemove(index)}
                        isFavorite={property.isFavorite}
                        handleMarkFavorite={() => handleMarkFavorite(index)}
                      />
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
            <Textarea className="mt-2" required
                value={summary || allComments}
                defaultValue={summary}
                onChange={(e)=>setSummary(e.target.value)}
            />
            {
              summaryFinal && (
                <div className='flex flex-col  items-start'>
                  <label className="mt-2">Final Summary</label>
                  <p className="text-justify text-sm">
                    {summaryFinal}
                  </p>
                </div>
              )
            }

            <div className='flex justify-between items-end'>
              <label>Add Follow Up Notes</label>
              <Button variant="outline" onClick={GenerateFollowUpSummaryAI} 
              type="button" size="sm" className="border-primary text-primary flex gap-2"> 
                
              {
                summaryAiLoading ? <p className="flex items-center justify-center"><Loader className="animate-spin mr-2" /> Loading....</p> :
                <p className="flex items-center gap-2"><Brain className='h-4 w-4' /> Generate Summary Using AI</p>
              }
              </Button>
            </div>
            <Textarea className="mt-2" required
                value={followUpNotes}
                defaultValue={followUpNotes?followUpNotes:report?.followUpNotes}
                onChange={(e)=>setFollowUpNotes(e.target.value)}
            />
            {
              followUpNotes && (
                <div className='flex flex-col  items-start'>
                  <label className="mt-2">Follow up Notes</label>
                  <p className="text-justify text-sm">
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
            <Button onClick={updateReport}>{loading? 'Loading...': 'Save Report'}</Button>
            <Button onClick={() => setDeleteModalOpen(true)} variant="destructive">{loading? 'Loading...': 'Delete Report'}</Button>
            <Button onClick={handlePrint}  className="">Export PDF</Button>
            {/* <Button onClick={handlePrint} className="">Share</Button> */}
            <Button onClick={() => setExportModalOpen(true)} className="">Export Excel</Button>
            <Button onClick={handleExit} className="">Exit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}