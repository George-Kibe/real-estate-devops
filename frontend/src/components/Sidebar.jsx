"use client"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from '@/components/ui/command';
import { useMainProvider } from '@/providers/MainProvider';
  import {
    Newspaper,
    Users,
    Star,
    PlusCircle,
    User2Icon,
    Notebook,
    CreditCard,
    CircleChevronLeft,
    CircleChevronRight,
  } from 'lucide-react';

import Link from 'next/link';
import { useState } from 'react';
  
  const Sidebar = () => {
    const [showSideBar, setShowSideBar] = useState(true);
    const {adminMode, orgMode, currentUser, sellerMode} = useMainProvider();
    
    return (
      <div className='flex flex-col'>
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
          <Command className='rounded-none'>
            <CommandInput placeholder='Type a command or search...' />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading='Suggestions'>
                {
                  !orgMode && !sellerMode &&
                  <CommandItem>
                    <Star className='mr-2 h-4 w-4' />
                    <Link href='/favorites'>Favorites</Link>
                  </CommandItem>
                }
                {
                  !orgMode && !sellerMode &&
                  <CommandItem>
                    <Notebook className='mr-2 h-4 w-4' />
                    <Link href='/services'>Services</Link>
                  </CommandItem>
                }
                {
                  (orgMode || sellerMode) && 
                  <>
                  <CommandItem>
                    <PlusCircle className='mr-2 h-4 w-4' />
                    <Link href='/add-visit'>Add Visit</Link>
                  </CommandItem>
                  <CommandItem>
                    <Newspaper className='mr-2 h-4 w-4' />
                    <Link href='/reports'>Reports</Link>
                  </CommandItem>
                  <CommandItem>
                    <Users className='mr-2 h-4 w-4' />
                    <Link href='/members'>{orgMode? `${currentUser?.name} 's Members` : "Staff Members"}
                    </Link>
                  </CommandItem>
                  <CommandItem>
                    <User2Icon className='h-4 w-4' />
                    <User2Icon className='mr-2 h-4 w-4' />
                    <Link href='/clients'>Clients</Link>
                  </CommandItem>
                  {
                    !orgMode && (
                      <CommandItem>
                        <CreditCard className='mr-2 h-4 w-4' />
                        <Link href='/owner-billings'>Billings</Link>
                      </CommandItem>
                    )
                  }
                  {
                    orgMode && (
                      <CommandItem>
                        <User2Icon className='h-4 w-4' />
                        <User2Icon className='mr-2 h-4 w-4' />
                        <Link href='/my-clients'>Allocated Clients</Link>
                      </CommandItem>
                    )
                  }
                </>
                }
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </div>
      </div>
    );
  };
  
  export default Sidebar;