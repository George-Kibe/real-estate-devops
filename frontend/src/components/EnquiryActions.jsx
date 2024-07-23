"use client"

import * as React from "react"
import { ChevronDownCircleIcon, Ellipsis } from "lucide-react"
import { useRouter } from 'next/navigation';
import axios  from 'axios';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
import { toast } from "react-toastify";

export function EnquiryActions({enquiry}) {

  const markComplete = async () => {
    console.log("Enquiry: ", enquiry);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/enquiries/${enquiry.pkid}/`, {
        status: "Completed"
      });
      toast.success("Enquiry marked as completed");
      window.location.reload();
    } catch (error) {
      console.log("Error marking enquiry as completed: ", error);
      toast.error("Error marking enquiry as completed");
    }
  }
  const deleteEnquiry = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/enquiries/${enquiry.pkid}/`);
      toast.success("Enquiry deleted");
      window.location.reload();
    } catch (error) {
      toast.error("Error deleting enquiry");
      console.log("Error deleting enquiry: ", error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline ml-1" size="icon">
          {/* <ChevronDownCircleIcon className="h-[1.6rem] w-[1.6rem] rotate-0 scale-100 " /> */}
           <Ellipsis className='animate rotate-90' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={deleteEnquiry}>
            {"Delete"}
          </DropdownMenuItem>
        <DropdownMenuItem onClick={markComplete}>
          Mark complete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}