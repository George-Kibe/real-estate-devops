import React from 'react'
import { MoveRight} from "lucide-react"
import Link from 'next/link'

const AboutNuviane = () => {
  return (
    <div className='w-full mt-4 lg:mt-8 flex-col grid grid-cols-12 md:flex-row container mx-auto lg:max-w-screen-xl px-4'>
      <div className="flex col-span-4">
        <p className="text-xl md:text-4xl lg:text-6xl font-semibold"> About
          <p className="text-[#45A71E]">Nuviane</p>
        </p>
      </div>
      <div className="flex flex-col justify-start col-span-8">
        <p className="text-xl">
        Nuviane is dedicated to revolutionizing Housing Stabilization Services (HSS) through innovative technology solutions. Our platform is designed to support agencies and individuals involved in managing housing assistance programs by offering comprehensive tools for efficient task management, client interaction, and resource tracking. At Nuviane, we understand the complexities of the housing sector and aim to streamline operations through real-time communication portals, personalized apartment searches, and robust compliance features.
        </p>
        <div className="flex items-start w-full mt-4 md:mt-8">
          <Link href={"/about-us"} className="flex h-16 items-center justify-center">
            <div className="bg-[#45A71E] h-full w-16 rounded-full z-0"></div>
            <p className="-ml-8 flex gap-2 z-10 text-lg">Read More <MoveRight /> </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutNuviane