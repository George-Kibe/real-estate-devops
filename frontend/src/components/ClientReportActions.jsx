"use client"

import * as React from "react"
import { Ellipsis, Download, File, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// handleMarkFavorite
export function ClientReportActions({
  generateTodayReport,
  name,
  generatePastReport, 
  exportReportsToExcel,
  generateBlankReport
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline ml-1" size="icon">
           <Ellipsis className='animate rotate-90' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">        
        <DropdownMenuItem onClick={generateTodayReport}>
          <File className="h-5 w-5 mr-2" />
            Generate {name}'s  Report for Today
        </DropdownMenuItem>
        <DropdownMenuItem onClick={generateBlankReport}>
          <BookOpen className="h-5 w-5 mr-2" />
            Generate {name}'s  Blank Report for Today
        </DropdownMenuItem>
        <DropdownMenuItem onClick={generatePastReport}>
          <File className="h-5 w-5 mr-2" />
            Generate {name}'s  Report for Another Day
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportReportsToExcel}>
          <Download className="h-5 w-5 mr-2" />
            Export {name}'s  Reports to Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
