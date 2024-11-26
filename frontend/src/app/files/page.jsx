"use client";

import AnimatedText from '@/components/AnimatedText'
import { Button } from '@/components/ui/button'
import { handleFileUpload } from '@/utils/google-cloud'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const FileUploadsTest = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }
  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a file")
      return;
    }
    setUploadLoading(true);
    try {
      const fileUrl = await handleFileUpload(file);
      setImage(fileUrl)
    } catch (error){
      toast.error("Error uploading file")
    } finally {
      setUploadLoading(false);
    }
  }

  return (
    <div className='flex gap-4 items-center flex-col'>
      <div>
        <AnimatedText text={"File Uploads Using Signed Urls"} />
      </div>
      {
        image && (
          <div className="">
            <img src={image} alt="" className='w-96 h-96 object-cover' />
          </div>
        )
      }
      <div>
        <input type="file" onChange={handleFileChange} />
        <Button onClick={uploadFile}>
          {uploadLoading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  )
}

export default FileUploadsTest
