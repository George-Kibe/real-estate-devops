
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
  const {currentUser,setCurrentUser, tempUser, setTempUser, orgMode, setOrgMode} = useMainProvider();
  console.log("Current User Organization: ", currentUser?.organization);
  
  const handleLogout = async () => {
    await signOut();
    localStorage.clear()
  }
  const switchToSeller = () => {
    console.log("Switching to seller")
  }
  const switchToOrganization = () => {
    setOrgMode(true)
    setTempUser(currentUser)
    setCurrentUser(currentUser?.organization)
    toast.success(`Switched to ${currentUser?.organization?.name}`)
    router.push("/my-account")
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
        <DropdownMenuItem onClick={switchToSeller}>
          Switch To Seller
        </DropdownMenuItem>
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