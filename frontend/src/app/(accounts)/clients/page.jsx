"use client"

import AnimatedText from "@/components/AnimatedText";
import InviteClientModal from "@/components/modals/InviteClientModal";
import { Button } from "@/components/ui/button";
import {Trash2, Pencil} from 'lucide-react';
import { useState } from "react";

export default function MembersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const clients = [
    {client_name: "Erick Carlsen", address: "00100 Nairobi", email: "georgekibew@gmail.com", phone_number: "0704817466", city: "Nairobi"},
    {client_name: "George Carlsen", address: "00100 Nyeri", email: "gkw@gmail.com", phone_number: "07952881566", city: "Nyeri"},
  ]
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
                  <td className="px-6 py-4">
                    <div className="">
                      <Trash2 className="text-red-500" />
                    </div>
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