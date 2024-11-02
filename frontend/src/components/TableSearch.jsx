"use client";

import {SearchIcon, PlusCircle} from 'lucide-react'
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = (e.currentTarget[0]).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <SearchIcon/>
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </form>
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