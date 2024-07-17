"use client"

import AnimatedText from "@/components/AnimatedText";
import InviteMemberModal from "@/components/modals/InviteMemberModal";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import {Trash2, Pencil} from 'lucide-react';
import { useState } from "react";

export default function MembersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
 const {currentUser} = useMainProvider()
  const members = currentUser?.members
  //console.log("Members: ", currentUser?.members)
  
  const addMember= async() => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"Members Page"} />
      <InviteMemberModal isOpen={modalOpen} onClose={closeModal} setLoading={setLoading} />
        <Button className='self-start' onClick={addMember}>
          {loading? "Loading" : "Add Member"}
        </Button>
      {
        !members?.length && <p className="">You do not have any Staff/Members yet!</p>
      }
      <div className="overflow-hidden rounded-lg border shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">#</th>
              <th scope="col" className="px-6 py-4 font-medium">Name</th>
              <th scope="col" className="px-6 py-4 font-medium">Role</th>
              <th scope="col" className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y ">
            {
              members?.map((member, index) => (
                <tr className="" key={index}>
                  <td className="px-6 py-4">{index +1}.</td>
                  <th className="flex gap-3 px-6 py-4 font-normal">
                    <div className="relative h-10 w-10">
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={member.image}
                        alt="Profile Image"
                      />
                      {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium ">{member.name}</div>
                      <div className="">{member.email}</div>
                    </div>
                  </th>
          
                  <td className="px-6 py-4">{member.role}</td>
                  <td className="px-6 py-4">{member.status || 'Active'}</td>
                  {/* <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <Trash2 className="text-red-500" />
                    </div>
                  </td> */}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}