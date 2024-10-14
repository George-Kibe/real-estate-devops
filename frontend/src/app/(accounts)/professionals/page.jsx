"use client"

import { useRouter } from 'next/navigation';
import { Loader, PlusCircle} from 'lucide-react'
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const columns = [
  {
    header: "Professional ID",
    accessor: "numbers",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "First Name",
    accessor: "firstName",
    className: "md:table-cell",
  },
  {
    header: "Last Name",
    accessor: "lastName",
    className: "hidden md:table-cell",
  },
  {
    header: "Profession",
    accessor: "profession",
    className: "md:table-cell",
  },
  {
    header: "IsAvailable",
    accessor: "availability",
    className: "lg:table-cell",
  }
];

const ProfessionalsPage = ({searchParams}) => {
  console.log("SearchParams: ", searchParams)
  const [professionals, setProfessionals] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  
  const fetchProfessionals = async() => {
    setLoading(true)
    try {
        const response = await axios.get('/api/auth/users')
        // console.log("response: ", response.data)
        if (response.status === 200) {
          setUsers(response.data)
          setProfessionals(response.data.filter(user => user.isProfessional === true))
        }
        setLoading(false)
    } catch (error) {
        toast.error("Error fetching users")
        setLoading(false)
    }
  }

  const filterProfessional = (searchTerm) => {
    // filter by name, email, availability, profession
    const filteredProfessionals = professionals.filter((professional) => {
      return (
        professional.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.isAvailable.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  useEffect(() => {
    fetchProfessionals();
  }, [])

  const goToProfessional = (id) => {
    router.push(`/professionals/${id}`);
  }
  
  const renderRow = (professional) => (
    <tr
      key={professional.id}
      onClick={() => goToProfessional(professional._id)}
      className="border border-gray-200 text-sm cursor-pointer"
    >
      <td className="md:table-cell">{professional._id.substring(10)}</td>
      <td className="md:table-cell">{professional.email}</td>
      <td className="md:table-cell">{professional.firstName}</td>
      <td className="hidden md:table-cell">{professional.lastName}</td>
      <td className="md:table-cell">{professional.profession}</td>
      <td className="md:table-cell">{professional.isAvailable? "Yes": "No"}</td>
    </tr>
  );

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Professionals</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <PlusCircle />
            </button>
          </div>
        </div>
      </div>
      { loading &&
        <tr className="">
          <p className="flex text-2xl mx-4 items-center justify-center">
            <Loader className="animate-spin text-4xl h-8 w-8 mx-8" /> 
            Loading...
          </p>
        </tr>
      }
      <Table columns={columns} renderRow={renderRow} data={professionals} />
      <Pagination page={1} count={count}/>
    </div>
  );
};

export default ProfessionalsPage;