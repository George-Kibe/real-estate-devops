'use client'
import AnimatedText from "@/components/AnimatedText";
import LoadingPage from "@/components/Loading";
import { TableMenu } from "@/components/TableMenu";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UsersPage() {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  //console.log("All users: ", allUsers)
  const handleClick = (e) => {
    console.log("Button clicked!");
    console.log("Event:", e.target.checked)
    };
  const fetchUsers = async() => {
    try {
        const response = await axios.get('/api/auth/users')
        console.log("response: ", response.data)
        if (response.status === 200) {
          setUsers(response.data)
          setAllUsers(response.data)
        }
    } catch (error) {
        toast.error("Error fetching users")
    }
  }
  const searchUsers = () => {
    // filter users by search term if it matches their names
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()))
    if (filteredUsers.length > 0) {
        setUsers(filteredUsers)
    }else{
        //toast.info("No users found. Showing all Users");
        setUsers(allUsers)
        return;
    }
  }
 
  useEffect(() => {
    if (searchText.length > 0) {
        searchUsers();
    }else{
        setUsers(allUsers);
    }
  }, [searchText])
  

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return <LoadingPage />
  }
  
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"Users"} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            {/* <div>
                <div className="border border-black dark:border-light rounded-lg p-1 px-2 mb-1">
                  <p className="flex items-center justify-center">Action<TableMenu/></p>
                </div>
            </div> */}
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
                        Premium
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Joining Date
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    users?.map((user, index) => (
                        <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" 
                                    onChange={handleClick}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src={user.image} alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{user.name}</div>
                                    <div className="font-normal text-gray-500">{user.email}</div>
                                </div>  
                            </th>
                            <td className="px-6 py-4">
                              {user.isPremium? 'Yes': 'No'}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    {user.phoneNumber}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="">{moment(user?.createdAt).format('MMMM Do YYYY')}</p>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
      </div>
    </div>
  );
}