"use client"

import { PlusCircle} from 'lucide-react'
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMainProvider } from '@/providers/MainProvider';
import { Button } from '@/components/ui/button';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const columns = [
  {
    header: "",
    accessor: "checkBox",
  },
  {
    header: "Date Range",
    accessor: "serviceDR",
  },
  {
    header: "Client Name",
    accessor: "clientName",
    className: "md:table-cell",
  },
  {
    header: "Housing Cordinator Name",
    accessor: "housingCN",
    className: "hidden md:table-cell",
  },
  {
    header: "Claim Amount",
    accessor: "claimA",
    className: "md:table-cell",
  },
  {
    header: "Bill Status",
    accessor: "billS",
    className: "lg:table-cell",
  },
  {
    header: "Scheduled Hours",
    accessor: "scheduledHrs",
    className: "hidden lg:table-cell",
  },
  {
    header: "Worked Hours",
    accessor: "workedHrs",
    className: "hidden md:table-cell",
  },
  {
    header: "Billed Hours",
    accessor: "billedHrs",
    className: "hidden md:table-cell",
  },
  {
    header: "Log Status",
    accessor: "logSts",
    className: "hidden md:table-cell",
  },
  {
    header: "Pro Code",
    accessor: "proCode",
    className: "hidden md:table-cell",
  },
  {
    header: "Modifier",
    accessor: "modifier",
    className: "hidden md:table-cell",
  },
  {
    header: "Payor",
    accessor: "payor",
    className: "hidden md:table-cell",
  },
];

const SelectedBillingPage = ({searchParams}) => {
  const [loading, setLoading] = useState(false);
  const {selectedBillings, setSelectedBillings} = useMainProvider();
  const handleClick = (item) => {
    // add item to selected billings if it doesnt exist already
    if (!selectedBillings?.includes(item)) {
      setSelectedBillings([...selectedBillings, item]);
    }else{
        // remove item from selected billings
        setSelectedBillings(selectedBillings.filter(billing => billing.id !== item.id))
    }
  }
  // reduce the selected billings to get the total price
  const totalSelected = parseFloat(
    selectedBillings?.reduce((acc, curr) => acc + parseFloat(curr.claim_amount), 0).toFixed(2)
  );
  
  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border border-gray-200 text-sm"
    >
        <td className="w-4 items-center justify-center pl-2">
            <div className="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" 
                onChange={() =>handleClick(item)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={selectedBillings.map(b => b.id).includes(item.id)} />
                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
            </div>
        </td>
      <td className="flex items-center justify-center">
        <div className="flex flex-col justify-center">
          <h4 className="font-semibold">{item.service_date_start} -</h4>
          <h4 className="font-semibold">{item.service_date_end}</h4>
        </div>
      </td>
      <td className="md:table-cell">{item.client_name}</td>
      <td className="hidden md:table-cell">{item.housing_coordinator_name}</td>
      <td className="md:table-cell">{item.claim_amount}</td>
      <td className="md:table-cell">{item.bill_status}</td>
      <td className="hidden md:table-cell">{item.scheduled_hours}</td>
      <td className="hidden md:table-cell">{item.worked_hours}</td>
      <td className="hidden md:table-cell">{item.billed_hours}</td>
      <td className="hidden md:table-cell">{item.log_status}</td>
      <td className="hidden md:table-cell">{item.pro_code}</td>
      <td className="hidden md:table-cell">{item.modifier}</td>
      <td className="hidden md:table-cell">{item.payor}</td>
      {/* <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <PlusCircle />
          </Link>
        </div>
      </td> */}
    </tr>
  );

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Billings</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <PlusCircle />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={selectedBillings} />
      {/* PAGINATION */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <h2 className='font-bold'>
                SELECTED TOTAL:{totalSelected}
            </h2>
        </div>
      </div>
      {/* <Pagination page={1} count={count}/> */}
      <div className="flex gap-4 flex-wrap items-center">
        <Button className="bg-[#1e753f] rounded-none">APPROVE BILLING</Button>
        <Button className="bg-[#3a76e7] rounded-none">ADD TO BATCH</Button>
        <Button className="bg-[#0b204c] rounded-none">VOID</Button>
        <Button className="bg-[#9b932c] rounded-none">REPLACE</Button>
        <Button className="bg-[#f81505] rounded-none">DELETE</Button>
        <Button className="bg-[#94420b] rounded-none">UPDATE TS</Button>
        <Button className="bg-[#e4b124] rounded-none">UPDATE BILLING STATUS</Button>
        <Button className="bg-[#1e753f] rounded-none">UPDATE CL TYPE</Button>
        <Button className="bg-[#bec2c0] rounded-none">UPDATE NOTES</Button>
      </div>
    </div>
  );
};

export default SelectedBillingPage;