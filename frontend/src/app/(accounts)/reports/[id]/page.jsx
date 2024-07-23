"use client"

import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import { Brain, LoaderCircle, Eye, Pencil, Trash, DiamondPlus } from 'lucide-react';
import moment from "moment/moment";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AddCommentModal from "@/components/modals/AddCommentModal";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import AddPropertyModal from "@/components/modals/AddPropertyModal";
import EditLocationModal from "@/components/modals/EditLocationModal";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

export default function MembersPage({params, searchParams}) {
  const location = searchParams?.searchTerm || '';
  const {currentUser, setTempProperty} = useMainProvider();

  const [modalOpen, setModalOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState(location);
  //console.log("Search Location: ", searchLocation)
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [report, setReport] = useState(null);
  const [properties, setProperties] = useState([]);
  const [currentProperties, setCurrentProperties] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
  const [comments, setComments] = useState('');
  const [currentProperty, setCurrentProperty] = useState({});
  const [currentIndex, setCurrentIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [summary, setSummary] = useState();
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
      console.log("Properties Data: ", data)
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
      toast.error("Please add or edit search Location!");
      return;
    }
    try {
      setLocalLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/search-properties/?search=${searchLocation}`)
      if (response.data.count > 0){
        setProperties(response.data.results.slice(0, 40))
        setCurrentProperties(response.data.results.slice(0, 5))
        toast.success('Local propertie added at the bottom of your other properties');
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
    const data = {report_final: summary, report_draft: summary, properties: userProperties}
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
    console.log("Generate Summary from AI")
  }
  const handleExit = () => {
    router.push(`/reports`);
  }

  const deleteReport = async(reportId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/reports/${reportId}/`);
      const data = response.data
      console.log("Delete Report Data: ", data)
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
    setCurrentProperty(null);
    setProperties(properties.filter((p, i) => i !== currentIndex));
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

  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <div ref={divRef} className="">
      
      <AnimatedText text={`Report for ${report?.client_name}-${moment(report?.created_at).format('MMMM Do YYYY')}`} />
      <AddCommentModal comments={comments} isOpen={modalOpen} onClose={closeModal} setComments={setComments} currentProperty={currentProperty} addToUserProperties={addToUserProperties} editMode={editMode}/>
      <AddPropertyModal isOpen={propertyModalOpen} onClose={closePropertyModal} setUserProperties={setUserProperties}/>
      <EditLocationModal isOpen={locationModalOpen} onClose={closeLocationModal} searchLocation={searchLocation} fetchProperties={fetchProperties} setSearchLocation={setSearchLocation} />
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
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between">
          <Button onClick={() => setPropertyModalOpen(true)} className='m-4 '>
            Add Custom Property
          </Button>
          <Button onClick={addLocalProperties} className='m-4 '>
            {
              localLoading? "Loading Local Properties" : "Import Local Properties"
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
                                  <DiamondPlus className="h-5 w-5 mr-2" />
                                  Add
                                </Button>
                                <Button className='mb-2' onClick={() => viewProperty(property)}>
                                  <Eye className="h-5 w-5 mr-2" />
                                  View Property
                                </Button>
                                <Button className='mb-2' onClick={() => handleRemove(index)}variant='destructive'>
                                  <Trash className="h-5 w-5 mr-2" />
                                  Remove
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
                  <Button variant="outline" onClick={()=>GenerateSummaryFromAI()} 
                  type="button" size="sm" className="border-primary text-primary flex gap-2"> 
                  <Brain className='h-4 w-4' />  Generate Summary Using AI</Button>
              </div>
              <Textarea className="mt-5" required
                  value={summary}
                  defaultValue={summary?summary:report?.report_draft}
                  onChange={(e)=>setSummary(e.target.value)}
              />
          </form>
          <div className='flex gap-2'>
            <Button onClick={updateReport}>{loading? 'Loading...': 'Save Report'}</Button>
            <Button onClick={() => deleteReport(id)} variant="destructive">{loading? 'Loading...': 'Delete Report'}</Button>
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