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
        <DropdownMenuItem onClick={handleShareProperty}>
          <Square className="h-5 w-5 mr-2" />
          Mark As Followed Up
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <Square className="h-5 w-5 mr-2" />
          Mark Submitted
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <FileCheck2 className="h-5 w-5 mr-2" />
          Signed Application
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <TriangleAlert className="h-5 w-5 mr-2" />
          No Response
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <BadgeCheck className="h-5 w-5 mr-2" />
          Approved
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <CircleCheck className="h-5 w-5 mr-2" />
          Applied
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <Notebook className="h-5 w-5 mr-2" />
          Add to Waiting List
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <MailPlus className="h-5 w-5 mr-2" />
          Apply For Benefits
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <Mail className="h-5 w-5 mr-2" />
          Left Voicemail/Email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <PhoneCall className="h-5 w-5 mr-2" />
          Call Landlord
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyAsArchived}>
          <Download className="h-5 w-5 mr-2" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareProperty}>
          <FlagIcon className="h-5 w-5 mr-2" />
          Flag For Supervisor Review
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyAsPending}>
          <Clock9 className="h-5 w-5 mr-2" />
          Pending Response
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyNonFit}>
          <ThumbsUp className="h-5 w-5 mr-2" />
          Fit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyNonFit}>
          <ThumbsDown className="h-5 w-5 mr-2" />
          Not Fit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={markPropertyAsDenied}>
          <CircleX className="h-5 w-5 mr-2" />
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
