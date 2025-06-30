"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ModeToggle';
import { UserMenu } from './UserMenu';
import { useMainProvider  } from '@/providers/MainProvider';

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
  const { currentUser, orgMode, tempUser } = useMainProvider();

  useEffect(() => {
    if (currentUser?.orgName) {
      setOrgName(currentUser.orgName);
    }
  }, [currentUser]);
  const pathname = usePathname()
  const handleClick = () => {
    setShowMobileNav(!showMobileNav)
  }
  const profileImage = orgMode ? tempUser?.image : currentUser?.image || '/images/defaultProfile.png';
  
  return (    
    <nav className="bg-[#0B2B5F] text-white w-full ">
      <div className="mx-auto px-4 mr-8">
        <div className="flex justify-between">
          <div className="flex space-x-2 justify-between flex-1">
              <div>
                <Link href="#" className="flex items-center border- py-4 px-2">
                  <img src="/images/logo.png" alt="Logo" className="w-8 h-8 mr-2" />  
                  <span className="font-semibold text-white text-xs md:text-2xl">
                    Nuviane{orgName ? ` || ${orgName}` : ''}
                  </span>
                </Link>
              </div>                  
              <div className="hidden md:flex items-center space-x-1">
                {/* <ModeToggle /> */}
                <CustomLink href={"/#"} name={"Home"} toggle={handleClick}/>
                <CustomLink href={"/case-studies"} name={"Case Studies"} toggle={handleClick}/>
                <CustomLink href={"/about-us"} name={"About Us"} toggle={handleClick}/>
                <CustomLink href={"/features"} name={"Features"} toggle={handleClick}/>
                <CustomLink href={"/professionals"} name={"Professionals"} toggle={handleClick}/>
                <CustomLink href={"/contact"} name={"Contacts"} toggle={handleClick}/>
                {
                  currentUser ? (
                    <div className="flex flex-row items-center justify-center">
                      <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
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
            {/* <ModeToggle /> */}
            <CustomLink href={"/#"} name={"Home"} toggle={handleClick}/>
            <CustomLink href={"/case-studies"} name={"Case Studies"} toggle={handleClick}/>
            <CustomLink href={"/about-us"} name={"About Us"} toggle={handleClick}/>
            <CustomLink href={"/features"} name={"Features"} toggle={handleClick}/>
            <CustomLink href={"/professionals"} name={"Professionals"} toggle={handleClick}/>
            <CustomLink href={"/contact"} name={"Contacts"} toggle={handleClick}/>
            {
              currentUser ? (
                <button className="flex flex-row ml-2 mb-2">
                  <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
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