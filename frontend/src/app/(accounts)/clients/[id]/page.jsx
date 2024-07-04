"use client"

import AnimatedText from "@/components/AnimatedText";
import InviteClientModal from "@/components/modals/InviteClientModal";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import {Trash2, Pencil} from 'lucide-react';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const BACKEND_URL = "http://localhost:8000"

export default function MembersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const {currentUser} = useMainProvider();

  const fetchClients = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/clients/?owner_id=${currentUser?._id}`);
      const data = response.data
      console.log("Clients Data: ", data)
      setClients(data.results);
    } catch (error) {
      toast.error("Fetching Clients failed. Try Again!")
    }
  }
 
  useEffect(() => {
    fetchClients()
  }, [loading])

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
  const editClient = async() => {
    try {
      
    } catch (error) {
      
    }
  }
  
  const addClient= async() => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"Clients Page"} />
      <InviteClientModal isOpen={modalOpen} onClose={closeModal} setLoading={setLoading} />
        <Button className='self-start' onClick={addClient}>
          {loading? "Loading" : "Add Client"}
        </Button>
      {
        !clients?.length && <p className="">You do not have any clients yet!</p>
      }
      <div className="overflow-hidden rounded-lg border shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="">
            <tr>
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
                  <th className="flex gap-3 px-6 py-4 font-normal">
                    <div className="text-sm">
                      <div className="font-medium ">{client.client_name}</div>
                      <div className="">{client.email}</div>
                    </div>
                  </th>

                  <td className="px-6 py-4">{client.address}</td>
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
                    <button className="" onClick={() => deleteClient(client.pkid)}>
                      <Trash2 className="text-red-500" />
                    </button>
                    <button className="" onClick={editClient}>
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