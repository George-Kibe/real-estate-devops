import AnimatedText from '@/components/AnimatedText';
import { Solutions } from '@/components/Solutions';
import React from 'react'

const AboutUsPage = () => {
  return (
    <div className='text-[#0B2B5F] p-2 md:p-8 xl:p-16'>
      <AnimatedText text={"About Nuviane"} />
      <p className='text-justify'>
        Nuviane is dedicated to revolutionizing Housing Stabilization Services (HSS) through innovative technology solutions. Our platform is designed to support agencies and individuals involved in managing housing assistance programs by offering comprehensive tools for efficient task management, client interaction, and resource tracking. At Nuviane, we understand the complexities of the housing sector and aim to streamline operations through real-time communication portals, personalized apartment searches, and robust compliance features.
        </p>
        <p className='text-justify'>
           Our commitment lies in enhancing client satisfaction, ensuring compliance with regulatory requirements such as HCBS and HIPAA, and simplifying the process of connecting clients with essential housing resources. With Nuviane, agencies can achieve operational excellence while delivering personalized and effective housing solutions to their communities.
        </p>
      
      <AnimatedText text="Nuviane Solutions" className="" />
      <Solutions />
    </div>
  )
}

export default AboutUsPage;
