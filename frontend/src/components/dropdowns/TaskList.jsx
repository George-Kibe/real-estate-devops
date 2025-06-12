
"use client"

import * as React from "react"
import { ChevronDownCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function TaskList() {
  const router = useRouter();
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
          <ChevronDownCircleIcon className="h-8 w-8 rotate-0 scale-100 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEdit()}>
          Staff To Do List
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete()}>
          Client Reminders
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/tracking")}>
          Follow Up Tracker
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete()}>
          Daily Activity Logs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => viewReports()}>
          Missed Follow Up Logs
        </DropdownMenuItem>
         <DropdownMenuItem onClick={() => viewReports()}>
          Housing History Timeline
        </DropdownMenuItem>
      </DropdownMenuContent>
      
    </DropdownMenu>
  )
}