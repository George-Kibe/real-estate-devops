"use client"

import AnimatedText from "@/components/AnimatedText";
import InviteClientModal from "@/components/modals/AddClientModal";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import {Trash2, Pencil, CirclePlus, Eye} from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//const BACKEND_URL = "http://localhost:8000"

export default function MembersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [client, setClient] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');
  const [deleteTitle, setDeleteTitle] = useState('');

  const {currentUser, tempUser} = useMainProvider();
  const router = useRouter();

  const fetchClients = async() => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/clients/?owner_id=${currentUser?._id}`);
      const data = response.data
      // console.log("Clients Data: ", data)
      setClients(data.results);
    } catch (error) {
      toast.error("Fetching Clients failed. Try Again!")
    }
  }
 
  useEffect(() => {
    fetchClients();
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

  const deleteClient = async () => {
    if (!clientId){
      toast.error("No client to delete!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/clients/${clientId}`);
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
  const closeModal = () => {
    setModalOpen(false)
  }
  const handleDelete = (client_id, title) => {
    setClientId(client_id);
    setDeleteTitle(title)
    setDeleteModalOpen(true)
  }
  const viewClient = (client_id) => {
    router.push(`/clients/${client_id}`)
  }
  
  const addClient= async() => {
    setClient(null)
    setModalOpen(true)
  }
  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
  }
  
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"All Clients"} />
      <InviteClientModal 
        client={client} 
        isOpen={modalOpen} 
        onClose={closeModal} 
        setLoading={setLoading} 
      />
      <ConfirmDeleteModal 
        deleteAction={deleteClient} 
        title={deleteTitle} 
        isOpen={deleteModalOpen} 
        onClose={closeDeleteModal} 
        setLoading={setLoading} 
      />

      <Button className='self-start' onClick={addClient}>
        {loading? "Loading" : <p className="flex items-center gap-1">
          <CirclePlus />Add Client</p>}
      </Button>
      <input
        type="text"
        placeholder="Search by Name"
        className="self-start rounded-md bg-background px-3 py-2"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {
        !clients?.length && <p className="">You do not have any clients yet!</p>
      }
      <div className="overflow-hidden rounded-lg border shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="border-b-2">
            <tr>
              <th scope="col" className="p-1 font-medium">#</th>
              <th scope="col" className="p-1 font-medium">First Name</th>
              <th scope="col" className="p-1 font-medium">Last Name</th>
              <th scope="col" className="p-1 font-medium">HouseType</th>
              <th scope="col" className="p-1 font-medium">Status</th>
              <th scope="col" className="p-1 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y ">
            {
              clients?.map((client, index) => (
                <tr className="self-center" key={index}>
                  <td className="p-1 text-sm">{index + 1}.</td>
                  <td className="p-1 text-sm">{client.first_name}</td>
                  <td className="p-1 text-sm">{client.last_name}</td>
                  <td className="p-1">
                    <div className="flex gap-2">
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                      >
                        {client.house_type}
                      </span>
                    </div>
                  </td>
                  <td className="p-1">{client.status || "Active"}</td>
                  <td className="p-1 flex gap-2">
                    <button className="" onClick={() => viewClient(client.pkid)}>
                     <Eye className="text-green-500" />
                    </button>
                    <button className="" onClick={() => handleDelete(client.pkid, client?.client_name)}>
                      <Trash2 className="text-red-500" />
                    </button>
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