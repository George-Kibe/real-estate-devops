'use client'
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader } from 'lucide-react';
import moment from 'moment';
import { Button } from '@/components/ui/button';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const SingleBilling = () => {
  const router = useRouter();
  const [billing, setBilling] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    housingCoordinatorName: '',
    housingCoordinatorId: '',
    claim_amount: '',
    bill_status: '',
    scheduled_hours: 0,
    workedHours: 0,
    billedHours: 0,
    log_status: '',
    pro_code: '',
    modifier: '',
    payor: '',
  });
  const goBack = () => {
    router.push("/clients-billing")
  };

  const {id} = useParams();
  const fetchBillingData = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${BACKEND_URL}/drf-api/billings/${id}`);
        const billing = response.data;
        setBilling(billing);
        setFormData(billing);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  };
  const updateBilling = async () => {
    setUpdateLoading(true);
    try {
        const response = await axios.put(`${BACKEND_URL}/drf-api/billings/${id}/`, formData);
        const billing = response.data;
        setBilling(billing);
        setFormData(billing);
        toast.success("Billing updated successfully");
    } catch (error) {
        console.log(error);
        toast.error("Error updating billing");
    } finally {
        setUpdateLoading(false);
    }
  };
  
  useEffect(() => {
    if (!id) return;
    fetchBillingData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log(formData);   

  };

  const handleDownloadX123 = (data) => {
    // Custom replacer to handle circular references
    const cache = new Set();
    const fileContent = JSON.stringify(data, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          return; // Remove circular reference
        }
        cache.add(value);
      }
      return value;
    }, 2);
  
    // Create a blob with the file content and set the MIME type
    const blob = new Blob([fileContent], { type: 'application/json' });
    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${data.client_name}_claim.clp`; // Name the file based on client name
    // Trigger download
    link.click();
    // Clean up the URL object
    URL.revokeObjectURL(link.href);
  };
  const handleDownloadX12 = (data) => {
    // Format data as a string in JSON format with indentation
    const fileContent = JSON.stringify(data, null, 2);
    // Create a blob with the file content and set the MIME type
    const blob = new Blob([fileContent], { type: 'application/json' });
    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${data.client_name}_claim.clp`; // Name the file based on client name
    // Trigger download
    link.click();
    // Clean up the URL object
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className=" p-4 md:p-8 text-[#0B2B5F]">
        {
            loading && (
                <p className="flex flex-row gap-2 items-center">
                    <Loader /> Loading...
                </p>
            )
        }
        <p className="px-8 text-xl font-bold">
            Billing for {formData?.client_name} for {moment(formData?.service_date_start).format('MMMM Do YYYY')} to {moment(formData?.service_end_start).format('MMMM Do YYYY')}
        </p>
        <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="client_name">
            Client Name
            </label>
            <input
            className="shadow appearance-none border rounded w-full md:w-[40%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="client_name"
            type="text" readOnly
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="housing_coordinator_name">
            Housing Cordinator Name
            </label>
            <input
            className="shadow appearance-none border rounded w-full md:w-[40%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="housing_coordinator_name"
            type="text"
            name="housing_coordinator_name"
            value={formData.housing_coordinator_name}
            onChange={handleChange}
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="bill_status">
            Bill Status
            </label>
            <select
            className="shadow appearance-none border rounded w-full md:w-[40%] py-2 px-3 leading-tight focus:outline-none   
    focus:shadow-outline"   

            id="bill_status"
            name="bill_status"
            value={formData.bill_status}
            onChange={handleChange}
            >
            <option value="Ready">Ready</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Submitted">Submitted</option>
            <option value="Processing">Processing</option>
            <option value="Unable to Bill">Unable to Bill</option>
            </select>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="scheduled_hours">
                Scheduled Hours
            </label>
            <input
                type="number"
                id="scheduled_hours"
                name="scheduled_hours"
                value={formData.scheduled_hours}
                onChange={handleChange}
                class="shadow appearance-none border rounded w-full md:w-[40%] py-2 px-3 text-gray-700 leading-tight focus:outline-none   
            focus:shadow-outline"
                readonly
            />
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="billed_hours">
                Billed Hours
            </label>
            <input
                type="number"
                id="billed_hours"
                name="billed_hours"
                value={parseInt(formData.billed_hours)}
                onChange={handleChange}
                class="shadow appearance-none border rounded w-full md:w-[40%] py-2 px-3 text-gray-700 leading-tight focus:outline-none   
            focus:shadow-outline"
                readonly
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="log_status">
            Log Status
            </label>
            <select
                className="shadow appearance-none border rounded w-full md:w-[40%] py-2 px-3    leading-tight focus:outline-none focus:shadow-outline" 
                id="log_status"
                name="log_status"
                value={formData.log_status}
                onChange={handleChange}
            >
            <option value="Confirmed">Confirmed</option>
            <option value="Not Confirmed">Not Confirmed</option>
            <option value="Pending">Pending</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="pro_code">   

            Pro Code
            </label>
            <select
                className="shadow appearance-none border rounded w-full md:w-[40%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"   

                id="pro_code"   
                name="pro_code"
                value={formData.pro_code}
                onChange={handleChange}
            >
            <option value="H2015">H2015</option>
            <option value="H0043">H0043</option>
            <option value="T1017">T1017</option>
            <option value="T2024">T2024</option>
            <option value="T2038">T2038</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="payor">
            Payor
            </label>
            <select
                className="shadow appearance-none border rounded w-full md:w-[40%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="payor" 
                name="payor"
                value={formData.payor}
                onChange={handleChange}
            >
            <option value="UCARE">UCARE</option>
            <option value="MA">MA</option>
            </select>
        </div>
        <div className="flex gap-8">
        <button onClick={updateBilling}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                {
                    updateLoading ? (
                        <p className="flex flex-row gap-2 items-center">
                            <Loader /> Updating...
                        </p>
                    ) : (
                        "Update Billing"
                    )
                }
            </button>
            <Button onClick={() => handleDownloadX12(billing)} className="bg-[#0b204c] rounded-md">Generate X12</Button>
            <Button onClick={goBack} className="bg-[#0b204c] rounded-md">GO BACK</Button>
        </div>
        </form> 
    </div>
  )
}

export default SingleBilling