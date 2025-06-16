"use client"

import * as React from "react"
import { Ellipsis, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ReminderActions({
  setShowDeleteModal, 
  reminder, 
  showDeleteModal,
   setReminderToDelete
}) {
  const initiateDelete = () => {
    setReminderToDelete(reminder);
    setShowDeleteModal(true);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis className='' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={initiateDelete}>
          <Trash2 className="h-5 w-5 mr-2 text-red-500" />
            Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
