import Image from 'next/image';
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { ChevronDown } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';

const faqs = [
    {
        id: 1,
        question: "What is Nuviane?",
        answer: "Nuviane is a comprehensive platform designed to streamline housing stabilization services, behavioral health management, and care coordination. It connects clients with professionals, tracks housing progress, and simplifies insurance billing."

    },
    {
        id: 2,
        question: "How does Nuviane help with compliance?",
        answer: " Nuviane helps with compliance by providing a secure, HIPAA-compliant platform that ensures all client data is handled according to privacy regulations. It also automates documentation and reporting processes, reducing the risk of errors and ensuring that all necessary information is readily available for audits."
    },
    {
        id: 3,
        question: "How does Nuviane eliminate repetitive housing searches?",
        answer: " Nuviane eliminates repetitive housing searches by providing a centralized platform where clients can find available apartments based on their specific needs and preferences. It aggregates listings from various sources, ensuring that clients have access to the most relevant options without having to search multiple websites or platforms."
    },
    {
        id: 4,
        question: "Can I export data and logs to Excel",
        answer: "Nuviane allows users to export data and logs to Excel, making it easy to generate reports, analyze data, and share information with stakeholders. This feature ensures that all necessary documentation is readily available for audits and compliance checks."
    },
    {
        id: 5,
        question: "Does Nuviane kepp all communication in one place?",
        answer: " Yes, Nuviane keeps all communication in one place by providing a centralized messaging system. This allows team members to communicate with clients, landlords, and other professionals without switching between different platforms. It ensures that all interactions are documented and easily accessible."
    },
    {
        id: 6,
        question: "How are incident reports tracked?",
        answer: " Nuviane tracks incident reports by allowing users to log incidents, document details, and assign follow-up actions. It provides a centralized location for all incident-related information, ensuring compliance and accountability."
    },
    {
        id: 7,
        question: "How does Nuviane track housing applications?",
        answer: " Nuviane tracks housing applications by allowing users to log each step of the application process, including submission dates, follow-ups, and outcomes. It provides reminders for deadlines and ensures that all necessary documentation is in place."
    },
    {
        id: 8,
        question: "Can I assign tasks and track progress for each client?",
        answer: " Yes, Nuviane allows you to assign tasks to team members and track the progress of each client. You can set deadlines, monitor task completion, and ensure that all necessary actions are taken to support clients effectively."
    },
    {
        id: 9,
        question: "What kind of housing search does Nuviane offer?",
        answer: " Nuviane provides a comprehensive housing search feature that allows clients to find available apartments based on their location, budget, and specific needs. It aggregates listings from various sources to ensure a wide range of options."
    },
    {
        id: 10,
        question: "Can I filter clients by housing progress or needs?",
        answer: " Yes, Nuviane allows you to filter clients based on their housing progress, needs, and other criteria. This helps in managing caseloads effectively and ensuring that clients receive the appropriate support."
    },
    {
        id: 11,
        question: "How the AI housing note feature work?",
        answer: " Nuviane's AI housing note feature automatically generates detailed notes based on the client's housing progress, including updates on applications, communications with landlords, and any issues encountered. This helps ensure accurate documentation and compliance with reporting requirements."
    },
    {
        id: 12,
        question: "How does Nuviane find apartments based on location?",
        answer: " Nuviane uses advanced algorithms to search for available apartments based on the client's specified location, budget, and other preferences. It aggregates listings from various sources to provide a comprehensive view of options."
    },
    {
        id: 13,
        question: "Is Nuviane HIPAA compliant?",
        answer: "Yes, Nuviane is designed to be HIPAA compliant, ensuring that all client data is handled securely and in accordance with privacy regulations."
    },
    {
        id: 14,
        question: "How does the free trial work?",
        answer: " Nuviane offers a free trial period during which you can explore all features of the platform. After the trial, you can choose a subscription plan that suits your needs."
    },
    {
        id: 15,
        question: "Can I customize features for my team?",
        answer: " Yes, Nuviane allows customization of features to fit the specific needs of your team and clients. You can tailor workflows, reports, and communication preferences."
    }

]
const housingData = [
    {
        id: 1,
        image: "/pictures/house3.webp",
        title: "Find the Right Support: Switch or Choose a New Housing, HSS, or Care Professional Today",
        description1: "Not satisfied with your current agency, housing consultant, therapist, or doctor? Discover a new professional who understands your needs and supports your goals. Easily find trusted providers specializing in:",
        description2: "Take control of your journey toward better care, stability, and independence Take control of your journey toward better care, stability, and independence."
    },
    {
        id: 2,
        image: "/pictures/laptop.webp",
        title: "Find the Right Support for Your Journey",
        description1: "Connect with expert Housing Stabilization Services (HSS) providers, therapists, doctors, and more — all ready to help you build a brighter, more independent future.",
        description2: "At Nuviane, you have the power to choose the right professional for your needs.Not satisfied with your current provider? Find a new agency or professional today — take control of your care and housing journey."
    },

]
const NewHousing = () => {
  return (
    <section className="text-[#0B2B5F] bg-[#EEF4FE] w-full p-2">
      <div className="text-[#0B2B5F]relative px-8  max-xl:px-4 max-xl:py-4 max-lg:px-8 max-md:px-6">
        <div className="bg-primary-1300 absolute top-[50%] left-[100%] h-[62.5rem] w-[62.5rem] -translate-[50%] rounded-full opacity-100 blur-[40rem] max-xl:h-[35rem] max-xl:w-[35rem] max-xl:blur-[10rem] max-lg:left-[90%] max-lg:h-[20rem] max-lg:w-[20rem]" />
        <h2 className="mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          Choose A New Housing
        </h2>
      </div>
      <div className="flex flex-wrap p-4 md:px-16 items-center justify-center">
        {
          housingData.map((houseData) => (
            <div key={houseData.id} class="w-full px-4 md:w-1/2 max-w-2xl">
              <SingleHouseOption houseData={houseData} />
            </div>
          ))
        }
      </div>
      <h2 className="mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16 max-lg:text-4xl/10 max-lg:tracking-tight max-sm:text-3xl/9 max-sm:tracking-tighter">
          Frequently Asked Questions
        </h2>
      <div className="p-4 md:px-16 xl:px-64">
        <Accordion>
            {faqs.map((faq, index) => (
                <AccordionItem
                value={faq.question}
                key={faq.question}
                className="md:text-xl"
                >
                <AccordionTrigger
                    className="md:text-xl border border-gray-300 p-4 my-2 flex relative "
                >
                    <span>
                    {index + 1}. {faq.question}
                    </span>
                    {/* <FaPlus className='absolute right-2' /> */}
                </AccordionTrigger>
                <AccordionContent className="md:text-xl">
                    {faq.answer}
                </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  )
}

export default NewHousing;


const SingleHouseOption = ({houseData}) => {
  return (
    <div class="mb-4 cursor-pointer" data-wow-delay=".1s">
      <div class="mb-4 overflow-hidden rounded-xl">
      <a class="">
          <Image width={500} height={300} 
          src={houseData.image}
          alt="image"
          class="object-cover" 
          />
      </a>
      </div>
      <div className='flex flex-col items-start'>
      <h3 className="text-2xl font-semibold">
          {houseData.title}
      </h3>
      <p class="max-w-[500px] my-2 md:my-4 text-base text-[#004434] dark:text-dark-6">
          {houseData.description1}
      </p>
       <p class="max-w-[500px] my-2 md:my-4 text-base text-[#004434] dark:text-dark-6">
          {houseData.description2}
      </p>
      </div>
    </div>
  )
}