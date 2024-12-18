"use client"
import Table from "@/components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMainProvider } from '@/providers/MainProvider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import moment from "moment";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const columns = [
  {
    header: "",
    accessor: "checkBox",
  },
  {
    header: "Date",
    accessor: "date",
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
];

const SelectedBillingPage = ({searchParams}) => {
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [allBillingsApproved, setAllBillingsApproved] = useState(false);
  const router = useRouter();
  const {selectedBillings, setSelectedBillings} = useMainProvider();
  
  const goBack = () => {
  // router.push("/clients-billing")
  router.back()
  };

  const handleClick = (item) => {
    if (!selectedBillings?.includes(item)) {
      setSelectedBillings([...selectedBillings, item]);
    }else{
        setSelectedBillings(selectedBillings.filter(billing => billing.id !== item.id))
    }
  }
  const totalSelected = parseFloat(
    selectedBillings?.reduce((acc, curr) => acc + parseFloat(curr.claim_amount), 0).toFixed(2)
  );
  const deleteBillings = () => {
    setLoading(true);
    selectedBillings.forEach(async (billing) => {
      try {
        const response = await axios.delete(`${BACKEND_URL}/api/billings/${billing.pkid}`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
    setSelectedBillings([]);
    router.push("/clients-billing")
  }
  const approveBillings = async (status) => {
    setLoading(true);
    try {
      const approvedBillings = await Promise.all(
        selectedBillings.map(async (billing) => {
          const response = await axios.put(
            `${BACKEND_URL}/api/billings/${billing.pkid}/`,
            { approval_status: status }
          );
          return response.data;
        })
      );
  
      // Avoid duplicates
      setSelectedBillings((prevBillings) => {
        const uniqueBillings = [
          ...approvedBillings,
          ...prevBillings.filter(
            (billing) =>
              !approvedBillings.some((newBilling) => newBilling.pkid === billing.pkid)
          ),
        ];
        return uniqueBillings;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const checkBillingStatus = () => {
    const allApproved = selectedBillings.every(billing => billing.approval_status === "Approved");
    console.log("allApproved: ", allApproved);
    setAllBillingsApproved(allApproved);
  }

  useEffect(() => {
    checkBillingStatus()
  }, [selectedBillings])
  
  
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
      <td className="md:table-cell pl-2">
        <div className="flex flex-col justify-center">
          <h4 className="font-semibold">{moment(item.service_date_start).format("MM-DD-YYYY")}</h4>
          {/* <h4 className="font-semibold">{item.service_date_end}</h4> */}
        </div>
      </td>
      <td className="md:table-cell">{item.client_name}</td>
      <td className="hidden md:table-cell">{item.housing_coordinator_name}</td>
      <td className="md:table-cell">${item.claim_amount}</td>
      <td className="md:table-cell">{item.bill_status}</td>
      <td className="hidden md:table-cell">{item.worked_hours} Hrs</td>
      <td className="hidden md:table-cell">{item.billed_hours}Hrs</td>
      <td className="hidden md:table-cell">
        <p
          className={`p-1 rounded-full px-2 text-white ${
            item.approval_status === 'Approved' 
              ? 'bg-green-500' 
              : 'bg-red-500'
          }`}
        >
          {item.approval_status}
        </p>
      </td>
      <td className="hidden md:table-cell">{item.pro_code}</td>
      <td className="hidden md:table-cell">{item.modifier}</td>
      <td className="hidden md:table-cell">{item.payor}</td>
    </tr>
  );

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Selected Billings</h1>
      </div>
      {
        loading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-b-8 border-gray-900 ">
            </div>
          </div>
        )
      }
      {/* LIST */}
      <ConfirmDeleteModal 
        deleteAction={deleteBillings} 
        title={"these billings"} 
        isOpen={showDeleteModal}
        onClose={() => setshowDeleteModal(false)}
      />
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
        {
          allBillingsApproved ? (
            <Button onClick={() => approveBillings("Not Approved")} className="bg-[#94420b] rounded-none">DISAPPROVE WORK</Button>
          ) : (
            <Button onClick={() => approveBillings("Approved")} className="bg-[#94420b] rounded-none">APPROVE WORK</Button>
          )
        }
        
        <Button onClick={() => setshowDeleteModal(true)}  className="bg-[#f81505] rounded-none">DELETE</Button>
        {
          allBillingsApproved && 
          <Button 
            onClick={() => router.push("/submit-billings")} 
            className="bg-[#1e753f] rounded-none"> 
            SUBMIT BILLINGS
          </Button>
        }
        {/* <Button className="bg-[#0b204c] rounded-none">VOID</Button> */}
      </div>
      <div className="flex gap-4 mt-4 flex-wrap items-center">
        <Button onClick={goBack} className="bg-[#0b204c] rounded-none">GO BACK</Button>
      </div>
    </div>
  );
};

export default SelectedBillingPage;