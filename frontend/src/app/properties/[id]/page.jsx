'use client'

import AnimatedText from '@/components/AnimatedText';
import DetailedProperty from '@/components/DetailedProperty';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const PropertyDetailed = () => {
  const [property, setProperty] = useState()
  const {id} = useParams()

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties/${id}`)
        const data = await res.json()
        console.log("Response Data: ", data, "Next public backend URL", process.env.NEXT_PUBLIC_BACKEND_API_URL)
        setProperty(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProperty()
  }, [id])
  if (!property) return null
  return (
    <div>
      <AnimatedText text={"Detailed Property Page"} />
      <DetailedProperty property={property} />
    </div>
  )
}

export default PropertyDetailed;
