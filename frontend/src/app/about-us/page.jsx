import AnimatedText from '@/components/AnimatedText';
import React from 'react'

const AboutUsPage = () => {
  return (
    <div>
      <AnimatedText text={"About AptTracking"} />
      <p className='p-4 md:p-16 text-justify'>
        AptTrack is dedicated to revolutionizing Housing Stabilization Services (HSS) through innovative technology solutions. Our platform is designed to support agencies and individuals involved in managing housing assistance programs by offering comprehensive tools for efficient task management, client interaction, and resource tracking. At AptTrack, we understand the complexities of the housing sector and aim to streamline operations through real-time communication portals, personalized apartment searches, and robust compliance features.
        </p>
        <p className='p-4 md:p-16 text-justify -mt-16'>
           Our commitment lies in enhancing client satisfaction, ensuring compliance with regulatory requirements such as HCBS and HIPAA, and simplifying the process of connecting clients with essential housing resources. With AptTrack, agencies can achieve operational excellence while delivering personalized and effective housing solutions to their communities.
        </p>
    </div>
  )
}

export default AboutUsPage;
