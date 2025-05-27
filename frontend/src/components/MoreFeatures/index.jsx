import { Star } from "lucide-react";
import Image from "next/image";

const services = [
    {id: 1, image: "/pictures/house1.webp",
        name: "Smart Billing",
        description: "Simplify claims. Get paid faster. Nuviane streamlines insurance billing nad submissions, automates coding, tracks claim status, and reduces denials with built in compliance checks"
    },
    {id: 2, image: "/pictures/house2.webp",
        name: "HSS Housing Tracking",
        description: "Track Housing progress like never before. From apartmnet searches to subsidy application logs--organize, monitor, and document every step of your clients' housing journey in one place."
    },
    {id: 3, image: "/pictures/house3.webp",
        name: "Professional Match Directory",
        description: "Connect clients to the right care--instantly. Search, match, and refer clients to be verified by professionals by speciality, availability, and location with real-time updates and integrated messaging"
    },
]

export default function MoreFeatures() {
  return (
    <section className="text-[#0B2B5F] p-4 md:px-16">
      <div className="text-[#0B2B5F]relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute top-[50%] left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />

        <h2 className="mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          Platform Features Everything You Need to manage Behavioral health & Housing Services--In One Place <br />
        </h2>
        <h2 className="text-center mb-4 md:mb-8">From tracking housing progress and managing clinical notes to coordinating with professionals and exporting records, Nuviane gives your team the tools to work smarter, faster and more compliantly.</h2>
      </div>
      <div className="flex flex-wrap ">
        {
          services.map((service) => (
            <div key={service.id} class="w-full px-4 md:w-1/2 lg:w-1/3">
              <SingleService service={service} />
            </div>
          ))
        }
      </div>
    </section>
  );
}

const SingleService = ({service}) => {
  return (
    <div class="mb-4 cursor-pointer" data-wow-delay=".1s">
        <div class="mb-4 overflow-hidden rounded-xl">
        <a class="">
            <Image width={300} height={300} 
            src={service.image}
            alt="image"
            class="object-contain w-full " 
            />
        </a>
        </div>
        <div className='flex flex-col items-start'>
        <h3 className="text-2xl font-semibold">
            {service.name}
        </h3>
        <p class="max-w-[500px] my-2 md:my-4 text-base text-body-color dark:text-dark-6">
            {service.description}
        </p>
        </div>
        <div className="flex items-center p-2 max-xl:p-4">
            <button className="bg-[#0B2B5F] text-white rounded-2xl p-3 px-16 text-xl cursor-pointer">
            Free Trial
            </button>
        </div>
    </div>
   
  )
}