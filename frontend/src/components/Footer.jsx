import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const platformLinks = [
  {id: 1, name: "Housing Stabalization Management", href: "/" },
  {id: 2, name: "Staff Performacne Tracking", href: "/" },
  {id: 3, name: "AI Resource Assistant", href: "/" },
  {id: 4, name: "EDI Billing and Claim", href: "/" },
  {id: 5, name: "Task Documentation Tools", href: "/" },
]
const solutionLinks = [
  {id: 1, name: "Housing Stabilization Agencies", href: "/" },
  {id: 2, name: "Home Health Providers", href: "/" },
  {id: 3, name: "Private Duty Nursing Teams", href: "/" },
  {id: 4, name: "Adult Day and community services", href: "/" },
  {id: 5, name: "Group Home and Residential Programs", href: "/" },
  {id: 6, name: "Interpreting & Translation Providers", href: "/" },
  {id: 7, name: "Billing and back office Partners", href: "/" },
  {id: 8, name: "Mental and behavioral Health clinics", href: "/" },
  {id: 9, name: "County & state Human Services", href: "/" },
]
const resourcesLinks = [
  {id: 1, name: "EVV and Billing Tools", href: "/" },
  {id: 2, name: "Compliance and Audit Guides", href: "/" },
  {id: 3, name: "Housing Search Toolkit", href: "/" },
  {id: 4, name: "Webinars and Trainings", href: "/" },
  {id: 5, name: "Industry Blog", href: "/" },
]

const agencyLinks = [
  {id: 1, name: "Access Agency Portal", href: "/dashboard" },
  {id: 2, name: "Join a telehealth Session", href: "/" },    
  {id: 3, name: "Find a Provider", href: "/" },
  {id: 4, name: "Agency Resources", href: "/" },
  {id: 5, name: "Rights and Support Info", href: "/" },
]

const clientLinks = [
  {id: 1, name: "Access Client Portal", href: "/dashboard" },
  {id: 2, name: "Join a telehealth Session", href: "/" },    
  {id: 3, name: "Find a Provider", href: "/" },
  {id: 4, name: "Client Resources", href: "/" },
  {id: 5, name: "Rights and Support Info", href: "/" },
  {id: 6, name: "Contact Support", href: "/" },
]
const professionalLinks = [
  {id: 1, name: "Launch a House Stabalization Practice", href: "/" },
  {id: 2, name: "Tools for Health and Mental Health Professionals", href: "/" }, 
  {id: 3, name: "Solo and Group Startup Support", href: "/" },
  {id: 4, name: "Training, Licensing, and Billing Help", href: "/" },
  {id: 5, name: "Get Listed on Nuviane Network", href: "/" },
  {id: 6, name: "Scale your Practice with Automation", href: "/" },
]
const companyLinks = [
  {id: 1, name: "About Nuviane", href: "/about-us" },
  {id: 2, name: "Careers", href: "/careers" },
  {id: 3, name: "Partner With Us", href: "/partners" },
  {id: 4, name: "News & Insights", href: "/blog" },    
  {id: 5, name: "Refer A Colleague", href: "/refer" },
]

const supportLInks = [
  {id: 1, name: "Help Center", href: "/contact-us" },
  {id: 2, name: "Request a Demo", href: "/contact-us" },
  {id: 3, name: "FAQs", href: "/faqs" },
  {id: 4, name: "Chat With Sales", href: "/contact-us" },
]

const Footer = () => {
  return (
    <footer
      className="px-4 md:px-8 lg:px-16 bg-[#0B2B5F] relative pt-20 lg:pt-[100px] w-full"
      data-wow-delay=".15s"
    >
      <div className="">
        <div className="flex flex-wrap">
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <Link
                href="/"
                className="flex mb-6 gap-2 max-w-[160px]"
              >
                <img src="/images/logo.png" alt="Logo" className="w-8 h-8 mr-2" />  
                <p className="font-bold text-2xl">Nuviane</p>
              </Link>
              <p className="mb-4 max-w-xs text-2xl">
                Housing and Health solutions for Modern Care
              </p>
               <p className="mb-8 max-w-xs text-base">
                Empowering HSS agencies and healthcare professionals to streamline services, stay compliant, and other life-changing support -- all from one powerful platform.
              </p>
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="mb-10 w-full flex flex-col">
              <h4 className="mb-4 text-2xl font-bold">Platform</h4>
              {
                platformLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="mb-3 inline-block text-base hover:text-green-600"
                  >
                    {link.name}
                  </Link>
                ))
              }
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="mb-10 w-full">
              <h4 className="mb-4 text-2xl font-bold">Solutions</h4>
              {
                solutionLinks.slice(0,5).map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="mb-3 inline-block text-base hover:text-green-600"
                  >
                    {link.name}
                  </Link>
                ))
              }
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="md:mt-8  mb-10 w-full flex flex-col">
              {
                solutionLinks.slice(5,9).map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="mb-3 inline-block text-base hover:text-green-600"
                  >
                    {link.name}
                  </Link>
                ))
              }
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="mb-10 w-full flex flex-col">
              <h4 className="mb-4 text-2xl font-bold">Resources</h4>
              {
                resourcesLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="mb-3 inline-block text-base hover:text-green-600"
                  >
                    {link.name}
                  </Link>
                ))
              }
            </div>
          </div>
          
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="mb-10 w-full flex flex-col">
              <h4 className="mb-4 text-2xl font-bold">For Agencies</h4>
              {
                agencyLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="mb-3 inline-block text-base hover:text-green-600"
                  >
                    {link.name}
                  </Link>
                ))
              }
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="mb-10 w-full flex flex-col">
              <h4 className="mb-4 text-2xl font-bold">For Clients</h4>
              {
                clientLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="mb-3 inline-block text-base hover:text-green-600"
                  >
                    {link.name}
                  </Link>
                ))
              }
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="mb-10 w-full flex flex-col">
              <h4 className="mb-4 text-2xl font-bold">For Professionals</h4>
              {
                professionalLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="mb-3 inline-block text-base hover:text-green-600"
                  >
                    {link.name}
                  </Link>
                ))
              }
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="mb-10 w-full flex flex-col">
              <h4 className="mb-4 text-2xl font-bold">Company</h4>
              {
                companyLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="mb-3 inline-block text-base hover:text-green-600"
                  >
                    {link.name}
                  </Link>
                ))
              }
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="mb-10 w-full flex flex-col">
              <h4 className="mb-4 text-2xl font-bold">Support</h4>
              {
                supportLInks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="mb-3 inline-block text-base hover:text-green-600"
                  >
                    {link.name}
                  </Link>
                ))
              }
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="mb-10 w-full">
              <h4 className="mb-4 text-2xl font-bold">Office</h4>
              <div className="flex items-center mb-2">
                <div className="">
                  <MapPin className="text-white w-6 h-6 mr-1" />
                </div>
                <p className="">
                  Nuviane Technologies <br />
                  8500 Normandale Lake Blvd,<br />
                  #350, Bloomington, MN, 55437 <br />
                </p>
              </div>
              <div className="flex items-center mb-2">
                <div className="">
                  <Phone className="text-white w-6 h-6 mr-1" />
                </div>
                <p className="">
                  (651) 417-1699 <br />
                </p>
              </div>
              <div className="flex items-center mb-2">
                <div className="">
                  <Mail className="text-white w-6 h-6 mr-1" />
                </div>
                <p className="">
                  support@nuviane.com |<br />
                  sales@nuviane.com
                </p>
              </div>
            </div>
          </div>

           <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/3 xl:w-1/4">
            <div className="mb-10 w-full">
              <h4 className="mb-4 text-2xl font-bold">Connect With Us</h4>
              <Link href={"/"} className="flex items-center mb-2">
                <div className="">
                  <Linkedin className="text-white w-6 h-6 mr-2" />
                </div>
                <p className="">
                  LinkedIn
                </p>
              </Link>
              <Link href={"/"} className="flex items-center mb-2">
                <div className="">
                  <Facebook className="text-white w-6 h-6 mr-2" />
                </div>
                <p className="">
                  Facebook
                </p>
              </Link>
              <Link href={"/"} className="flex items-center mb-2">
                <div className="">
                  <Instagram className="text-white w-6 h-6 mr-2" />
                </div>
                <p className="">
                  Instagram
                </p>
              </Link>
              <Link href={"/"} className="flex items-center mb-2">
                <div className="">
                  <Youtube className="text-white w-6 h-6 mr-2" />
                </div>
                <p className="">
                  Youtube
                </p>
              </Link>
            </div>
          </div>


        </div>
      </div>

      <div className="mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]"
      >
        <div className="container">
          <div className="w-full flex flex-col  gap-2 items-center justify-center">
            <div className="w-full px-4 md:w-2/3 lg:w-1/2 items-center justify-center gap-2">
              <div className="">
                <p className="text-base mb-2">
                  © {new Date().getFullYear()} Nuviane Technologies. All rights reserved.
                </p>
              </div>
              <div className="my-1">
                <div className="flex items-center justify-center md:justify-start mb-2" >
                  <a href="/privacy-policy" className="px-3 text-base hover:underline">
                    Privacy Policy
                  </a>
                  <a href="/terms-and-conditions" className="px-3 text-base hover:underline">
                  | Terms of use | Accesibility Statement
                  </a>
                </div>
                <p className="">Whether you're starting out or scaling up -- NUVIANE supports your mission-driven practice</p>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/3 lg:w-1/2">
              <div className="my-1 flex ">
                <p className="text-base">
                  Developed by 
                  <a
                    href="https://www.realhiveconsultants.com/"
                    rel="nofollow noopner"
                    target="_blank"
                    className="text-gray-1 hover:underline"
                  >
                    &nbsp;Realhive Consultants
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
