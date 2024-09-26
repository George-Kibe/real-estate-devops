import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import {SearchIcon, PlusCircle} from 'lucide-react'
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

const columns = [
  {
    header: "Service Date Range",
    accessor: "serviceDR",
  },
  {
    header: "Client Name",
    accessor: "clientName",
    className: "hidden md:table-cell",
  },
  {
    header: "Housing Cordinator Name",
    accessor: "housingCN",
    className: "hidden md:table-cell",
  },
  {
    header: "Claim Amount",
    accessor: "claimA",
    className: "hidden md:table-cell",
  },
  {
    header: "Bill Status",
    accessor: "billS",
    className: "hidden lg:table-cell",
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

const BillingPage = () => {
  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border border-gray-200 text-sm hover:bg-lime-100"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.teacherId}</td>
      <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <PlusCircle />
          </Link>
        </div>
      </td>
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
      <Table columns={columns} renderRow={renderRow} data={teachersData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default BillingPage;