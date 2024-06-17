import AllProperties from '@/components/AllProperties';
import AnimatedText from '@/components/AnimatedText';
import React from 'react'

const ForRentPropertiesPage = () => {
  return (
    <div>
      <AnimatedText text={"Available For Rent Properties"} />
      <AllProperties />
    </div>
  )
}

export default ForRentPropertiesPage;
