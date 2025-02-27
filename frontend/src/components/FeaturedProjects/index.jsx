import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeaturedProjects = () => {
  return (
    <div className='container mx-auto lg:max-w-screen-xl px-4 pt-16 md:pt-24 pb-4'>
      <p className="text-[#45A71E] text-xl font-semibold">
        Featured Projects
      </p>
      <div className="flex justify-between ">
        <p className="flex gap-4 text-xl md:text-2xl lg:text-4xl font-semibold"> Properties Around
          <p className="text-[#45A71E]">Minnesota</p>
        </p>
        <Link href={"/case-studies"} className="flex h-16 items-center justify-center">
          <div className="bg-[#45A71E] h-full w-16 rounded-full z-0"></div>
          <p className="-ml-8 flex gap-2 z-10 text-lg">See All Projects <MoveRight /> </p>
        </Link>
      </div>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <PropertyCard image="/images/property1.png" />
          <PropertyCard image="/images/property2.png"  />
          <PropertyCard image="/images/property3.png" />
        </div>
      </div>
      <Marquee />
    </div>
  )
}

export default FeaturedProjects

const PropertyCard = ({image}) => (
  <div className="bg-white  shadow-lg rounded-lg max-w-lg mx-auto">
    <div className="relative h-full w-full">
      <Image
        src={image}
        alt="Background"
        //layout="fill"
        objectFit="cover"
        quality={100}
        width={400} height={400}
        priority
        className='object-cover'
      />
      <div className="inset-0 flex items-center justify-center">
      <div className="p-4 bg-white shadow-md rounded-lg -mt-24 relative">
        <p className="text-gray-700">Sold: April 2021</p>
        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <span>🏡 5 bed</span>
          <span>🛁 2 Baths</span>
          <span>🚗 2 Car</span>
        </div>
        <p className="text-gray-700">PropertyPricer Estimator</p>
        <p className="font-bold text-green-600">📊 $6.07 Million</p>
        <p className="text-gray-700">Actual Sales Price:</p>
        <p className="font-bold text-green-600">📊 $6.1 Million</p>
      </div>
      </div>
    </div>
  </div>
);

const Marquee = () => {
  return (
    <div className="mt-4 md:mt-8 w-full overflow-hidden bg-green-600  py-4">
      <div className="whitespace-nowrap flex">
        <p className="animate-marquee text-lg md:text-2xl font-semibold text-white">
          •A vision for liveable and 💰 Affordable 🏡 Homes
        </p>
      </div>
    </div>
  );
};

