
import { CalendarDays } from 'lucide-react'
import React from 'react'
import { ReminderActions } from './ReminderActions'

const CallReminder = ({index, reminder, showDeleteModal, setShowDeleteModal, setReminderToDelete}) => {
  return (
    <div index={index} className='w-full md:w-1/4 p-2 mb-4'>
        <div className="flex justify-between mr-4 items-center">
            <h2 className={`text-sm rounded-md px-2 p-1 w-16 items-center h-8 text-white ${reminder.priority === "High" ? "bg-red-500" : "bg-green-500"}`}>{reminder.priority}
            </h2>
            <ReminderActions 
                setReminderToDelete={setReminderToDelete}
                setShowDeleteModal={setShowDeleteModal} 
                showDeleteModal={showDeleteModal}
                reminder={reminder}
            />
        </div>
        <p className="flex gap-2 text-xs my-2"> <CalendarDays className='w-4 h-4' /> {reminder.date}</p>
        <h2 className="font-bold my-2">{reminder.title}</h2>
        <div className="flex gap-4 items-center">
            <p className="font-semibold">Apartment:</p> 
            <p className="text-sm">{reminder.property?.title}</p>
        </div>
        <div className="flex gap-4">
            <p className="font-semibold">Landlord:</p> 
            {reminder.landlord_name}
        </div>
        <div className="flex gap-4">
            <p className="font-semibold">Address:</p> 
            {reminder.property_name_and_address}
        </div>
        <div className="flex gap-4">
            <p className="font-semibold">Email:</p> 
            {reminder.email}
        </div>
        <div className="flex gap-4">
            <p className="font-semibold">Phone No</p>
            {reminder.contact}
        </div>
        <div className="flex gap-4">
            <p className="font-semibold">Notes:</p>
            {reminder.notes}
        </div>
        {
            reminder.attachments && (
                <div className="flex flex-col gap-2">
                    <h2 className='font-semibold'>Attachments: </h2>
                    {
                        reminder.attachments.map((attachment, index) => (
                            <div key={index} className="flex flex-row gap-2">
                                <p>{index + 1}</p>
                                <p>{attachment.name}</p>
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default CallReminder
