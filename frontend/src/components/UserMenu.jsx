
"use client"

import React, {useEffect} from "react"
import { ChevronDownCircleIcon } from "lucide-react"
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMainProvider } from "@/providers/MainProvider";
import { toast } from "react-toastify";

export function UserMenu() {
  const router = useRouter();
  const {setUser,setOrgMode, currentUser,setAdminMode, setCurrentClient, setCurrentUser, setTempUser, setSellerMode, setCustomProperties, orgMode} = useMainProvider();

  useEffect(() => {
    if(currentUser?.role && currentUser?.organization){
      setOrgMode(true)
      setTempUser(currentUser)
      setCurrentUser(currentUser?.organization)
      return
    }
    if (currentUser?.isPremium && !orgMode) {
      setSellerMode(true);
    }
  }, [currentUser])

  const handleLogout = async () => {
    localStorage.clear();
    setUser(null); setOrgMode(false); setSellerMode(false); setAdminMode(false);
    setCurrentUser(null); setCustomProperties([]);
    setCurrentClient(null); setTempUser(null);
    setSellerMode(false);
    setOrgMode(false);
    setCustomProperties(null);
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
          <>
            <DropdownMenuItem onClick={() => router.push("/dashboard")}>
              {"Dashboard"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/my-account")}>
              {"My account"}
            </DropdownMenuItem>
          </>
        }
        {
          (!orgMode && currentUser.isAdmin) && 
          <DropdownMenuItem onClick={() => router.push("/admin")}>
            Admin Functions
          </DropdownMenuItem>
        }
        {
          orgMode && 
          <DropdownMenuItem onClick={() => router.push("/reports")}>
            {currentUser?.name}'s Organization
          </DropdownMenuItem>
        }
        {
          !orgMode && !currentUser?.isPremium &&
          <DropdownMenuItem onClick={switchToSeller}>
            Upgrade to Seller
          </DropdownMenuItem>
        }
        <DropdownMenuItem onClick={() => handleLogout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}