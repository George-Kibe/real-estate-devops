'use client';

import React, { useState } from 'react';

const SearchView = () => {
  const [searchtext, setSearchtext] = useState('')

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Searching for ...", searchtext);
    setSearchtext('')
  };

  return (
    <div className="flex w-full pt-4 pb-8 flex-col items-center justify-center bg-cover bg-center"  style={{ backgroundImage: 'url("https://i.ibb.co/Bt7bhVy/realestate25.jpg")' }}>
        <h1 className="text-xl md:text-4xl text-black font-bold mb-4">Discover Your New Home</h1>
        <p className="md:text-xl text-black mb-8">Helping millions find their perfect houses</p>
        <form className="flex relative w-80 flex-col gap-4 md:flex-row items-center justify-center" >
          <input
            type="text"
            value={searchtext}
            onChange={(e) => setSearchtext(e.target.value)}
            placeholder="Search by Location..."
            className=" py-2 pl-4 pr-10 rounded-md border border-gray-300"
          />
          <button type='submit' onClick={handleClick} className="flex flex-row ml-4 bg-lime-600 px-2 p-1 rounded-lg">
            <p className="self-center mr-2">Search</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 md:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </form>
      </div>
  )
}

export default SearchView
