"use client"

import * as React from "react"
import { Ellipsis, Eye, Pencil, Share2, Trash, DiamondPlus, Heart, Square, Calendar, FileCheck2, TriangleAlert, BadgeCheck, CircleCheck, Notebook, MailPlus, Mail, PhoneCall, Download, FlagIcon, Clock9, ThumbsUp, ThumbsDown, CircleX } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// handleMarkFavorite
export function PropertyActions({
  handleEdit, 
  handleAddProperty, 
  handleMarkFavorite,
  currentProperty,
  isNew,
  isFavorite,
  viewProperty, 
  handleShareProperty,
  markPropertyAsPending,
  markPropertyNonFit,
  markPropertyAsArchived,
  markPropertyAsDenied,
  handleRemoveProperty,
  handleDeleteProperty,
  markPropertyAsApplied,
  markPropertyAsApproved,
  handleFollowUp,
}) {
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
            <DiamondPlus className="h-5 w-5 mr-2" />
            Add Property
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
        <DropdownMenuItem onClick={handleFollowUp}>
          <Calendar className="h-5 w-5 mr-2" />
          Follow Up/Remind
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleFollowUp}>
          <Calendar className="h-5 w-5 mr-2" />
          Follow Up Again
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Square className="h-5 w-5 mr-2" />
          Mark As Followed Up
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Square className="h-5 w-5 mr-2" />
          Mark Submitted
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileCheck2 className="h-5 w-5 mr-2" />
          Signed Application
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TriangleAlert className="h-5 w-5 mr-2" />
          No Response
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyAsApproved}>
          <BadgeCheck className={`${currentProperty.isApproved?.isApproved? "text-green-500" : "" } h-5 w-5 mr-2} `} />
          Approved
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyAsApplied}>
          <CircleCheck className={`${currentProperty.isApplied?.isApplied? "text-green-500" : "" } h-5 w-5 mr-2} `} />
          Applied
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Notebook className="h-5 w-5 mr-2" />
          Add to Waiting List
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MailPlus className="h-5 w-5 mr-2" />
          Apply For Benefits
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Mail className="h-5 w-5 mr-2" />
          Left Voicemail/Email
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PhoneCall className="h-5 w-5 mr-2" />
          Call Landlord
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyAsArchived}>
          <Download className="h-5 w-5 mr-2" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FlagIcon className="h-5 w-5 mr-2" />
          Flag For Supervisor Review
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyAsPending}>
          <Clock9 className="h-5 w-5 mr-2" />
          Pending Response
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyNonFit}>
          <ThumbsUp className={`${currentProperty.isFit?.isFit? "" : "text-red-500" } h-5 w-5 mr-2} `} />
          Not Fit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyNonFit}>
          <ThumbsUp className={`${currentProperty.isFit?.isFit? "text-green-500" : "" } h-5 w-5 mr-2} `} />
          Fit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyAsDenied}>
          <CircleX className={`${currentProperty.denied?.denied? "text-red-500" : "" } h-5 w-5 mr-2} `}/>
          Denied
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteProperty}>
          <Trash className="h-5 w-5 mr-2" />
          Remove Property
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMarkFavorite}>
          <Heart className="h-5 w-5 mr-2" />
            {
              isFavorite? "Unmark Favorite": "Mark As Favorite"
            }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
