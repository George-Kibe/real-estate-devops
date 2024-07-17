"use client"
import AnimatedText from '@/components/AnimatedText';
import DetailedProperty from '@/components/DetailedProperty';
import { useMainProvider } from '@/providers/MainProvider';
import React from 'react'

const PropertyDetailed = () => {
  const {tempProperty} = useMainProvider();
  console.log("Temp Property: ", tempProperty)

  if (!tempProperty?.title) {
    return <div className='px-16 p-8'>No Property </div>;
  } 
  else{
    return (
      <div>
        <AnimatedText text={"Detailed Property Page"} />
        <DetailedProperty property={tempProperty} />
      </div>
    )
  }
}

export default PropertyDetailed;
