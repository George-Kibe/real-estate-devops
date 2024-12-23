"use client"

import * as React from "react"
import { Ellipsis, DoorOpen, Fence, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// handleMarkFavorite
export function LinkActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline ml-1" size="icon">
          <Ellipsis className='animate rotate-90' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">  
        <DropdownMenuItem>
          <DoorOpen className="h-5 w-5 mr-2" />
          <a href={"https://www.housinglink.org "} target="_blank" rel="noopener noreferrer">
            <p className="">Housing Link</p>
          </a> 
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Fence className="h-5 w-5 mr-2" />
          <a href={"https://properties.commonbond.org/ourproperties"} target="_blank" rel="noopener noreferrer">
            <p className="">CommonBond Communities</p>
          </a> 
        </DropdownMenuItem>      
        <DropdownMenuItem>
          <Newspaper className="h-5 w-5 mr-2" />
          <a href={"http://resources.hud.gov/"} target="_blank" rel="noopener noreferrer">
            <p className="">Resources HUD</p>
          </a> 
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
