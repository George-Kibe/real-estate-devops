"use client";
import DashboardCard from '@/components/dashboard/DashboardCard';
// import PostsTable from '@/components/posts/PostsTable';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import { BadgeDollarSign, Eye, Folder, MessageCircle, Newspaper, Pen, Trash2, User, Users, Users2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@/components/Table';
import moment from 'moment';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const columns = [
  {
    header: "Date",
    accessor: "date",
    className: "md:table-cell",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Subscription Plan",
    accessor: "subscriptionPlan",
    className: "md:table-cell",
  },
  {
    header: "Usage (%)",
    accessor: "usage",
    className: "hidden md:table-cell",
  },
  {
    header: "Payment Status",
    accessor: "PaymentStatus",
    className: "md:table-cell",
  },
  {
    header: "Total Claims",
    accessor: "billS",
    className: "lg:table-cell",
  },
  {
    header: "Upgrade Plan",
    accessor: "upgradePlan",
    className: "hidden md:table-cell",
  },
  {
    header: "Action",
    accessor: "action",
    className: "hidden md:table-cell",
  },
];

const claimsColumns = [
  {
    header: "Agency",
    accessor: "agency",
    className: "md:table-cell",
  },
  {
    header: "Pending",
    accessor: "pending",
  },
  {
    header: "Total Claims",
    accessor: "tClaims",
    className: "md:table-cell",
  },
  {
    header: "Approved",
    accessor: "approved",
    className: "hidden md:table-cell",
  },
  {
    header: "Flagged",
    accessor: "flagged",
    className: "md:table-cell",
  },
  {
    header: "Action",
    accessor: "action",
    className: "lg:table-cell",
  },
];

const invoiceColumns = [
  {
    header: "Date",
    accessor: "date",
    className: "md:table-cell",
  },
  {
    header: "Agency",
    accessor: "agency",
  },
  {
    header: "Amount",
    accessor: "amount",
    className: "md:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden md:table-cell",
  },
  {
    header: "Plan",
    accessor: "plan",
    className: "md:table-cell",
  },
  {
    header: "Action",
    accessor: "action",
    className: "lg:table-cell",
  },
];

export default function AdminMainPage() {[]
  const [agencies, setAgencies] = useState([]);
  const [staff, setStaff] = useState([])
  const [clients, setClients] = useState([]);
  const [billings, setBillings] = useState([]);


  const fetchAgencies = async () => {
    const response = await axios.get('/api/auth/users')
    setStaff(response.data.length);
    // filter premium users and get the count
    const data = response.data.filter(user => user.isPremium)
    setAgencies(data);
  }

  const getClients = async () => {
    const response = await axios.get(`${BACKEND_URL}/drf-api/clients`);
      const data = response.data
      setClients(data.results);
  }

  const getBillings = async () => {
    const response = await axios.get(`${BACKEND_URL}/drf-api/billings`);
      const data = response.data
      setBillings(data.results);
  }

  useEffect(() => {
    fetchAgencies();
    getBillings();
    getClients();
  }, [])

  const RenderAgenciesRow = (user) => (
    <tr
      key={user.id}
      className="border border-gray-200 text-sm"
    >
      <td className="p-2 justify-center">
        {moment(user.created_at).format("YYYY-MM-DD")}
      </td>
      <td className="md:table-cell">{user.name}</td>
      <td className="hidden md:table-cell">  
        { user.isPremium ? "Premium" : "Free Trial"}
      </td>
      <td className="md:table-cell">
        {user.isPremium ? user.usage : "N/A"}
      </td>
      <td className="hidden md:table-cell">
        {user.isPremium ? user.paymentStatus : "N/A"}
      </td>
      <td className="hidden md:table-cell">
        {user.isPremium ? user.totalClaims : "N/A"}
      </td>
      <td className="hidden md:table-cell">
        {user.isPremium ? (
          <p className="">
            Upgrade to Enterprise
          </p>
        ) : (
          <p className="">
            User is Enterprise
          </p>
        )}
      </td>
      <td className="hidden md:table-cell">
        <div className="flex gap-2 flex-row">
          <button className="p-1 rounded-full bg-[#FCECE1]"> <Eye className='h-5 w-5 text-[#F44336]' /></button>
          <button className="p-1 rounded-full bg-[#E1E7FA]"> <Pen className='h-5 w-5 text-[#214FDB]' /> </button>
          <button className="p-1 rounded-full bg-[#FCECE1]"> <Trash2 className='h-5 w-5 text-[#F44336]' /> </button>
        </div>
      </td>
    </tr>
  );

  const RenderClaimsRow = (user) => (
    <tr
      key={user.id}
      className="border border-gray-200 text-sm"
    >
      <td className="p-2 justify-center">
        {user.name}
      </td>
      <td className="hidden md:table-cell">  
        { 5}
      </td>
      <td className="md:table-cell">
        {10}
      </td>
      <td className="hidden md:table-cell">
        {5}
      </td>
      <td className="hidden md:table-cell">
        {4}
      </td>
      <td className="hidden md:table-cell">
        <button className="p-1 rounded-full bg-[#FCECE1]"> <Eye className='h-5 w-5 text-[#F44336]' /></button>
      </td>
    </tr>
  );
  
  const RenderInvoicesRow = (user) => (
    <tr
      key={user.id}
      className="border border-gray-200 text-sm"
    >
      <td className="p-2 justify-center">
        {moment(user.updated_at).format("YYYY-MM-DD")}
      </td>
      <td className="md:table-cell">{user.name}</td>


      <td className="hidden md:table-cell">
        {100}
      </td>
      <td className="hidden md:table-cell">
        { "Paid"}
      </td>
      <td className="hidden md:table-cell">
        {user.isPremium ? (
          <p className="">
            Premium
          </p>
        ) : (
          <p className="">
            EnterPrise
          </p>
        )}
      </td>
      <td className="hidden md:table-cell">
        <div className="flex gap-2 flex-row">
          <button className="p-1 rounded-full bg-[#FCECE1]">
            Upgrade Plan
          </button>

        </div>
      </td>
    </tr>
  );

  return (
    <div className='p-4 md:p-8 '>
      <div className='flex flex-col md:flex-row justify-between gap-5 mb-5 mt-4 md:mb-12'>
        <DashboardCard
          title='Agencies'
          count={agencies.length}
          icon={<Newspaper className='text-slate-500' size={32} />}
        />
        <DashboardCard
          title='Total Staff'
          count={staff}
          icon={<Users2 className='text-slate-500' size={32} />}
        />
        <DashboardCard
          title='Total Clients'
          count={clients.length}
          icon={<Users className='text-slate-500' size={32} />}
        />
        <DashboardCard
          title='Total Billings'
          count={billings.length}
          icon={<BadgeDollarSign className='text-slate-500' size={32} />}
        />
      </div>
      {/* <AnalyticsChart /> */}
      <div className="mt-2 md:mt-8">
        <p className="text-sm md:text-2xl font-semibold ">Agencies Overview and Subscription Management</p>
        {
          agencies.length > 0 ? (
            <Table
              headerClassName="bg-[#E5FBDE]"
              columns={columns}
              renderRow={RenderAgenciesRow}
              data={agencies}
            />
          ) : (
            <p className="text-sm">No agencies found</p>
          )
        }
        <div className="w-full flex flex-col md:flex-row gap-8 mt-4">
          <div className="w-full md:w-1/2">
            <p className="text-sm md:text-2xl font-semibold mt-4">Claims Monitoring</p>
            {
              agencies.length > 0 ? (
                <Table
                  headerClassName="bg-[#E1E7FA]"
                  columns={claimsColumns}
                  renderRow={RenderClaimsRow}
                  data={agencies}
                />
              ) : (
                <p className="text-sm">No claims found</p>
              )
            }
          </div>

          <div className="w-full md:w-1/2">
            <p className="text-sm md:text-2xl font-semibold mt-4">Invoice Tracking And Payment History</p>
            {
              agencies.length > 0 ? (
                <Table
                  headerClassName="bg-[#E1E7FA]"
                  columns={invoiceColumns}
                  renderRow={RenderInvoicesRow}
                  data={agencies}
                />
              ) : (
                <p className="text-sm">No Invoices Yet</p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}