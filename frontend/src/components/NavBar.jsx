"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ModeToggle';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { UserMenu } from './UserMenu';
import LoadingPage from './Loading';
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

const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const {currentUser, setCurrentUser} = useMainProvider();
  const session = useSession();
  const email = session.data?.user?.email
  
  const fetchUser = async() => {
    try {
      const res = await fetch(`/api/auth/users?email=${email}`)
      const data = await res.json()
      setCurrentUser(data)
    } catch (error) {
      toast.error("Error Fetching user")
    }
  }
  // console.log(currentuser)
  console.log(session)

  useEffect(() => {
    console.log("Email: ", session?.data?.user?.email)
    if (!session?.data?.user?.email){
      console.log("No session, No Logged in user")
      return
    }
    fetchUser()
  }, [session?.data?.user.email])

  const pathname = usePathname()

  const handleClick = () => {
    setShowMobileNav(!showMobileNav)
  }
  const handleLogout = () => {
    // logout
    console.log('Logging out')
  }
  if (session.loading){
    return <LoadingPage />
  }
  return (    
    <nav className="darK:bg-black shadow-lg">
        <div className="mx-auto px-4 mr-8">
            <div className="flex justify-between">
                <div className="flex space-x-2 justify-between flex-1">
                    <div>
                        <Link href="#" className="flex items-center border- py-4 px-2">
                            <span className="font-semibold text-black dark:text-white text-2xl">UnLimitedRent</span>
                        </Link>
                    </div>                  
                    <div className="hidden md:flex items-center space-x-1">
                      <ModeToggle />
                      <CustomLink href={"/#"} name={"Home"} toggle={handleClick}/>
                      <CustomLink href={"/rent"} name={"For Rent"} toggle={handleClick}/>
                      <CustomLink href={"/sale"} name={"For Sale"} toggle={handleClick}/>
                      <CustomLink href={"/features"} name={"Features"} toggle={handleClick}/>
                      <CustomLink href={"/contact"} name={"Contacts"} toggle={handleClick}/>
                      {
                        session.status === 'authenticated' ? (
                          <div className="flex flex-row items-center justify-center">
                            <img src={currentUser?.image || '/images/defaultProfile.png' } alt="Profile" className="w-8 h-8 rounded-full" />
                            <UserMenu />
                          </div>
                        ) : (
                          <CustomLink href={"/login"} name={"Login"} toggle={handleClick}/>
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
                <CustomLink href={"/rent"} name={"For Rent"} toggle={handleClick}/>
                <CustomLink href={"/sale"} name={"For Sale"} toggle={handleClick}/>
                <CustomLink href={"/features"} name={"Features"} toggle={handleClick}/>
                <CustomLink href={"/contact"} name={"Contacts"} toggle={handleClick}/>
                {
                  session.status === 'authenticated' ? (
                    <button className="flex flex-row ml-2 mb-2">
                      <img src={currentUser?.image || '/images/defaultProfile.png' } alt="Profile" className="w-8 h-8 rounded-full" />
                      <UserMenu />
                    </button>
                  ) : (
                    <CustomLink href={"/login"} name={"Login"} toggle={handleClick}/>
                )}
            </div> 
         )
        }
        
    </nav>
  )
}

export default Navbar