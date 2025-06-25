import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from '@/components/ui/command';
  import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Notebook,
    CircleChevronLeft,
    CircleChevronRight
  } from 'lucide-react';

import Link from 'next/link';
import { useState } from 'react';
  
  const AdminSidebar = () => {
    const [showSideBar, setShowSideBar] = useState(true);
    return (
      <div className='hidden md:flex md:flex-col'>
      {
        showSideBar? ( 
        <CircleChevronLeft 
          className='h-6 w-6 cursor-pointer self-end' 
          onClick={() => setShowSideBar(false)} 
        />): (
        <CircleChevronRight
          className='h-6 w-6 cursor-pointer' 
          onClick={() => setShowSideBar(true)} 
        />
        )
      }      
        <div className={`max-h-[100vh] min-w-[300px] ${showSideBar ? 'block md:block': 'hidden'}`}>
          <Command className='b rounded-none'>
            <CommandInput placeholder='Type a command or search...' />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading='Suggestions'>
                  <CommandItem>
                    <LayoutDashboard className='mr-2 h-4 w-4' />
                    <Link href='/admin'>Admin Dashboard</Link>
                  </CommandItem>
                  <CommandItem>
                    <ShieldCheck className='mr-2 h-4 w-4' />
                    <Link href='/admin-functions'>Admin Functions</Link>
                  </CommandItem>
                  <CommandItem>
                    <Users className='mr-2 h-4 w-4' />
                    <Link href='/users'>Users</Link>
                  </CommandItem>
                  <CommandItem>
                    <Notebook className='mr-2 h-4 w-4' />
                    <Link href='/clients-billing'>Clients Billing</Link>
                  </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    );
  };
  
  export default AdminSidebar;