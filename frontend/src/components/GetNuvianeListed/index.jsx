import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const services = [
    {id: 1, image: "/pictures/activity.png", name: "Client activity Log"},
    {id: 2, image: "/pictures/progress.png", name: "Progress Notes Tracker"},
    {id: 3, image: "/pictures/ai-summary.png", name: "AI-Generated Summary Notes"},
    {id: 4, image: "/pictures/lists.png", name: "Automated Apartment Lists"}, 
    {id: 5, image: "/pictures/professional.png", name: "Professional Match Directory"},
    {id: 6, image: "/pictures/appointment.png", name: "Appointment Scheduling"},
    {id: 7, image: "/pictures/activity.png", name: "Secure Client Messaging"},
    {id: 8, image: "/pictures/progress.png", name: "Google sheets Integration"},
    {id: 9, image: "/pictures/ai-summary.png", name: "Housinng application Tracking"},
    {id: 10, image: "/pictures/lists.png", name: "Incident Report System"}, 
    {id: 11, image: "/pictures/professional.png", name: "Staff Performance Metrics"},
    {id: 12, image: "/pictures/appointment.png", name: "Supervisor Oversight Dashboard"},
    {id: 13, image: "/pictures/activity.png", name: "Service Timeline Tracker"},
    {id: 14, image: "/pictures/progress.png", name: "Document Upload and Sharing"},
    {id: 15, image: "/pictures/ai-summary.png", name: "Custom Reminder Engine"},
    {id: 16, image: "/pictures/lists.png", name: "Deposit Assistance Tracker"}, 
    {id: 17, image: "/pictures/professional.png", name: "Client Communication Logs"},
    {id: 18, image: "/pictures/appointment.png", name: "Excel export for compliance"},
    {id: 19, image: "/pictures/activity.png", name: "Intake form Automation"},
    {id: 20, image: "/pictures/progress.png", name: "Session Bases Note Integration"},
    {id: 21, image: "/pictures/ai-summary.png", name: "Real time collaboration tools"},
    {id: 22, image: "/pictures/lists.png", name: "Client Portal Access"}, 
    {id: 23, image: "/pictures/professional.png", name: "HIPAA Compliant Data Storage"},
    {id: 24, image: "/pictures/appointment.png", name: "One-click Resource Finder"},
    {id: 24, image: "/pictures/appointment.png", name: "Referral Coordination tools"},
]
const benefits = [
  {
    "id": 1,
    "image": "/pictures/brain.png",
    "title": "For Therapists, Counselors, Psychiatrists, Doctors, and Housing Professionals",
    "description": "We support a wide range of specialties — mental health, healthcare, and housing services."
  },
  {
    "id": 2,
    "image": "/pictures/calendar.png",
    "title": "Expand Your Reach",
    "description": "List your practice and connect with individuals and families seeking professional support."
  },
  {
    "id": 3,
    "image": "/pictures/folder.png",
    "title": "Showcase Your Services",
    "description": "Highlight your specialties, accepted insurances, service areas, languages, and availability."
  },
  {
    "id": 4,
    "image": "/pictures/call.png",
    "title": "Manage Your Practice Easily",
    "description": "Use our dashboard to manage appointments, client messages, and profiles with built-in tools."
  },
  {
    "id": 5,
    "image": "/pictures/people.png",
    "title": "Trusted, Secure, and HIPAA Compliant",
    "description": "We prioritize security and compliance, so you can focus on client care."
  },
  {
    "id": 6,
    "image": "/pictures/gears.png",
    "title": "Support Housing Needs through Housing Stabilization Services (HSS)",
    "description": "Help individuals without case management build a person-centered plan for stable, independent living."
  }
]

const professionals = [
  { "id": 1, "name": "Thrapists" },
  { "id": 2, "name": "Housing Case Managers" },
  { "id": 3, "name": "Vocational Rehab Experts" },
  { "id": 4, "name": "Psychiatrists & Psychologists" },
  { "id": 5, "name": "Home Health & PCA Coordinators" },
  { "id": 6, "name": "Case Managers & Social Workers" },
  { "id": 7, "name": "Chemical Dependency Cosunselors" },
  { "id": 8, "name": "Behavioral Health Providers" },
  { "id": 9, "name": "Home Health & PCA Coordinators" },
  { "id": 10, "name": "Behavioral Health Providers" },
  { "id": 11, "name": "Occupational & Physical Therapists" },
  { "id": 12, "name": "Nutritionists & Wellness Coaches" },
  { "id": 13, "name": "Peer Support & Life Coaches" }
]


export default function GetnuvianeListed() {
  return (
    <section className="w-full text-[#0B2B5F] bg-[#F1F1F1] p-4 md:p-16">
      <div className="text-[#0B2B5F] relative px-8 py-16 max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute top-[50%] left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />

        <h2 className="mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          Get Listed on Nuviane: Grow your Practice and Help More Clients get Discovered by clients looking for therapy, healthcare, and housing support services.<br />
        </h2>
        <h2 className="text-center mb-2">
          Build your presence, grow your practice, and serve your community -- all through Nuviane's trusted platform
        </h2>
      </div>
      <div className="flex justify-center">
        <Image
            src="/pictures/professionals-table.png"
            alt="Professionals Image"
            width={1000}
            height={600}
            className="w-6xl h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

        <div className="flex flex-wrap p-4 md:p-16">
        {
          benefits.map((benefit, index) => (
            <div key={benefit.id} class="w-full px-4 md:w-1/2 lg:w-1/3 gap-2">
              <div className="bg-white p-4 rounded-xl">
                <Image src={benefit.image} alt={benefit.title} width={50} height={50} />
                <h2 className="text-2xl font-bold">{benefit.title}</h2>
                <p className="text-xl mt-4">{benefit.intro}</p>
                <p className="mt-4">{benefit.description}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className="flex justify-center items-center flex-col p-2 max-xl:p-4">
        <button className="bg-[#0B2B5F] text-white rounded-2xl p-4 px-16 text-xl cursor-pointer">
            Search Providers Now
        </button>
      </div>
      <h2 className="my-4 md:my-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
        Build For These Professionals
      </h2>
      <div className="flex flex-wrap p-4 md:p-16">
        {
          professionals.map((professional, index) => (
            <div key={professional.id} class="px-4 mt-2 gap-2 ">
              <div className="bg-white p-4 rounded-full border-1 border-gray-600">
                <h2 className="text-2xl font-bold">{professional.name}</h2>
              </div>
            </div>
          ))
        }
      </div>

      <h2 className="mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
        EHR Security You can Trust with Nuviane
      </h2>
      <h2 className="text-center mb-2">
        Confidently protect client health information with Buviane enterprise-grade safeguards built into every layer of the Nuviane platform.
      </h2>
      <div className="">
        <Carousel className="w-full mt-4 md:mt-16"> {/* increase max width */}
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem key={index} className="basis-1/4"> {/* 3 items per row */}
                    <div key={service.id} class="">
                        <div className="flex flex-col items-center justify-center bg-[#FFF] p-4 rounded-xl gap-2">
                            <Image 
                            src={service.image} alt={service.title} width={80} height={80} 
                            className="rounded-xl"
                            />
                            <h3 className="text-xs lg:text-2xl font-semibold max-w-[200px]">
                                {service.name}
                            </h3>
                        </div>
                    </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
