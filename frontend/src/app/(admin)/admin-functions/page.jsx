"use client"
import AnimatedText from '@/components/AnimatedText'
import { EnquiryActions } from '@/components/EnquiryActions'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { CirclePlus, Loader, GripVertical, Ellipsis } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const AdminFunctionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [loadingHousing, setLoadingHousing] = useState(false);
  const [loadingResources, setLoadingResources] = useState(false);
  const [loadingCommonBond, setLoadingCommonBond] = useState(false);
  const [enquiries, setEnquiries] = useState([]);

  const fetchEnquiries = async() => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/drf-api/enquiries/`)
      //console.log("Response Data:", response.data)
      setEnquiries(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log("Error Fetching Enquiries:", error)
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEnquiries();
  }, [])
  

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const delayRandomlyAndReturnValue = async() => {
    // Generate a random delay between 10 to 20 minutes (in milliseconds)
    const min = 10 * 60 * 1000; // 10 minutes in milliseconds
    const max = 20 * 60 * 1000; // 20 minutes in milliseconds
    const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log(`Delaying for ${randomDelay / 60000} minutes...`);
  
    await delay(randomDelay);
    return "Delayed value";
  }

  const handleScrapHousingLink = async () => {
    setLoadingHousing(true);
    toast.info("Scraping Housing Link started. This may take some time. Please be patient");
    await delayRandomlyAndReturnValue();
    setLoadingHousing(false);
  }
  const handleScrapCommonBond = async () => {
    setLoadingCommonBond(true);
    toast.info("Scraping Housing Link started. This may take some time. Please be patient");
    await delayRandomlyAndReturnValue();
    setLoadingCommonBond(false);
  }
  const handleScrapResourcesHud = async () => {
    setLoadingResources(true);
    toast.error("Scraping Resources.hud failed. Try Again!");
    //toast.info("Scraping Housing Link started. This may take some time. Please be patient");
    // await delayRandomlyAndReturnValue();
    setLoadingResources(false);
  }

  return (
    <div className='text-[#0B2B5F]'>
      <AnimatedText text={"Admin Actions"} />
      <div className="flex flex-col gap-4">
        <Button className="self-start">
          {
            loadingHousing? 
              <p className="flex items-center gap-1" onClick={handleScrapHousingLink}>
                <Loader className="animate-spin mr-2" />Scrapping...
              </p>
            : <p className="flex items-center gap-1" onClick={handleScrapHousingLink}>
                <CirclePlus />Scrap HousingLink
              </p>
          }
        </Button>
        <Button className="self-start">
          {
            loadingCommonBond? 
              <p className="flex items-center gap-1" onClick={handleScrapCommonBond}>
                <Loader className="animate-spin mr-2" />Scrapping...
              </p>
            : <p className="flex items-center gap-1" onClick={handleScrapCommonBond}>
                <CirclePlus />Scrap CommonBond Properties
              </p>
          }
          </Button>
        <Button className="self-start">
          {
            loadingResources? 
              <p className="flex items-center gap-1" onClick={handleScrapResourcesHud}>
                <Loader className="animate-spin mr-2" />Scrapping...
              </p>
            : <p className="flex items-center gap-1" onClick={handleScrapResourcesHud}>
                <CirclePlus />Scrap Resources.hud
              </p>
          }
        </Button>
      </div>

      <AnimatedText text={"All Enquiries"} />

      <div className="overflow-hidden rounded-lg border shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="">
            <tr>
              <th scope="col" className="px-2 py-1 font-medium">#</th>
              <th scope="col" className="px-2 py-1 font-medium">Name</th>
              <th scope="col" className="px-2 py-1 font-medium">Email</th>
              <th scope="col" className="px-2 py-1 font-medium">Status</th>
              <th scope="col" className="px-2 py-1 font-medium">Message</th>
              <th scope="col" className="px-2 py-1 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y ">
            {
              enquiries?.map((enquiry, index) => (
                <tr key={index}
                  className='w-full'                >
                    <td className="px-2 py-1 text-sm">{index + 1}.</td>
                    <td className="flex gap-3 px-2 py-1 font-normal">
                    {enquiry.name}
                    </td>
                    <td className="px-2 py-1">{enquiry.email}</td>
                    <td className="px-2 py-1">
                      <div className="flex gap-2">
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                        >
                          {enquiry.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-1">{enquiry.message}</td>
                    <td className="px-2 py-1">
                      <button>
                        <EnquiryActions enquiry={enquiry} />
                      </button>
                    </td>
                  </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminFunctionsPage
