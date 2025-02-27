"use client"

import { useRouter } from 'next/navigation';
import { Loader, Star} from 'lucide-react'
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';

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
  console.log("searchParams: ", searchParams)
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
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
          setFilteredProfessionals(response.data.filter(user => user.isProfessional === true))
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

  useEffect(() => {
    if (searchParams.search) {
      filterProfessional(searchParams.search)
    } else {
      setFilteredProfessionals(professionals)
    }
  }, [searchParams, professionals])

  const goToProfessional = (id) => {
    router.push(`/professionals/${id}`);
  }
  
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Marketplace</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
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
      <div class="container">
        <div class="flex flex-wrap -mx-4">
          {
            filteredProfessionals.map((professional, index) => (
              <button 
                onClick={() => goToProfessional(professional._id)} 
                class="w-full  px-4 md:w-1/2 lg:w-1/3">
                <div class="mb-4 cursor-pointer" data-wow-delay=".1s">
                  <div class="mb-4 overflow-hidden rounded-[5px]">
                    <a class="">
                      <Image width={300} height={300} 
                        src="/images/defaultProfile.png"
                        alt="image"
                        class="object-contain w-full " 
                      />
                    </a>
                  </div>
                  <div className='flex flex-col items-start'>
                    <h3>
                      <a
                        class="inline-block mb-2 text-xl font-semibold text-dark dark:text-white hover:text-primary dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                        {professional.name}
                      </a>
                    </h3>
                    <p class="max-w-[370px] text-base text-body-color dark:text-dark-6">
                      {professional.professionalBio || "No professional bio provided"}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between mt-8">
                    <div className="flex flex-row ">
                      <Star className='text-black' /> 5.0(20)
                    </div>
                    <div className="">
                      <p className="">From: $25</p>
                    </div>
                  </div>
                </div>
              </button>
            ))
          }
        </div>
      </div>
      <Pagination page={1} count={count}/>
    </div>
  );
};

export default ProfessionalsPage;