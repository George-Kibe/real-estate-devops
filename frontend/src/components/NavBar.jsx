"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ModeToggle';
import { UserMenu } from './UserMenu';
import { useMainProvider } from '@/providers/MainProvider';

const CustomLink = ({href,name, items, toggle}) => {
  const pathname = usePathname();
  const inActiveLink = "relative py-2 px-2 font-semibold hover:text-green-500 transition duration-300"
  const activeLink = "relative py-2 px-2 text-green-400 font-semibold"
  const router = useRouter();
  const handleClick = () => {
    toggle()
    router.push(href)
  }
  return(
    <button onClick={handleClick} href={href} className={pathname === href? activeLink : inActiveLink}>
     <p className="ml-2 text-start">{name}</p>
      {items > 0 && <div className="absolute top-0 left-16 px-2 text-emerald-600 rounded-full bg-white">{items}</div> }
    </button>
  )
}

const NavBar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [orgName, setOrgName] = useState('');
  const { currentUser } = useMainProvider();

  useEffect(() => {
    if (currentUser?.orgName) {
      setOrgName(currentUser.orgName);
    }
  }, [currentUser]);
  const pathname = usePathname()
  const handleClick = () => {
    setShowMobileNav(!showMobileNav)
  }
  return (    
    <nav className="darK:bg-black shadow-lg">
      <div className="mx-auto px-4 mr-8">
        <div className="flex justify-between">
          <div className="flex space-x-2 justify-between flex-1">
              <div>
                <Link href="#" className="flex items-center border- py-4 px-2">
                  <svg width="32" height="32" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="border-r-2 mr-1 border-r-[#45A71E]">
                    <path d="M18.4989 7.28071C18.3936 7.17999 18.2535 7.12377 18.1078 7.12377C17.9621 7.12377 17.822 7.17999 17.7167 7.28071L4.69634 19.719C4.64105 19.7719 4.59705 19.8355 4.56703 19.9059C4.537 19.9763 4.52157 20.052 4.52165 20.1285L4.51953 31.8023C4.51953 32.4025 4.75797 32.9782 5.1824 33.4026C5.60683 33.8271 6.18248 34.0655 6.78272 34.0655H13.5793C13.8795 34.0655 14.1673 33.9463 14.3795 33.7341C14.5917 33.5218 14.7109 33.234 14.7109 32.9339V23.3154C14.7109 23.1653 14.7705 23.0214 14.8766 22.9153C14.9828 22.8092 15.1267 22.7496 15.2767 22.7496H20.9347C21.0847 22.7496 21.2287 22.8092 21.3348 22.9153C21.4409 23.0214 21.5005 23.1653 21.5005 23.3154V32.9339C21.5005 33.234 21.6197 33.5218 21.8319 33.7341C22.0441 33.9463 22.332 34.0655 22.6321 34.0655H29.4259C30.0261 34.0655 30.6018 33.8271 31.0262 33.4026C31.4506 32.9782 31.6891 32.4025 31.6891 31.8023V20.1285C31.6891 20.052 31.6737 19.9763 31.6437 19.9059C31.6137 19.8355 31.5697 19.7719 31.5144 19.719L18.4989 7.28071Z" fill="#45A71E"/>
                    <path d="M34.7187 17.3852L29.4285 12.3241V4.64415C29.4285 4.34404 29.3092 4.05621 29.097 3.844C28.8848 3.63178 28.597 3.51256 28.2969 3.51256H24.9021C24.602 3.51256 24.3142 3.63178 24.1019 3.844C23.8897 4.05621 23.7705 4.34404 23.7705 4.64415V6.90734L19.6741 2.99062C19.2908 2.60304 18.7208 2.38097 18.1048 2.38097C17.4909 2.38097 16.9223 2.60305 16.5389 2.99132L1.49582 17.3838C1.05592 17.8081 1.00075 18.5062 1.40105 18.9659C1.50158 19.0819 1.62466 19.1763 1.76281 19.2432C1.90096 19.3102 2.05129 19.3483 2.20465 19.3554C2.35802 19.3624 2.5112 19.3381 2.65489 19.284C2.79857 19.23 2.92976 19.1472 3.04045 19.0408L17.7158 5.01758C17.8211 4.91685 17.9612 4.86064 18.1069 4.86064C18.2526 4.86064 18.3927 4.91685 18.498 5.01758L33.1747 19.0408C33.3909 19.2482 33.6805 19.3613 33.98 19.3555C34.2795 19.3496 34.5644 19.2253 34.7724 19.0097C35.2067 18.5599 35.1706 17.8173 34.7187 17.3852Z" fill="#45A71E"/>
                  </svg>
                  <span className="font-semibold text-black dark:text-white text-xs md:text-2xl">
                    Nuviane{orgName ? ` || ${orgName}` : ''}
                  </span>
                </Link>
              </div>                  
              <div className="hidden md:flex items-center space-x-1">
                <ModeToggle />
                <CustomLink href={"/#"} name={"Home"} toggle={handleClick}/>
                <CustomLink href={"/case-studies"} name={"Case Studies"} toggle={handleClick}/>
                <CustomLink href={"/about-us"} name={"About Us"} toggle={handleClick}/>
                <CustomLink href={"/features"} name={"Features"} toggle={handleClick}/>
                <CustomLink href={"/professionals"} name={"Professionals"} toggle={handleClick}/>
                <CustomLink href={"/contact"} name={"Contacts"} toggle={handleClick}/>
                {
                  currentUser ? (
                    <div className="flex flex-row items-center justify-center">
                      <img src={currentUser?.image || '/images/defaultProfile.png' } alt="Profile" className="w-8 h-8 rounded-full" />
                      <UserMenu />
                    </div>
                  ) : (
                    <CustomLink href={"/login"} name={"Sign In"} toggle={handleClick}/>
                  )}
              </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={handleClick} className="outline-none">
              <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {
        showMobileNav && (
          <div className="md:hidden flex flex-col">
            <ModeToggle />
            <CustomLink href={"/#"} name={"Home"} toggle={handleClick}/>
            <CustomLink href={"/case-studies"} name={"Case Studies"} toggle={handleClick}/>
            <CustomLink href={"/about-us"} name={"About Us"} toggle={handleClick}/>
            <CustomLink href={"/features"} name={"Features"} toggle={handleClick}/>
            <CustomLink href={"/professionals"} name={"Professionals"} toggle={handleClick}/>
            <CustomLink href={"/contact"} name={"Contacts"} toggle={handleClick}/>
            {
              currentUser ? (
                <button className="flex flex-row ml-2 mb-2">
                  <img src={currentUser?.image || '/images/defaultProfile.png' } alt="Profile" className="w-8 h-8 rounded-full" />
                  <UserMenu />
                </button>
              ) : (
                <CustomLink href={"/login"} name={"Sign In"} toggle={handleClick}/>
            )}
          </div> 
        )
      }
        
    </nav>
  )
}

export default NavBar