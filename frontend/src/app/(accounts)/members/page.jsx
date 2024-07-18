"use client"

import AnimatedText from "@/components/AnimatedText";
import InviteMemberModal from "@/components/modals/InviteMemberModal";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import {Trash2, Pencil, CirclePlus, Eye} from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MembersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
 const {currentUser} = useMainProvider()
  const members = currentUser?.members
  const router = useRouter();
  //console.log("Members: ", currentUser?.members)
  
  const addMember= async() => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const viewMember = (id) => {
    router.push(`/members/${id}`)
  }
  
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"Staff Members Page"} />
      <InviteMemberModal isOpen={modalOpen} onClose={closeModal} setLoading={setLoading} />
        <Button className='self-start' onClick={addMember}>
          {loading? "Loading" : <p className="flex items-center gap-1"><CirclePlus />Add Member</p>}
        </Button>
      {
        !members?.length && <p className="">You do not have any Staff/Members yet!</p>
      }
      <div className="overflow-hidden rounded-lg border shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">#</th>
              <th scope="col" className="px-6 py-4 font-medium">FirstName</th>
              <th scope="col" className="px-6 py-4 font-medium">LastName</th>
              <th scope="col" className="px-6 py-4 font-medium">Role</th>
              <th scope="col" className="px-6 py-4 font-medium">Status</th>
              <th scope="col" className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y ">
            {
              members?.map((member, index) => (
                <tr className="" key={index}>
                  <td className="px-6 py-4">{index +1}.</td>
                  <td className="px-6 py-4">{member.firstName || member.name}</td> 
                  <td className="px-6 py-4">{member.lastName}</td>        
                  <td className="px-6 py-4">{member.role}</td>
                  <td className="px-6 py-4">{member.status || 'Active'}</td>
                  <td className="px-6 py-4">
                    <Button className="flex items-center gap-1" onClick={() => viewMember(member._id)}>
                      <Eye />
                      View
                    </Button>
                  </td>
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