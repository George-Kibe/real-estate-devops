"use client"

import AnimatedText from "@/components/AnimatedText";
import InviteMemberModal from "@/components/modals/InviteMemberModal";
import { Button } from "@/components/ui/button";
import { useMainProvider } from "@/providers/MainProvider";
import axios from "axios";
import {CirclePlus, Eye, Loader} from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MembersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {currentUser, orgMode} = useMainProvider()
  const [members, setMembers] = useState([])
  const router = useRouter();
  //console.log("Members: ", currentUser?.members)

  const getMembers = async() => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/members/?owner_id=${currentUser?._id}`);
      // console.log("Members Fetched : ", response.data)
      setMembers(response.data);
    } catch (error) {
      toast.error("Fetching Members failed. Try Again!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMembers()
  }, [])
  
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
    <div className='flex flex-col justify-between gap-5 mb-5 text-[#0B2B5F]'>
      <AnimatedText text={"Staff Members Page"} />
      <InviteMemberModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        setLoading={setLoading} 
      />
      {
        !orgMode && (
          <Button className='self-start mx-4' onClick={addMember}>
            {loading? "Loading" : <p className="flex items-center gap-1">
              <CirclePlus />Add Member</p>}
          </Button>
        )
      }
      {
        loading && (
          <div className="flex flex-row gap-2 tex-2xl justify-center items-center">
            <Loader className="animate-spin w-24 h-24" />
            Loading ...
          </div>
        )
      }
      {
        !members?.length && <p className="text-center">You do not have any Staff Members yet!</p>
      }
      <div className="overflow-hidden rounded-lg border shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="border-b-2 mb-2">
            <tr className="">
              <th scope="col" className="p-1 font-medium">#</th>
              <th scope="col" className="p-1 font-medium">FirstName</th>
              <th scope="col" className="p-1 font-medium">LastName</th>
              <th scope="col" className="p-1 font-medium">Role</th>
              <th scope="col" className="p-1 font-medium">Status</th>
              <th scope="col" className="p-1 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y ">
            {
              members?.map((member, index) => (
                <tr className="" key={index}>
                  <td className="p-1">{index +1}.</td>
                  <td className="p-1">{member.firstName || member.name}</td> 
                  <td className="p-1">{member.lastName}</td>        
                  <td className="p-1">{member.role}</td>
                  <td className="p-1">{member.status || 'Active'}</td>
                  <td className="p-1">
                    <Button className="flex items-center gap-1" onClick={() => viewMember(member._id)}>
                      <Eye />
                      View
                    </Button>
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