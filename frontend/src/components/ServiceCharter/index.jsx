import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const services = [
  {
    id: 1,
    name: "Home and Community",
    image: "/images/service1.png",
    info: "Empowering individuals through in-home-support"
  },
  {
    id: 2,
    name: "Residential & Group Homes",
    image: "/images/service2.png",
    info: "Enhancing group home operations"
  },
  {
    id: 3,
    name: "Therapists",
    image: "/images/service3.png",
    info: "Simplifying Admin tasks"
  },
  {
    id: 4,
    name: "Psychiatrists",
    image: "/images/service4.png",
    info: "Tailored solutions"
  },
  {
    id: 5,
    name: "State & Local governments",
    image: "/images/service5.png",
    info: "Optimizing service delivery"
  },
]

const ServiceCharter = () => {
  return (
    <div className='container mx-auto lg:max-w-screen-xl px-4 pt-8 pb-4'>
      <div className="w-full flex flex-col items-center justify-center h-64">
        <p className="text-xl md:text-4xl lg:text-6xl font-semibold text-center">
          Who we Serve at
        </p>
        <p className="text-[#45A71E] text-xl md:text-4xl lg:text-6xl font-semibold">
          Nuviane
        </p>
      </div>
      <div className="flex flex-wrap -mx-4 items-center justify-around">
        {
          services.map((service) => (
            <ServiceComponent service={service} />
          ))
        }
      </div>
    </div>
  )
}

export default ServiceCharter

const ServiceComponent = ({service}) => {
  return (
    <div class="w-full p-4 rounded-md px-4 md:w-1/2 lg:w-1/3">
      <div class="mb-4 rounded-md bg-white cursor-pointer" data-wow-delay=".1s">
        <div class="mb-4 overflow-hidden rounded-[5px]">
          <a class="">
            <Image width={300} height={300} 
              src={service.image}
              alt="image"
              class="object-contain w-full " 
            />
          </a>
        </div>
        <div className='flex flex-col items-start p-4'>
          <h3>
            <a
              class="inline-block mb-2 text-xl font-semibold text-dark dark:text-white hover:text-primary dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
              {service.name}
            </a>
          </h3>
          <p class="max-w-[370px] text-base text-body-color dark:text-dark-6">
            {service.info || "No service info provided"}
          </p>
        </div>
        <div className="flex flex-row justify-between p-4">
          <button className="bg-[#45A71E] flex gap-2  text-white px-4 py-2 rounded-md">
            Learn More <MoveRight />
          </button>
        </div>
      </div>
    </div>
  )
}