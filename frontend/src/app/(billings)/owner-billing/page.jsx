"use client"

import { useRouter } from 'next/navigation';
import { Search} from 'lucide-react'
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMainProvider } from '@/providers/MainProvider';
import { Button } from '@/components/ui/button';
import { BillingActions } from '@/components/BillingActions';
import AnimatedText from '@/components/AnimatedText';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

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
    header: "Approval Status",
    accessor: "approvalStatus",
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
  {
    header: "Action",
    accessor: "action",
    className: "hidden md:table-cell",
  },
];

const BillingPage = ({searchParams}) => {
  // console.log("searchParams: ", searchParams);
  const router = useRouter();
  const {selectedBillings, setSelectedBillings} = useMainProvider();
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [allBillings, setAllBillings] = useState([]);
  const [billings, setBillings] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [logStatus, setLogStatus] = useState('');
  const [billingStatus, setBillingStatus] = useState('');
  const [payor, setPayor] = useState('');
  // console.log("startDate: ", startDate)
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  // console.log("selected billings: ", selectedBillings);
  const viewBilling = (pkid) => {
    router.push(`owner-billing/${pkid}`)
  }
  const search = searchParams?.search;
  const handleClick = (item) => {
    // add item to selected billings if it doesnt exist already
    const existingBilling = selectedBillings.find(billing => billing.id === item.id);
    if (!existingBilling) {
      setSelectedBillings([...selectedBillings, item]);
    }else{
        // remove item from selected billings
        setSelectedBillings(selectedBillings.filter(billing => billing.id !== item.id))
    }
  }
  // reduce the selected billings to get the total price
  const totalPrice = parseFloat(
    billings?.reduce((acc, curr) => acc + parseFloat(curr.claim_amount), 0).toFixed(2)
  );
  const totalSelected = parseFloat(
    selectedBillings?.reduce((acc, curr) => acc + parseFloat(curr.claim_amount), 0).toFixed(2)
  );

  const fetchBillings = async () => {
    const page = searchParams?.page || 1;
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/billings?page=${page}`);
      const billings = response.data.results;
      setBillings(billings);
      setAllBillings(billings);
      // setBillings([...billings, ...billings, ...billings, ...billings])
      setCount(response.data.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillings();
  }, [])
  const handleSelected = () => {
    router.push("selected-billings")
    //console.log("selected billings: ", selectedBillings);
  }
  useEffect(() => {
    if (!search) {
      return;
    }
    const newBillings = allBillings.filter(billing => {
      return billing.client_name.toLowerCase().includes(search?.toLowerCase()) || billing.housing_coordinator_name.toLowerCase().includes(search?.toLowerCase())
    })
    setBillings(newBillings);  
  }, [search])
  useEffect(() => {
    if (!logStatus) {
      return;
    }
    const newBillings = allBillings.filter(billing => {
      return billing.log_status.toLowerCase() === (logStatus?.toLowerCase())
    })
    setBillings(newBillings);
  }, [logStatus])

  useEffect(() => {
    if (!billingStatus) {
      return;
    }
    const newBillings = allBillings.filter(billing => {
      return billing.bill_status.toLowerCase() === (billingStatus?.toLowerCase())
    })
    setBillings(newBillings);
  }, [billingStatus])

  useEffect(() => {
    if (!payor) {
      return;
    }
    const newBillings = allBillings.filter(billing => {
      return billing.payor.toLowerCase() === (payor?.toLowerCase())
    })
    setBillings(newBillings);
  }, [payor])

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }
    const newBillings = allBillings.filter(billing => {
      const billingDate = new Date(billing.service_date_start);
      return billingDate >= startDate && billingDate <= endDate;
    })
    // console.log("newBillings: ", newBillings);
    setBillings(newBillings);
  }, [startDate, endDate])

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
            checked={selectedBillings.map(b => b.id).includes(item.id)}
          />
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
      <td className="hidden md:table-cell">{item.approval_status}</td>
      <td className="hidden md:table-cell">{item.pro_code}</td>
      <td className="hidden md:table-cell">{item.modifier}</td>
      <td className="hidden md:table-cell">{item.payor}</td>
      <td>
        <BillingActions viewBilling={() =>viewBilling(item.pkid)} />
      </td>
    </tr>
  );


  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <AnimatedText text={"All Billings"} />
      {/* TOP */}
      <div className="flex justify-between">
        <div className="relative flex flex-col">
          <p className="font-semibold">Date</p>
          <div className="flex gap-4 flex-row mb-2">
            <button onClick={() => setShowStartCalendar(!showStartCalendar)} className="border px-2 border-black">
              From:  {moment(startDate).format("MM/DD/YYYY")}
            </button>
            <button onClick={() => setShowEndCalendar(!showEndCalendar)} className="border px-2 border-black">
              To: {moment(endDate).format("MM/DD/YYYY")}
            </button>
          </div> 
          {
            showStartCalendar && (
              <div className="absolute top-10 left-0 z-10">
                <Calendar onChange={(date) => {
                  setStartDate(date)
                  setShowStartCalendar(false)
                }} value={startDate} />
              </div>
            )
          }
          {
            showEndCalendar && (
              <div className="absolute top-10 left-0 z-10">
                <Calendar onChange={(date) => {
                  setEndDate(date)
                  setShowEndCalendar(false)
                }} value={endDate} />
              </div>
            )
          }
        </div>
        <div className="hidden lg:block mb-4">
          <label className="block text-sm font-bold mb-2">
          Approval Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="logStatus" 
            name="Log Status"
            value={logStatus}
            onChange={(e) => setLogStatus(e.target.value)}
          >
          <option value="">-Any-</option>
          <option value="Approved">Approved</option>
          <option value="Not Approved">Not Approved</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>

          </select>
        </div>

        <div className="hidden lg:block mb-4">
          <label className="block text-sm font-bold mb-2">
          Billing Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="billingStatus" 
            name="billing Status"
            value={billingStatus}
            onChange={(e) => setBillingStatus(e.target.value)}
          >
          <option value="">-Any-</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Submitted">Submitted</option>
          </select>
        </div>

        <div className="hidden lg:block mb-4">
          <label className="block text-sm font-bold mb-2">
          Payor
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="Payor" 
            name="Payor"
            value={payor}
            onChange={(e) => setPayor(e.target.value)}
          >
          <option value="">-Any-</option>
          <option value="MA">MA</option>
          <option value="UCARE">UCARE</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
        </div>
      </div>
      {
        billings.length === selectedBillings.length? (
          <Button onClick={() => setSelectedBillings([])}>UNSELECT ALL</Button>
        ) : (
          <Button onClick={() => setSelectedBillings(billings)}>SELECT ALL</Button>)
      }

      {/* LIST */}

      <Table columns={columns} renderRow={renderRow} data={billings} />
      {/* PAGINATION */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <h2 className='font-bold'>
                ALL TOTAL:{totalPrice}
            </h2>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <h2 className='font-bold'>
                SELECTED TOTAL:{totalSelected}
            </h2>
        </div>
      </div>
      {
        selectedBillings.length > 0 && <Button onClick={handleSelected}>SELECT</Button>
      }
      <Pagination page={1} count={count}/>
    </div>
  );
};

export default BillingPage;