"use client"

import AnimatedText from '@/components/AnimatedText'
import LoadingPage from '@/components/Loading'
import { useMainProvider } from '@/providers/MainProvider'
import { useParams, useRouter } from 'next/navigation'

import React from 'react'
import { toast } from 'react-toastify'

const AccepInvite = () => {
  const {id} = useParams()
  const router = useRouter()
  const {currentUser, loading} = useMainProvider()
  console.log("Current User: ", currentUser?._id)
  
  const acceptInvitation = async() => {
    if (!currentUser) {
      router.push('/login')
      return;
    }
    const body = {
      ownerId: id,
      inviteeId: currentUser?._id
    }
    try {
      const res = await fetch('/api/accept-invite', {
        method: "POST",
        body:JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (res.status === 200) {
        router.push('/')
      }else {
        toast.error("Error accepting invitation")
        console.log("Error accepting invitation")
      }
    } catch (error) {
      console.log(error)
    }
  }
  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className='flex flex-col items-center py-4 md:py-8'>
      {/* <AnimatedText text={"Accept Invite"} /> */}
      <button onClick={acceptInvitation} className='border-primary border rounded-md inline-flex items-center justify-center py-3   px-7 text-center text-base font-medium  hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'>
        {"Accept Invite"}
      </button>
      {/* <p className="">{id}</p> */}
    </div>
  )
}

export default AccepInvite
