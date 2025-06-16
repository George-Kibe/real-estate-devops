
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
import Link from "next/link";

export function UserMenu() {
  const router = useRouter();
  const admins = ["gkw@gmail.com", "abdulsimba@gmail.com", "gk@gmail.com"];
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline ml-1" size="icon">
          <ChevronDownCircleIcon className="h-8 w-8" />
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
          (!orgMode && admins.includes(currentUser?.email)) && 
          <DropdownMenuItem onClick={() => router.push("/admin")}>
            Admin Functions
          </DropdownMenuItem>
        }
        {
          orgMode && 
          <DropdownMenuItem onClick={() => router.push("/reports")}>
            {/* {currentUser?.name}'s Organization */}
            Dashboard
          </DropdownMenuItem>
        }
        {
          !orgMode && !currentUser?.isPremium &&
          <Link className="text-sm ml-2" href='/features#pricing'>
            Upgrade to Seller
          </Link>
        }
        <DropdownMenuItem onClick={() => handleLogout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}