'use client'

import AnimatedText from '@/components/AnimatedText';
import DetailedProperty from '@/components/DetailedProperty';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
  const [property, setProperty] = useState()
  const {id} = useParams()

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/properties/${id}`)
        const data = await res.json()
        console.log("Response Data: ", data)
        setProperty(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProperty()
  }, [id])
  if (!property) return null
  console.log("Property: ", property)
  return (
    <div>
      <AnimatedText text={"Detailed Property Page"} />
      <DetailedProperty property={property} />
    </div>
  )
}

export default ProfilePage;
