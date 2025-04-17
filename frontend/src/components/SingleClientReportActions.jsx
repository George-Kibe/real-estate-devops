"use client"

import * as React from "react"
import { Ellipsis, Eye, CirclePlus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SingleClientReportActions({
  viewReport,
  handleDelete,
  showGenerateBilling,
  generateBilling
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
          <Eye className="h-5 w-5 mr-2" />
            View report
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash2 className="h-5 w-5 mr-2" />
            Delete Report
        </DropdownMenuItem>
        {/* {
          showGenerateBilling && (
            <DropdownMenuItem onClick={generateBilling}>
              <CirclePlus className="h-5 w-5 mr-2" />
                Generate Billing
            </DropdownMenuItem>
          )
        } */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
