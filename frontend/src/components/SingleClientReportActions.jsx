"use client"

import * as React from "react"
import { Ellipsis, Telescope, View } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SingleClientReportActions({
  viewReport
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline ml-1" size="icon">
          <Ellipsis className='animate rotate-90' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">        
        <DropdownMenuItem onClick={viewReport}>
          <Telescope className="h-5 w-5 mr-2" />
            View report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
