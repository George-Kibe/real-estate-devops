"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { LoaderCircle, Pen, SquareX, Trash2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';

const AiSummaryModal = ({ isOpen, onClose, summary, setSummary, generateAISummary, summaryFinal, summaryAiLoading }) => {
  const [showInput, setShowInput] = useState(false);
  return (
    <div 
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[90vh] w-full overflow-auto bg-white p-4 rounded-md
          md:w-1/2 dark:bg-black md:p-8 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <div 
          className='absolute right-0 rounded-lg flex mr-2 top-2 gap-2'
        >
          <Pen onClick={() => setShowInput(!showInput)} className='text-green-500' />
          <Trash2 className='text-red-500' />
          <SquareX onClick={onClose} className=''/>
        </div>

        <div className="flex flex-col p-2 ">   
          <label className="block my-2 font-bold text-2xl ">
            AI Summary Notes
          </label>  
          {
            summaryFinal && (
              <div className='flex flex-col items-start'>
                <label className="mt-2">Summary Notes</label>
                <p className="text-sm mt-2 border border-gray p-2 mb-2 relative">
                  {summaryFinal}
                </p>
              </div>
            )
          }         
          <div className="mb-4 h-full border rounded-md p-2">  
            {
              showInput && (
                <div className='flex justify-between items-end'>
                  <Textarea className="mt-2" required
                    value={summary}
                    defaultValue={summary}
                    onChange={(e)=>setSummary(e.target.value)}
                  />
                </div>
              )
            }

            <div className="flex items-center justify-between gap-8">
              <Button
                onClick={generateAISummary}
                disabled={summaryAiLoading}
                className="mt-2 self-start bg-black text-white hover:bg-blue-700"
              >
                {
                  summaryAiLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Re-Generate Summary"
                  )
                }
              </Button>
              <Button
                onClick={onClose}
                className="mt-2 self-start bg-blue-500 text-white hover:bg-blue-700"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSummaryModal;