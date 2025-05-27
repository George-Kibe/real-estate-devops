"use client"
import LoadingPage from '@/components/Loading'
import { useMainProvider } from '@/providers/MainProvider'
import { useParams, useRouter } from 'next/navigation'

import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AccepInvite = ({searchParams}) => {
  const {id} = useParams()
  const role = searchParams?.role
  const router = useRouter()
  const [acceptLoading, setAcceptLoading] = useState(false);
  const {currentUser, setLoading, setCurrentUser,loading} = useMainProvider()

  const updateUserDetails = async() => {
    const body = {
      role,
    }
    try {
      setLoading(true)
      const response = await fetch(`/api/auth/users/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (response.status === 200){
        const data = await response.json();
        setCurrentUser(data);
        // toast.success("Updated Successfully")
        setLoading(false)
      }
    } catch (error) {
      console.log("Error Updating, Try Again")
      setLoading(false)
    }
  }
  
  const acceptInvitation = async() => {
    if (!currentUser) {
      router.push('/login')
      return;
    }
    const body = {
      ownerId: id,
      inviteeId: currentUser?._id
    }
    setAcceptLoading(true);
    try {
      const res = await fetch('/api/accept-invite', {
        method: "POST",
        body:JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (res.status === 200) {
        toast.success("Invitation accepted")
        await updateUserDetails()
        router.push('/')
      }else {
        toast.error("Error accepting invitation")
      }
      setAcceptLoading(false);
    } catch (error) {
      console.log(error)
      setAcceptLoading(false);
    }
  }
  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className='flex flex-col items-center py-4 md:py-8 text-[#0B2B5F]'>
      <button onClick={acceptInvitation} className='border-primary border rounded-md inline-flex items-center justify-center py-3   px-7 text-center text-base font-medium  hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'>
        {
          acceptLoading ? "Accepting..." : "Accept Invite"
        }
      </button>
    </div>
  )
}

export default AccepInvite
