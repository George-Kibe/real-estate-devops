"use client"

import * as React from "react"
import { Ellipsis, Eye, Pencil, CheckCheck, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export function BillingActions({
  viewBilling, 
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline ml-1" size="icon">
           <Ellipsis className='animate rotate-90' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuItem onClick={viewBilling}>
          <CheckCheck className="h-5 w-5 mr-2" />
          Mark Confirmed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={viewBilling}>
          <Pencil className="h-5 w-5 mr-2" />
          Edit
        </DropdownMenuItem>
         */}
        <DropdownMenuItem onClick={viewBilling}>
          <Eye className="h-5 w-5 mr-2" />
            View In Detail
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={viewBilling}>
          <Trash className="h-5 w-5 mr-2" />
            Move to Trash
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
