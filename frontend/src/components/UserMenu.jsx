
"use client"

import * as React from "react"
import { ChevronDownCircleIcon } from "lucide-react"
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
import { useMainProvider } from "@/providers/MainProvider";
import { toast } from "react-toastify";

export function UserMenu() {
  const router = useRouter();
  const {currentUser,setCurrentUser, tempUser, setTempUser, setSellerMode, sellerMode, orgMode, setOrgMode} = useMainProvider();
  // console.log("Current User Organization: ", currentUser?.organization);
  
  const handleLogout = async () => {
    // await signOut();
    localStorage.clear();
    setCurrentUser(null);
    router.push("/")
  }
  const switchToNormal = () => {
    setSellerMode(false)
    toast.success('Switched back to normal')
  }
  const switchToSeller = () => {
    // check if user has subscribed, if not prompt them to subscribe
    if (currentUser?.isPremium){
      setSellerMode(true)
      toast.success('Switched to seller Mode')
      router.push("/my-account")
    }else{
      toast.error('Please subscribe to become a seller')
      router.push("/features#subscription")
    }
  }
  const switchToOrganization = () => {
    setOrgMode(true)
    setTempUser(currentUser)
    setCurrentUser(currentUser?.organization)
    toast.success(`Switched to ${currentUser?.organization?.name}`)
    router.push("/clients")
  }
  const switchToBackToNormal = () => {
    setOrgMode(false)
    setCurrentUser(tempUser)
    toast.success(`Switched back to ${tempUser?.name}`)
    router.push("/my-account")
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline ml-1" size="icon">
          <ChevronDownCircleIcon className="h-[1.6rem] w-[1.6rem] rotate-0 scale-100 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/my-account")}>
          My Account
        </DropdownMenuItem>
        {
          sellerMode?
          <DropdownMenuItem onClick={switchToNormal}>
            Switch to Normal
          </DropdownMenuItem>
          :
          <DropdownMenuItem onClick={switchToSeller}>
            Switch to Seller
          </DropdownMenuItem>          
        }
        {
          currentUser?.organization && 
          <DropdownMenuItem onClick={switchToOrganization}>
            Switch to {currentUser?.organization?.name}
          </DropdownMenuItem> 
        }
        {
          orgMode && 
          <DropdownMenuItem onClick={switchToBackToNormal}>
            Switch back to {tempUser?.name}
          </DropdownMenuItem> 
        }
        <DropdownMenuItem onClick={() => handleLogout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}