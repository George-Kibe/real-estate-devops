"use client"

import * as React from "react"
import { Calendar, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export function GraphActions({
  handleEdit, 
  handleAddProperty, 
  viewProperty, 
  handleRemoveProperty
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline ml-1" size="icon">
           <SlidersHorizontal className='animate rotate-90' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleAddProperty}>
          <Calendar className="h-5 w-5 mr-2" />
          One Week
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit}>
          <Calendar className="h-5 w-5 mr-2" />
          One Month
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={viewProperty}>
          <Calendar className="h-5 w-5 mr-2" />
            4 Months
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleRemoveProperty}>
          <Calendar className="h-5 w-5 mr-2" />
            All Time
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
