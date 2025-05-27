import { ArrowUpRight, CircleCheck } from "lucide-react";
import Image from "next/image";

export default function NuvianeBranches() {
  return (
    <section className="text-[#0B2B5F] bg-[#EEF4FE] w-full p-4 md:p-16">
      <div className="text-[#0B2B5F]relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute top-[50%] left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />
    
        <h2 className="mb-4 md:mb-8">What Nuviane Does</h2>
        <h2 className="text-5xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter max-w-[800px]">
          All-In-One Platform for Behavioral Health & Housing Providers <br />
        </h2>
      </div>

      <div className="text-[#0B2B5F]relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />        
        <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-center max-md:row-start-1 max-md:max-w-max">
            <p className="text-xl font-semibold">01</p>
            <p className="mb-4 flex text-4xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-4xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
              HSS Housing Tracking
            </p>
            <div className="gap-6 mb-4">
              <p className="mt-2">Track housing progress like never before.</p>
              <p className="mt-2">From apartment searches to subsidy application logs--organize, monitor, and document every step of your clients' housing journey in one place.</p>
            </div>
            <div className="">
              <button className=" text-xl font-semibold mr-2 flex">
              Browse All 
              <ArrowUpRight />
            </button>
            </div>
          </div>
          <figure className="max-w-2xl">
            <Image
              width={500}
              height={200}
              className="max-h-[20rem] max-md:max-w-[90%] max-md:justify-self-center rounded-full"
              src={"/pictures/girl-pen.jpg"}
              alt="Smart Organization graphic"
            />
          </figure>
        </div>

         <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <figure className="max-w-2xl">
            <Image
              width={500}
              height={200}
              className="max-h-[20rem] max-md:max-w-[90%] max-md:justify-self-center rounded-full"
              src={"/pictures/girl-tracking.png"}
              alt="Smart Organization graphic"
            />
          </figure>
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-center max-md:row-start-1 max-md:max-w-max">
            <p className="text-xl font-semibold">02</p>
            <p className="mb-4 flex text-4xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-4xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
              Smart Billing & Insurance Claims
            </p>
            <div className="gap-6 mb-4">
              <p className="mt-2">simplify claims. Get paid Faster.</p>
              <p className="mt-2">Nuviane stramlines insurance billing and submissions, automates coding, track claim status, and reduces denials with built-in compliance checks. Learn More (Connect Billing A). see Billing A Screen</p>
            </div>
            <div className="">
              <button className=" text-xl font-semibold mr-2 flex">
              Learn More 
              <ArrowUpRight />
            </button>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-center max-md:row-start-1 max-md:max-w-max">
            <p className="text-xl font-semibold">03</p>
            <p className="mb-4 flex text-4xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-4xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
              Professional Match Directory Connect Clients To The Right Care--Instantly.
            </p>
            <div className="gap-6 mb-4">
              <p className="mt-2">Search, match, and refer clients to verified professionals by speciality, avaialbility, and location with real time updates and integrated messaging.</p>
            </div>
            <div className="">
              <button className=" text-xl font-semibold mr-2 flex">
              Learn More 
              <ArrowUpRight />
            </button>
            </div>
          </div>
          <figure className="max-w-2xl">
            <Image
              width={500}
              height={200}
              className="max-h-[20rem] max-md:max-w-[90%] max-md:justify-self-center rounded-full"
              src={"/pictures/medical-tracking.webp"}
              alt="Smart Organization graphic"
            />
          </figure>
        </div>

         <div className="mb-4 grid grid-cols-2 p-4 gap-x-16 max-xl:mb-12 max-md:mb-16 max-md:grid-cols-1 max-md:gap-y-10">
          <figure className="max-w-2xl">
            <Image
              width={500}
              height={200}
              className="max-h-[20rem] max-md:max-w-[90%] max-md:justify-self-center rounded-full"
              src={"/pictures/man-tracking.jpg"}
              alt="Smart Organization graphic"
            />
          </figure>
          <div className="flex flex-col z-1 flex-1 max-w-2xl justify-center max-md:row-start-1 max-md:max-w-max">
            <p className="text-xl font-semibold">02</p>
            <p className="mb-4 flex text-4xl font-semibold tracking-tighter max-xl:mb-6 max-xl:text-4xl/10 max-lg:mb-4 max-lg:text-4xl/12 max-lg:tracking-tighter max-sm:text-2xl/8 max-sm:tracking-tight">
              Practice Management Software
            </p>
            <div className="gap-6 mb-4">
              <p className="mt-2">Powerful tools for behavioral health providers.</p>
              <p className="mt-2">Manage your entire practice--appointments, notes, client communications, tasks, reminders, and reports--all from a secure and easy-to-use platform</p>
            </div>
            <div className="">
              <button className=" text-xl font-semibold mr-2 flex">
              Learn More 
              <ArrowUpRight />
            </button>
            </div>
          </div>
        </div>

      </div>
      
    </section>
  );
}
