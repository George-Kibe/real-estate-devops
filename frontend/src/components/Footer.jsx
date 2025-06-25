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
                 <svg width="32" height="32" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="">
                    <path d="M18.4989 7.28071C18.3936 7.17999 18.2535 7.12377 18.1078 7.12377C17.9621 7.12377 17.822 7.17999 17.7167 7.28071L4.69634 19.719C4.64105 19.7719 4.59705 19.8355 4.56703 19.9059C4.537 19.9763 4.52157 20.052 4.52165 20.1285L4.51953 31.8023C4.51953 32.4025 4.75797 32.9782 5.1824 33.4026C5.60683 33.8271 6.18248 34.0655 6.78272 34.0655H13.5793C13.8795 34.0655 14.1673 33.9463 14.3795 33.7341C14.5917 33.5218 14.7109 33.234 14.7109 32.9339V23.3154C14.7109 23.1653 14.7705 23.0214 14.8766 22.9153C14.9828 22.8092 15.1267 22.7496 15.2767 22.7496H20.9347C21.0847 22.7496 21.2287 22.8092 21.3348 22.9153C21.4409 23.0214 21.5005 23.1653 21.5005 23.3154V32.9339C21.5005 33.234 21.6197 33.5218 21.8319 33.7341C22.0441 33.9463 22.332 34.0655 22.6321 34.0655H29.4259C30.0261 34.0655 30.6018 33.8271 31.0262 33.4026C31.4506 32.9782 31.6891 32.4025 31.6891 31.8023V20.1285C31.6891 20.052 31.6737 19.9763 31.6437 19.9059C31.6137 19.8355 31.5697 19.7719 31.5144 19.719L18.4989 7.28071Z" fill="#45A71E"/>
                    <path d="M34.7187 17.3852L29.4285 12.3241V4.64415C29.4285 4.34404 29.3092 4.05621 29.097 3.844C28.8848 3.63178 28.597 3.51256 28.2969 3.51256H24.9021C24.602 3.51256 24.3142 3.63178 24.1019 3.844C23.8897 4.05621 23.7705 4.34404 23.7705 4.64415V6.90734L19.6741 2.99062C19.2908 2.60304 18.7208 2.38097 18.1048 2.38097C17.4909 2.38097 16.9223 2.60305 16.5389 2.99132L1.49582 17.3838C1.05592 17.8081 1.00075 18.5062 1.40105 18.9659C1.50158 19.0819 1.62466 19.1763 1.76281 19.2432C1.90096 19.3102 2.05129 19.3483 2.20465 19.3554C2.35802 19.3624 2.5112 19.3381 2.65489 19.284C2.79857 19.23 2.92976 19.1472 3.04045 19.0408L17.7158 5.01758C17.8211 4.91685 17.9612 4.86064 18.1069 4.86064C18.2526 4.86064 18.3927 4.91685 18.498 5.01758L33.1747 19.0408C33.3909 19.2482 33.6805 19.3613 33.98 19.3555C34.2795 19.3496 34.5644 19.2253 34.7724 19.0097C35.2067 18.5599 35.1706 17.8173 34.7187 17.3852Z" fill="#45A71E"/>
                  </svg>
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
