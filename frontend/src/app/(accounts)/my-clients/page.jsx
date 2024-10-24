"use client"

import AnimatedText from "@/components/AnimatedText";
import InviteClientModal from "@/components/modals/AddClientModal";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import {Trash2, Pencil} from 'lucide-react';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

export default function MembersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState();
  const {currentUser, tempUser, orgMode} = useMainProvider();

  const fetchClients = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/clients/?owner_id=${currentUser?._id}`);
      const data = response.data
      //console.log("My Clients Data: ", data.results.filter((client) => client.staff_id === tempUser?._id));
      setClients(data.results.filter((client) => client.staff_id === tempUser?._id));
      //setClients(data.results);
    } catch (error) {
      toast.error("Fetching Clients failed. Try Again!")
    }
  }
 
  useEffect(() => {
    fetchClients()
  }, [loading])
  useEffect(() => {
    if (searchText) {
      const filteredClients = clients.filter((client) =>
        client.client_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setClients(filteredClients);
    } else {
      fetchClients();
    }
  }, [searchText])

  const deleteClient = async (client_id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/clients/${client_id}`);
      if (response.status === 200){
        toast.success("Client deleted successfully!")
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to delete client")
    }
    setLoading(false)
  }
  const editClient = async(client) => {
    setClient(client)
    setModalOpen(true)
  }
  
  const addClient= async() => {
    setClient(null)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"Clients Allocated to Me"} />
      <InviteClientModal client={client} isOpen={modalOpen} onClose={closeModal} setLoading={setLoading} />
        {/* <Button className='self-start mx-4' onClick={addClient}>
          {loading? "Loading" : "Add Client"}
        </Button> */}
        <input
          type="text"
          placeholder="Search by Name"
          className="self-start mx-4 rounded-md bg-background px-3 py-2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      {
        !clients?.length && <p className="">No client(s) have been allocated to you yet!</p>
      }
      <div className="overflow-hidden rounded-lg border shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">#</th>
              <th scope="col" className="px-6 py-4 font-medium">Name</th>
              <th scope="col" className="px-6 py-4 font-medium">Address</th>
              <th scope="col" className="px-6 py-4 font-medium">Phone Number</th>
              <th scope="col" className="px-6 py-4 font-medium">City</th>
              <th scope="col" className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y ">
            {
              clients?.map((client, index) => (
                <tr className="" key={index}>
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <th className="flex gap-3 px-6 py-4 font-normal">
                    <div className="text-sm">
                      <div className="font-medium ">{client.client_name}</div>
                      {/* <div className="">{client.email}</div> */}
                    </div>
                  </th>

                  <td className="px-6 py-4 text-sm">{client.address}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                      >
                        {client.phone_number}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{client.city}</td>
                  <td className="px-6 py-4 flex gap-2">
                    {/* <button className="" onClick={() => deleteClient(client.pkid)}>
                      <Trash2 className="text-red-500" />
                    </button> */}
                    <button className="" onClick={() => editClient(client)}>
                      <Pencil className="text-gray-500" />
                    </button>
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