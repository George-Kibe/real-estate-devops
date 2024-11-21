"use client"

import axios  from 'axios';
import AnimatedText from '@/components/AnimatedText';
import { Button } from '@/components/ui/button';
import { useMainProvider } from '@/providers/MainProvider';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const SubmitBillings = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {selectedBillings, setSelectedBillings} = useMainProvider();

  const totalSelected = parseFloat(
    selectedBillings?.reduce((acc, curr) => acc + parseFloat(curr.claim_amount), 0).toFixed(2)
  );

  // function to update all billings' status to Submitted
  const updateBillings = async () => {
    setLoading(true);
    try {
      const response = await Promise.all(
        selectedBillings.map(async (billing) => {
          const response = await axios.put(
            `${BACKEND_URL}/api/billings/${billing.pkid}/`,
            { billing_status: "Submitted" }
          );
          return response.data;
        })
      );
      downloadX12();
      setSelectedBillings([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const downloadX12 = () => {
    // Start with an empty string for the file content
    let fileContent = "";
    // Iterate over the list and add each client's data with a header
    selectedBillings.forEach((data, index) => {
        fileContent += `Client ${index + 1}: ${data.client_name}\n`;
        fileContent += "----------------------------\n";
        fileContent += `${JSON.stringify(data, null, 2)}\n\n`;
    });

    // Create a blob from the combined file content
    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");

    // Use a generic filename for the combined file
    link.href = URL.createObjectURL(blob);
    link.download = "All_Combined_Claims.CLP";
    link.click();

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(link.href);
  };
  
  const saveBatch = () => {

  }
  return (
    <div className='flex flex-col gap-2 p-4 rounded-md flex-1 m-4 mt-0 items-center'>
      <AnimatedText text={"Preview Before Claim Submission"} /> 
      <div className="flex flex-col gap-2">
        {
            loading && (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-b-8 border-gray-900 ">
                </div>
            </div>
            )
        }
        <p className="text-sm">Procedure Codes: H2015</p>
        <p className="text-sm">Modifiers:</p>
        <p className="text-sm">
          Total Number of Clients Ready for submission: {selectedBillings?.length}
        </p>
        <p className="text-sm">Total Claim Amount: ${totalSelected}</p>
        
      </div>
      <div className="flex flex-col items-center">
        <Button onClick={updateBillings}>
          DOWNLOAD X12
        </Button>
        <p className="">OR</p>
        <Button onClick={saveBatch}>
          SAVE BATCH
        </Button>
      </div>
    </div>
  )
}

export default SubmitBillings