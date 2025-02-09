import AnimatedText from '@/components/AnimatedText';
import React from 'react'

const AboutUsPage = () => {
  return (
    <div>
      <AnimatedText text={"About Nuviane"} />
      <p className='p-4 md:px-16 text-justify'>
        Nuviane is dedicated to revolutionizing Housing Stabilization Services (HSS) through innovative technology solutions. Our platform is designed to support agencies and individuals involved in managing housing assistance programs by offering comprehensive tools for efficient task management, client interaction, and resource tracking. At Nuviane, we understand the complexities of the housing sector and aim to streamline operations through real-time communication portals, personalized apartment searches, and robust compliance features.
        </p>
        <p className='p-4 md:px-16 text-justify'>
           Our commitment lies in enhancing client satisfaction, ensuring compliance with regulatory requirements such as HCBS and HIPAA, and simplifying the process of connecting clients with essential housing resources. With Nuviane, agencies can achieve operational excellence while delivering personalized and effective housing solutions to their communities.
        </p>
    </div>
  )
}

export default AboutUsPage;
