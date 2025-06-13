"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { LoaderCircle, Loader, Plus, Search, Copy, PlusCircle, Trash2, CloudDownload, CalendarDays, ChevronDown, MapPin, Sparkles  } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
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
import { handleFileUpload } from "@/utils/google-cloud";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SmartText from "@/components/SmartText";
import { LinkActions } from "@/components/LinkActions";
import ReportDescriptionModal from "@/components/modals/ReportDescriptionModal";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default function SingleReportPage({params}) {
  const { location } =  React.use(params)
  const {currentClient, orgMode, currentUser, tempUser, setCurrentClient, setTempProperty} = useMainProvider();
  const [searchLocation, setSearchLocation] = useState(location);
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [report, setReport] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [properties, setProperties] = useState([]);
  const [currentProperties, setCurrentProperties] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
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
  const [allComments, setAllComments] = useState('');

  const [resourceName, setResourceName] = useState('');
  const [resourceUrl, setResourceUrl] = useState(null);
  const [copiedText, setCopiedText] = useState('');
  const [resourcesSelected, setResourcesSelected] = useState('');
  const [additionalResources, setAdditionalResources] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [reportActivities, setReportActivities] = useState([]);

  const [currentPropertiesIndex, setCurrentPropertiesIndex] = useState(5);
  // console.log("User Properties: ", userProperties);
  // console.log("Current Properties: ", currentProperties)
  // console.log("reportActivities: ", reportActivities)
  const {id} = useParams();
  const divRef = useRef();
  const router = useRouter();

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
      if(data?.additional_resources.length > 0){
        setAdditionalResources(data.additional_resources)
        setResourcesSelected("Yes")
      }
      if(data?.report_activities?.length > 0){
        setReportActivities(data.report_activities)
      }
      const clientResponse = await axios.get(`${BACKEND_URL}/drf-api/clients?client_id=${data.client_id}`);
      console.log(clientResponse.data.results[0]);
      setCurrentClient(clientResponse.data.results[0]);
    } catch (error) {
      toast.error("Fetching report failed. Try Again!")
      console.log("Error: ", error.message)
      setErrors([...errors, error.message])
    } finally{
      setLoading(false)
    }
  }
  const viewProperty = (property) => {
    setTempProperty(property);
    window.open(`/properties`, '_blank');
  }
  const fetchProperties = async() => {
    setLoading(true); setPropertiesLoading(true)
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/scrapping?search=${searchLocation}`);
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
    const newComments = userProperties.map(p => p.comments).join(' ');
    setAllComments(newComments);
  }, [userProperties])
  
  const updateReport = async() => {
    setErrors([]);
    if (!startTime || !endTime) {
      toast.error("Please enter start and end time!");
      setErrors([...errors, "Please enter start and end time!"])
      setLoading(false);
      return;
    }
    if (startTime >= endTime){
      toast.error("Time overlap! End time must be after start time!");
      setErrors([...errors, "Time overlap! End time must be after start time!"])
      setLoading(false);
      return;
    }
    if (!staffLocation || !visitType) {
      toast.error("Please enter staff location!");
      setErrors([...errors, "Please enter staff location and visit Type!"])
      setLoading(false);
      return;
    }
    if (resourcesSelected === "Yes" && !additionalResources.length ){
      toast.error("Please add additional resources before adding property or click no!")
      setErrors([...errors, "Please add additional resources before adding property or click no!"])
      return;
    }
    // ensure end time is not after current time
    const now = moment();
    const end = moment(endTime, "HH:mm:ss");
    
    // Create full datetime for today with the endTime
    const todayEndTime = moment()
      .set({
        hour: end.get("hour"),
        minute: end.get("minute"),
        second: end.get("second"),
      });
    
    if (todayEndTime.isAfter(now)) {
      toast.error("Checkout time cannot be after current time!");
      setErrors([...errors, "Checkout time cannot be after current time!"]);
      return;
    }
    
    setLoading(true);
    const data = {
      start_time: startTime, 
      end_time: endTime, 
      report_draft: summary? summary : allComments, 
      report_final: summaryFinal, 
      properties: userProperties,
      report_view_type: visitType,
      follow_up_notes: followUpNotes,
      report_location: staffLocation,
      additional_resources: additionalResources,
      housing_coordinator_name: orgMode? tempUser?.name : currentUser?.name,
      housing_coordinator_id : orgMode? tempUser?._id : currentUser?._id,
      report_activities: reportActivities,
    }
    console.log("Update Report Data: ", data)

    try {
      const response = await axios.put(`${BACKEND_URL}/drf-api/reports/${id}/`, data);
      const reportData = response.data
      // console.log("Update Report Data: ", reportData)
      toast.success("Report Updated Successfully!");
      router.push(`/reports`)
      // fetchReport();
    } catch (error) {
      toast.error("Report Update failed. Try Again!")
    } finally{
      setLoading(false);
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
  const closePropertyModal = () => {
    setCurrentProperty({});
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

  const handleEdit = (property, index, isNew) => {
    setCurrentIndex(index);
    setEditMode(true);
    setIsNew(isNew);
    setCurrentProperty(property);
    setPropertyModalOpen(true);
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
  const addCustomProperty = () => {
    setIsNew(false);
    setCurrentProperty(null);
    setEditMode(false);
    setPropertyModalOpen(true);
  }

  const uploadFile = async(e) => {
    e.preventDefault();
    setFileUploading(true);
    try {
      const fileUrl = await handleFileUpload(e.target.files[0]);
      setResourceUrl(fileUrl)
    } catch (error){
      console.log("Uploading error: ", error)
      toast.error("Error uploading file")
    } finally {
      setFileUploading(false);
    }
  }
  const handleAddResource = () => {
    if (!resourceName || !resourceUrl) {
      toast.error("Missing resource name or resource");
      return
    };
    if (additionalResources?.length > 0){
      setAdditionalResources((prev) => [...prev, {name: resourceName, url: resourceUrl}]);
    } else {
      setAdditionalResources([{name: resourceName, url: resourceUrl}]);
    }
    setResourceName(""); setResourceUrl('');
  }
  const removeResource = (resource) => {
    const updatedResources = additionalResources.filter((r) => r.name !== resource.name);
    setAdditionalResources(updatedResources);
  }

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000); // Reset copied status after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className='flex flex-col justify-between gap-5 mb-5 text-[#0B2B5F]'>
      <div ref={divRef} className="">
        <div className="flex flex-col md:flex-row justify-between my-2 md:my-8">
          <div className="flex flex-col md:flex-row gap-2 text-2xl mb-4 ">
           <p className=""> Report for </p>
            <p className="text-[#45A71E] font-semibold text-3xl flex items-center ">{report?.client_name} 
              <ChevronDown className="h-6 w-6 font-bold" />
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-md font-semibold text-gray-500">
              {moment(report?.report_date ? report?.report_date : report?.created_at).format('MMMM DD YYYY')}
            </p>
            <CalendarDays className="h-6 w-6 text-[#45A71E]" />
          </div>
      </div>
      <AddPropertyModal
       currentProperty={currentProperty} 
       editMode={editMode}
       isNew={isNew}
       currentProperties={currentProperties}
       setIsNew={setIsNew}
       setEditMode={setEditMode}
       userProperties={userProperties}
       currentIndex={currentIndex}
       setUserProperties={setUserProperties}
       isOpen={propertyModalOpen} 
       setCurrentProperties={setCurrentProperties}
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

      <ReportDescriptionModal 
        isOpen={descriptionModal} 
        onClose={() => setDescriptionModal(false)}
        reportActivities={reportActivities}
        setReportActivities={setReportActivities}
      />

        <div className="px-2">
          {
            errors.length > 0 && (
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
                <p className="font-semibold">Select Location</p>
                <div className="relative w-full border rounded-sm">
                   <select
                      value={staffLocation}
                      onChange={(e) => setStaffLocation(e.target.value)}
                      className="block rounded-md focus:outline-none w-full h-full py-2"
                    >
                      <option value="">-Select Location-</option>
                      <option value="office">Office</option>                      
                      <option value="home">Home</option>
                      <option value="skilledNursingFacility">Skilled Nursing Facility</option>
                      <option value="community">Community</option>
                      <option value="others">Others</option>
                    </select>
                </div>
                {/* <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />  */}
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
                <p className="font-semibold">Select Visit Type:</p>
                <div className="relative w-full border p-2 rounded-sm">
                  <select
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value)}
                    className="block rounded-md focus:outline-none w-full h-full pr-10"
                  >
                    <option value="">-Select Visit Type-</option>
                    <option value="directinPerson">Direct In Person</option>
                    <option value="directRemote">Direct Remote</option>
                    <option value="InDirect">InDirect</option>
                  </select>
                  {/* <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" /> */}
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
        </div>

        <div className="flex flex-col xl:flex-row items-center mt-4 mx-8  my-2 gap-2 md:flex-row">
          <SearchButton 
            onClick={handleGeneralSearch} 
            value={searchText} 
            setSearchText={setSearchText} 
          />
          {
            searchLoading && (
              <p className="flex items-center justify-center">
                <Loader className="animate-spin ml-auto" /> Loading....
              </p>
            )
          }

          <button className="cursor-pointer flex gap-2" 
            onClick={() => setLocationModalOpen(true)}>
            <MapPin className="h-6 w-6 text-[#45A71E]" />
            <p className="text-[#45A71E]">Location</p>
          </button>

          <button data-tooltip-id="add-custom-property-tooltip" className=" border-1 rounded-full p-2 px-4" onClick={addCustomProperty}>
            <p className="text-sm">Add&nbsp;Housing&nbsp;Record</p>
          </button>
          
          <ReactTooltip
            id="add-custom-property-tooltip"
            place="top"
            // variant="info"
            content="Add custom apartment listings or support service"
          />

          <button className=" border-1 rounded-full p-2 px-4" onClick={addLocalProperties}>
            {
              localLoading?
               (<p className="text-sm">Loading&nbsp;Local&nbsp;Properties...</p>):
               (<p className="text-sm">Auto&nbsp;Generate&nbsp;Apartments</p>)
            }
          </button>
          <button className="">
            <LinkActions />
          </button>
        </div>  

        <div className="relative shadow-md sm:rounded-lg mt-4 md:mt-8">
          <table className="w-full table-row text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className=" bg-[#E8FDDF] h-12 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
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
                      <Image width={60} height={40} src={property.images[0]} className="rounded-md object-cover" alt="image" />
                    ) : (
                      <p>No Image</p>
                    )}
                    {/* <div className="max-w-60">
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
                  <td className="">
                    <div className="text-base text-wrap ">{property.title}</div>
                  </td>
                  <td className="">
                    <div className="text-base text-wrap ">
                      {property.street_address || property.address}
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
                  <td className="px-2 py-1 self-center justify-center flex-col gap-2">
                    <PropertyActions 
                      handleEdit={() => handleEdit(property, index, false)}
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
                      </td>
                      <td className="">
                        <div className="text-base text-wrap ">{property.title}</div>
                      </td>
                      <td className="">
                        <div className="text-base text-wrap ">
                          {property.street_address || property.address}
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
                        <SmartText text={property.description} />
                      </td>
                      <td className="px-2 py-1">
                        <div className="flex flex-col items-center gap-2">
                          NA
                        </div>
                      </td>

                      <td className="px-2 py-1">
                        <SmartText text={property.comments || ""} />
                      </td>
                      <td className="px-2 py-1">
                        <p className="">None</p>
                      </td>
                      <td className="px-2 py-1  self-center justify-center flex-col gap-2">
                        <PropertyActions 
                          handleAddProperty={() => handleEdit(property, index, true)}
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

        <div className="mt-4 md:mt-8">
          <div className='flex flex-col gap-2'>
            <p className='flex'>Report Description:</p> 
            <p className="font-semibold">{reportActivities.join(" ")}</p>
          </div>
          <button className="border-2 w-full flex justify-between p-2 rounded-b-sm mt-2" 
            onClick={() => setDescriptionModal(true)}>
            <p className="">Select</p>
            <ChevronDown className="h-6 w-6 text-[#45A71E]" />
          </button>
        </div>
        
        <div className='flex p-4 flex-col gap-4'>
          {
            summaryFinal && (
              <div className='flex flex-col items-start'>
                <label className="mt-2">Summary Notes</label>
                <p className="text-sm mt-2 border border-gray p-2 mb-2 relative">
                  {summaryFinal}
                </p>
              </div>
            )
          }
          <form className='mt-7'>
            <div className='flex justify-between items-end'>
              <label>
                <button data-tooltip-id="drop-comments-tooltop"  onClick={() => setSummary(allComments)} className='text-green-600 ml-2'>
                  One Click Summary
                </button>
              </label>
              <ReactTooltip
                id="drop-comments-tooltop"
                place="top"
                // variant="info"
                content="Click to drop all property comments"
              />
            </div>
            <Textarea className="mt-2" required
              value={summary}
              defaultValue={summary}
              onChange={(e)=>setSummary(e.target.value)}
            />
            <div className="flex w-full justify-end">
              <Button variant="outline" data-tooltip-id="summary-tooltop"  onClick={GenerateSummaryFromAI} 
                type="button" size="sm" className="border-primary bg-black self-end text-white mt-2 flex gap-2"> 
                {
                  summaryAiLoading ? <p className="flex items-center justify-center">
                    <Loader className="animate-spin mr-2" /> Loading....</p> :
                  <p className="flex items-center gap-2">
                    <Sparkles className='h-4 w-4' /> Generate Summary Using AI
                  </p>
                }
                <ReactTooltip
                  id="summary-tooltop"
                  place="top"
                  // variant="info"
                  content="Click once to summarize all clients' comments with AI"
                />
              </Button>
            </div>
            

            <div className='flex justify-between items-end'>
              <label>Add Follow Up Notes</label>
            </div>
            <Textarea className="mt-2" required
              value={followUpNotes}
              defaultValue={followUpNotes?followUpNotes:report?.followUpNotes}
              onChange={(e)=>setFollowUpNotes(e.target.value)}
            />
            <div className="flex w-full justify-end">
              <Button variant="outline" onClick={GenerateFollowUpSummaryAI} 
                type="button" size="sm" className="border-primary bg-black self-end text-white mt-2 flex gap-2"> 
                {
                  summaryAiLoading ? <p className="flex items-center justify-center"><Loader className="animate-spin mr-2" /> Loading....</p> :
                  <p className="flex items-center gap-2"><Sparkles className='h-4 w-4' /> Generate Follow Up Summary Using AI</p>
                }
              </Button>
            </div>
            {
              followUpNotes && (
                <div className='flex flex-col  items-start'>
                  <label className="mt-2">Follow up Notes</label>
                  <p className="text-sm mt-2 border border-gray p-2 mb-2 relative">
                    {followUpNotes}
                  </p>
                </div>
              )
            }
          </form>

          <div className="flex flex-col items-start p-2">
            <h2 className="text-xl font-bold mb-4">Any additional Resources?</h2>
            <div className="">
              <RadioGroup value={resourcesSelected} defaultValue="Yes" onValueChange={setResourcesSelected}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="r1" />
                  <Label htmlFor="r1">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="r2" />
                  <Label htmlFor="r2">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {resourcesSelected === "Yes" && (
          <div className="">
            <p className="">Additional Resources:</p>
            {additionalResources?.length > 0 &&
              additionalResources?.map((resource, index) => (
                <div key={index} className="flex flex-row items-center gap-2 mb-2">
                  <p className="">{index+ 1}.{resource.name}:</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{resource.url.substring(0,30)}...</p>
                    {copiedText === resource.url ? "Copied!" : 
                    <Copy 
                      onClick={() => handleCopy(resource.url)}  className="h-6 w-6" 
                    />  }
                    <Trash2 onClick={() => removeResource(resource)} className="h-6 w-6" />
                    <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer">
                      <CloudDownload className="h-6 w-6 text-blue-600" />
                    </a> 
                  </div>
                </div>
              ))}
            <div className="flex flex-row gap-4 items-center">
              <input type="text" placeholder='Resource Name'
                value={resourceName}
                onChange={ev => setResourceName(ev.target.value)}
                className="border-2 border-gray-300 rounded-md p-1
                mb-2 focus:border-blue-900"
              />
              <input type="file" onChange={uploadFile} />
              <Button disabled={fileUploading || !resourceUrl} onClick={handleAddResource} className="mt-2">
                <PlusCircle />
                {fileUploading? "Uploading...": "Add"}
              </Button>
            </div>
          </div>
        )}

          <div>
            {
              !questionMode && (
                <div className='flex justify-between relative'>
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
              className='bg-[#45A71E] text-white rounded-full md:p-6 md:px-16'
              onClick={updateReport}>{loading? 'Loading...': 'Save Report'}
            </Button>
            <Button 
              className='border-2 bg-white text-black rounded-full md:p-6 md:px-16'
              onClick={() => setDeleteModalOpen(true)} 
              variant="destructive">{loading? 'Loading...': 'Delete Report'}
            </Button>
            {/* <Button onClick={handlePrint}  className="">Export PDF</Button> */}
            <Button 
              className="underline bg-white hover:bg-gray-300 text-black rounded-full md:p-6 md:px-16"
              onClick={() => setExportModalOpen(true)}>Export</Button>
            {/* <Button 
              className="border-2 bg-white hover:bg-gray-300 text-black rounded-full md:p-6 md:px-16"
              onClick={() => router.push(`/reports/preview/${report.pkid}`)}>
              View
            </Button> */}
            <Button 
              className="border-2 bg-white hover:bg-gray-300 text-black rounded-full md:p-6 md:px-16"
              onClick={handleExit}>
              Exit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}