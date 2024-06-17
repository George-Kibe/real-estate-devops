import AllProperties from '@/components/AllProperties';
import AnimatedText from '@/components/AnimatedText';
import React from 'react'

const ForSalePropertiesPage = () => {
  return (
    <div>
      <AnimatedText text={"Available For Sale Properties"} />
      <AllProperties />
    </div>
  )
}

export default ForSalePropertiesPage;
