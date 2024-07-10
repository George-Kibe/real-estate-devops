"use client"
import LoadingPage from '@/components/Loading';
import { useMainProvider } from '@/providers/MainProvider'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const PaymentSuccess = ({searchParams: {amount}}) => {
  const [loading, setLoading] = useState(false);
  const {currentUser, setCurrentUser} = useMainProvider();
  
  const handleUpdate = async() => {
    const body = {
      isPremium: true,
      isEnterprise: amount >= 199 ? true : false,
      subscriptionDate: new Date().toISOString()
    }
    console.log('Updating: ', body);
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
        console.log('Response data', data);
        setCurrentUser(data);
        toast.success("Status update Successfull. You are now a Premium Member")
        setLoading(false)
      }
    } catch (error) {
      toast.error("Error Updating, Try Again")
      setLoading(false)
    }
  }
  useEffect(() => {
    if (amount >= 99) {
      handleUpdate()
    }
  }, [amount])
  if (loading) {
    return<LoadingPage />
  }
  
  return (
    <main className='flex items-center justify-center min-h-96'>
        <div className="mb-10">
            <h1 className="text-2xl font-extrabold mb-2">Thank you for subscribing to our services</h1>
            <h2 className="text-xl font-bold">Your payment of usd: {amount} was successful</h2>
            <h2 className="text-xl font-bold">You can now access premium services</h2>
        </div>
    </main>
  )
}

export default PaymentSuccess
