
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

export function TableMenu() {
  const handleEdit = () => {
    console.log("Edit clicked");
  }
  const handleDelete = () => {
    console.log("Delete clicked");
  }
  const viewReports = () => {
    console.log("View Reports clicked");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline ml-1" size="icon">
          <ChevronDownCircleIcon className="h-[1.6rem] w-[1.6rem] rotate-0 scale-100 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEdit()}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete()}>
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => viewReports()}>
          View Reports
        </DropdownMenuItem>
      </DropdownMenuContent>
      
    </DropdownMenu>
  )
}