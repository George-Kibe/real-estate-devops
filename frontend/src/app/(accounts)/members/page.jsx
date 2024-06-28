"use client"

import AnimatedText from "@/components/AnimatedText";
import InviteMemberModal from "@/components/modals/InviteMemberModal";
import { useMainProvider } from "@/providers/MainProvider";
import {Trash2, Pencil} from 'lucide-react';
import { useState } from "react";

export default function MembersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {currentUser} = useMainProvider()
  console.log("Members: ", currentUser?.members)
  const members = currentUser?.members
  
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
        <button onClick={addMember} className='bg-primary border-primary border self-start rounded-md inline-flex items-center justify-center py-3   px-7 text-center text-base font-medium text-white hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'>
        {loading? "Loading" : "Add Member"}
      </button>
      <div className="overflow-hidden rounded-lg border shadow-md m-5">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Name</th>
              <th scope="col" className="px-6 py-4 font-medium">Role</th>
              <th scope="col" className="px-6 py-4 font-medium">Team</th>
              <th scope="col" className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y ">
            {
              members?.map((member, index) => (
                <tr className="" key={index}>
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
          
                  <td className="px-6 py-4">Product Designer</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                      >
                        Design
                      </span>
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                      >
                        Product
                      </span>
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
                      >
                        Develop
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <Trash2 className="text-red-500" />
                      <Pencil />
                    </div>
                  </td>
                </tr>
              ))
            }
            <tr className="">
              <th className="flex gap-3 px-6 py-4 font-normal">
                <div className="relative h-10 w-10">
                  <img
                    className="h-full w-full rounded-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                </div>
                <div className="text-sm">
                  <div className="font-medium ">Steven Jobs</div>
                  <div className="">jobs@sailboatui.com</div>
                </div>
              </th>
      
              <td className="px-6 py-4">Product Designer</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                  >
                    Design
                  </span>
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                  >
                    Product
                  </span>
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
                  >
                    Develop
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-4">
                  <Trash2 className="text-red-500" />
                  <Pencil />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}