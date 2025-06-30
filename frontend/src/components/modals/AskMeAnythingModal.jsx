"use client"

import React, { useState } from 'react';
import { Loader, LoaderCircle, Pen, Search, SquareX, Trash2 } from 'lucide-react';
import { GeneralSearchButton } from '../TableSearch';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { generalAIPrompt } from '@/utils/functions';
import { set } from 'mongoose';

const AskMeAnythingModal = ({ isOpen, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const [anyAnswer, setAnyAnswer] = useState("");
  const [anyQLoading, setAnyQLoading] = useState(false);

  const handleAiSearch = async() => {
    if (!searchText) {
      toast.error("Please enter a search phrase!");
      return;
    }
    setAnyQLoading(true)
    try {
      const result = await generalAIPrompt(searchText);
      // console.log("Search Result: ", results)
      setAnyAnswer(result)
      setAnyQLoading(false)
    } catch (error) {
      toast.error("Some Error occured while searching. Try Again!")
      setAnyQLoading(false)
    }
  }
  const handleClose = () => {
    setAnyAnswer("");
    setSearchText("");
    onClose();
  }
  const handleClear = () => {
    setAnyAnswer("");
    setSearchText("");
  }
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
        <div className='absolute right-0 rounded-lg flex mr-2 top-2 gap-2'>
          {/* <Pen onClick={() => setShowInput(!showInput)} className='text-green-500' /> */}
          <Trash2 onClick={handleClear} className='text-red-500' />
          <SquareX onClick={handleClose} className='text-red-500'/>
        </div>

        <div className="flex flex-col p-2 ">   
          <label className="block my-2 font-bold text-2xl ">
            Ask Me Anything
          </label>  
           <div className="w-[80%] items-center mt-4 mx-8  my-2 flex-col md:flex-row">
            <div className="flex">
              <GeneralSearchButton 
              onClick={handleAiSearch} 
              value={searchText} 
              setSearchText={setSearchText} 
            />
            {
              anyQLoading ?  (
                <p className="flex items-center justify-center">
                  <Loader className="animate-spin ml-auto" /> Loading....
                </p>
              ):
              (
                <button onClick={handleAiSearch} className="flex items-center ml-auto gap-2">
                  <Search className='h-4 w-4'  /> Search
                </button>
              )
            }
            </div>
            
            {
              anyAnswer && (
                <div className='flex flex-col  items-start'>
                  <label className="mt-2 font-bold">Answer</label>
                  <ReactMarkdown>
                    {anyAnswer}
                  </ReactMarkdown>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskMeAnythingModal;