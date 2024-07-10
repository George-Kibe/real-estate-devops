'use client'
import AnimatedText from "@/components/AnimatedText";
import { TableMenu } from "@/components/TableMenu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BillingPage() {
  const [searchText, setSearchText] = useState('');
  console.log("searchText:", searchText)
  const handleClick = (e) => {
    console.log("Button clicked!");
    console.log("Event:", e.target.checked)
    };
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"Billing Page: Under Construction"} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div>
                <div className="border border-black dark:border-light rounded-lg p-1 px-2 mb-1">
                  <p className="flex items-center justify-center">Action<TableMenu/></p>
                </div>
            </div>
            <label for="table-search" className="sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input value={searchText} onChange={e => setSearchText(e.target.value)} type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
            </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="p-4">
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Position
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                        <div className="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" 
                            onChange={handleClick}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                        <div className="ps-3">
                            <div className="text-base font-semibold">Neil Sims</div>
                            <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                        </div>  
                    </th>
                    <td className="px-6 py-4">
                        React Developer
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <Button>Edit User</Button>
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                        <div className="flex items-center">
                            <input id="checkbox-table-search-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="checkbox-table-search-2" className="sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
                        <div className="ps-3">
                            <div className="text-base font-semibold">Bonnie Green</div>
                            <div className="font-normal text-gray-500">bonnie@flowbite.com</div>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        Designer
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <Button>Edit User</Button>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}