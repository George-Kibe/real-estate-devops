"use client"

import * as React from "react"
import { Ellipsis, Eye, Pencil, Share2, Trash, DiamondPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "react-toastify";

export function PropertyActions({handleEdit, handleAddProperty, isNew, viewProperty, handleShareProperty, handleRemoveProperty}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline ml-1" size="icon">
           <Ellipsis className='animate rotate-90' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {
          isNew? (
          <DropdownMenuItem onClick={handleAddProperty}>
            <DiamondPlus className="h-5 w-5 mr-4" />
            Add
          </DropdownMenuItem>)
           :
          (
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="h-5 w-5 mr-2" />
            Edit Details
          </DropdownMenuItem>
          )
          
        }
        
        <DropdownMenuItem onClick={viewProperty}>
          <Eye className="h-5 w-5 mr-2" />
          View Property
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <Share2 className="h-5 w-5 mr-2" />
          Share With Client
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleRemoveProperty}>
          <Trash className="h-5 w-5 mr-2" />
          Remove Property
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
