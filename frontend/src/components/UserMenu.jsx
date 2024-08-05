
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
  const {setUser,setOrgMode, currentUser,setAdminMode, setCurrentClient, setCurrentUser, tempUser, setTempUser, setSellerMode, setCustomProperties, orgMode} = useMainProvider();
  // console.log("Temp User: ", tempUser);
  if(currentUser?.role){
    setOrgMode(true)
    setTempUser(currentUser)
    setCurrentUser(currentUser?.organization)
  }

  if (currentUser?.isPremium) {
    setSellerMode(true);
  }

  const handleLogout = async () => {
    // await signOut();
    // localStorage.clear();
    setUser(null); setOrgMode(false); setSellerMode(false); setAdminMode(false);
    setCurrentUser(null); setCustomProperties([]);
    setCurrentClient(null); setTempUser(null);
    setSellerMode(false);
    setOrgMode(false);
    setCustomProperties(null);
    router.push("/")
  }
  const switchToNormal = () => {
    setSellerMode(false)
    toast.success('Switched back to normal')
    router.push("/")
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
    setTempUser(null)
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
        {
          !orgMode && 
          <DropdownMenuItem onClick={() => router.push("/my-account")}>
            {"My account"}
          </DropdownMenuItem>
        }
        {
          orgMode && 
          <DropdownMenuItem onClick={() => router.push("/reports")}>
            {currentUser?.name}'s Organization
          </DropdownMenuItem>
        }
        {/* {
          sellerMode &&
          <DropdownMenuItem onClick={switchToNormal}>
            Switch to Normal
          </DropdownMenuItem>        
        } */}
        {
          !orgMode && !currentUser?.isPremium &&
          <DropdownMenuItem onClick={switchToSeller}>
            Upgrade to Seller
          </DropdownMenuItem>
        }
        {/* {
          currentUser?.organization && 
          <DropdownMenuItem onClick={switchToOrganization}>
            Switch to {currentUser?.organization?.name}
          </DropdownMenuItem> 
        }
        {
          orgMode && 
          <DropdownMenuItem onClick={switchToBackToNormal}>
            Switch back to {tempUser?.name || tempUser?.firstName}
          </DropdownMenuItem> 
        } */}
        <DropdownMenuItem onClick={() => handleLogout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}