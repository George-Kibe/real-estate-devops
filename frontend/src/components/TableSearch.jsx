"use client";

import {SearchIcon} from 'lucide-react'
import { useRouter } from "next/navigation";
import { useState } from 'react';

const TableSearch = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", searchText);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <button onClick={handleSubmit} className="">
        <SearchIcon/>
      </button>
      <input
        type="text"
        value={searchText}
        onChange={ev => setSearchText(ev.target.value)}
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;

export const SearchButton = ({onClick, value, setSearchText}) => {
  return (
    <div
      className="w-full flex items-center gap-2 text-md mx-4 rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <button onClick={onClick}>
        <SearchIcon/>
      </button>
      <input
        type="text"
        value={value}
        onChange={ev => setSearchText(ev.target.value)}
        placeholder="Ask me Anything-housing, resources, support and more..."
        className="w-full p-2 bg-transparent outline-none"
      />
    </div>
  )
}

export const GeneralSearchButton = ({onClick, value, setSearchText}) => {
  return (
    <div
      className="w-full flex items-center gap-2 text-md mx-4 rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <button onClick={onClick}>
        <SearchIcon/>
      </button>
      <input
        type="text"
        value={value}
        onChange={ev => setSearchText(ev.target.value)}
        placeholder="Ask me Anything-Practices, Policies..."
        className="w-full p-2 bg-transparent outline-none"
      />
    </div>
  )
}