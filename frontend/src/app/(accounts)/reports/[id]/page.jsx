"use client"

import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import { Brain, LoaderCircle } from 'lucide-react';
import moment from "moment/moment";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {properties as props} from '../../../../../data/properties';
import AddCommentModal from "@/components/modals/AddCommentModal";
import { set } from "nprogress";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

export default function MembersPage({params, searchParams}) {
  const location = searchParams?.searchTerm;
  const {currentUser} = useMainProvider();

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [report, setReport] = useState(null);
  const [properties, setProperties] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
  const [comments, setComments] = useState('');
  const [currentProperty, setCurrentProperty] = useState({});
  const [currentIndex, setCurrentIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [summary, setSummary] = useState();
  
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

  const fetchReport = async() => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reports/${id}`);
      const data = response.data
      console.log("Report Data: ", data.properties.length)
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
  const fetchProperties = async() => {
    setLoading(true); setPropertiesLoading(true)
    try {
      const response = await axios.get(`${BACKEND_URL}/api/scrapping?search=${location}`);
      const data = response.data
      setProperties(data.slice(0, 10));
      console.log("Properties Data: ", data)
      setLoading(false); setPropertiesLoading(false)
    } catch (error) {
      toast.error("Fetching Properties failed. Try Again!")
      setLoading(false); setPropertiesLoading(false)
    }
  }

  useEffect(() => {
    if (location){
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
  const onSave = async(e) => {
    e.preventDefault();
    console.log("On Save: ", summary)
    // updateReport(formData)
  }
  // const handlePrint = () => {
  //   window.print();
  // };

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
    setProperties(properties.filter((p, i) => i !== index));
  }

  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <div ref={divRef} className="">
      
      <AnimatedText text={`Report for ${report?.client_name}-${moment(report?.created_at).format('MMMM Do YYYY')}`} />
      <AddCommentModal comments={comments} isOpen={modalOpen} onClose={closeModal} setComments={setComments} currentProperty={currentProperty} addToUserProperties={addToUserProperties} editMode={editMode}/>
      
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="p-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Property Details
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Comments
                      </th>
                      <th scope="col" className="px-6 py-3">
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
                !propertiesLoading && !properties?.length &&
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
                            <td className="w-4 p-4 ">
                                {index+1}.
                            </td>
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-20 h-20 rounded-md" src={property?.images[0]} alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{property.street_address}</div>
                                    <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                                      <p className="font-bold mr-2">Amenities:</p> {property.amenities.map((a, index) => <p className="ml-1" key={index}>{a +", "}</p>)}</div>
                                </div>  
                            </th>
                            <td className="px-6 py-4">
                              {property.price}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    {property.phone_number}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="">{property.description}</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="">{property.comments}</p>
                            </td>
                            <td className="px-6 py-4 flex gap-2 items-center self-start justify-center">
                                <Button onClick={() => handleEdit(property, index)}>Edit</Button>
                            </td>
                        </tr>
                      ))
                  }
              </tbody>
              <tbody>
                  {
                    properties?.map((property, index) => (
                        <tr key={property.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4 ">
                                {userProperties.length + index+1}.
                            </td>
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-20 h-20 rounded-md" src={property?.images[0]} alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{property.street_address}</div>
                                    <div className="font-normal text-gray-500 flex flex-row flex-wrap">
                                      <p className="font-bold mr-2">Amenities:</p> {property.amenities.map((a, index) => <p className="ml-1" key={index}>{a +", "}</p>)}</div>
                                </div>  
                            </th>
                            <td className="px-6 py-4">
                              {property.price}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    {property.phone_number}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="">{property.description}</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className=""></p>
                            </td>
                            <td className="px-6 py-4 flex gap-2 items-center self-start justify-center">
                                <Button onClick={() => handleAdd(property, index)}>Add</Button>
                                <Button onClick={() => handleRemove(index)} variant='destructive'>Remove</Button>
                            </td>
                        </tr>
                      ))
                  }
              </tbody>
          </table>
        </div>
        
        <div className='flex flex-col gap-5'>
          <div className='flex flex-row gap-4'>
            <p className=''><p className="font-semibold">Report Title:</p> {report?.title}</p>
            <p className=''><p className="font-semibold">Report Type:</p> {report?.report_type}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <p className=''><p className="font-semibold">Report Description:</p> {report?.description}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <p className=''><p className="font-semibold">Report Draft:</p> {report?.report_draft}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <p className=''><p className="font-semibold">Report Final:</p> {report?.report_final}</p>
          </div>
          <form className='mt-7' onSubmit={onSave}>
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
              <div className='mt-2 flex justify-end'>
                <Button type="submit"
                  disabled={loading}>
                  {loading?<LoaderCircle className='animate-spin' />:'Save'}
                </Button>
              </div>
          </form>
          <div className='flex gap-2'>
            <Button onClick={updateReport}>{loading? 'Loading...': 'Update Report'}</Button>
            <Button onClick={() => deleteReport(id)} variant="destructive">{loading? 'Loading...': 'Delete Report'}</Button>
            <Button onClick={handlePrint}  className="">Export PDF</Button>
            <Button onClick={handlePrint} className="">Share</Button>
          </div>
        </div>
      </div>
    </div>
  );
}