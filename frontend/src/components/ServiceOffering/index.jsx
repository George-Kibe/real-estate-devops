import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { features } from '../../../data/features';
import Image from 'next/image';

const ServiceOffering = () => {
  return (
    <div className='container mx-auto lg:max-w-screen-xl px-4 pt-8 pb-4'>
      <div className="w-full flex flex-col items-center justify-center h-64">
        <p className="text-green-600 text-xl">
          Our Features
        </p>
        <p className="text-xl md:text-4xl lg:text-6xl font-semibold text-center">
          What you can get from
        </p>
        <p className="text-[#45A71E] text-xl md:text-4xl lg:text-6xl font-semibold">
          Nuviane
        </p>
      </div>
      <div className="flex flex-wrap -mx-4 items-center justify-around">
        {
          features.map((feature) => (
            <SingleOffering feature={feature} />
          ))
        }
      </div>
    </div>
  )
}

export default ServiceOffering;

const SingleOffering = ({feature}) => {
  return (
    <div className="flex flex-col my-4 p-4 justify-center px-4 md:w-1/2 lg:w-1/3">
     <div className="bg-white rounded-md shadow-lg p-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <Image src={feature.icon} alt={feature.title} width={48} height={48} />
        </div>
        <p className="text-lg font-semibold mt-2 mb-2">
          {feature.feature}
        </p>
        <Link href={'/features'} className="bg-green-600 text-white px-4 py-2 rounded-full ">
          Learn More <MoveRight size={16} className='inline-block' />
        </Link>
     </div>
    </div>
  )

}