"use client"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from '@/components/ui/command';
import moment from 'moment';
import { useMainProvider } from '@/providers/MainProvider';
  import {
    Newspaper,
    Users,
    Star,
    PlusCircle,
    User2Icon,
    Notebook,
    CircleChevronLeft,
    CircleChevronRight,
    LogOut,
    Cog,
    ShieldPlus,
    BadgeDollarSign,
    CircleDollarSign,
    Blinds,
    LayoutList
  } from 'lucide-react';

import Link from 'next/link';
import { useState } from 'react';
import { TaskList } from './dropdowns/TaskList';
  
  const Sidebar = () => {
    const [showSideBar, setShowSideBar] = useState(true);
    const { orgMode, currentUser, sellerMode, setUser, setAdminMode, setCurrentUser, setOrgMode,setSellerMode,setCustomProperties, setTempUser, setCurrentClient } = useMainProvider();

    const handleLogout = async () => {
      localStorage.clear();
      setUser(null); setOrgMode(false); setSellerMode(false); setAdminMode(false);
      setCurrentUser(null); setCustomProperties([]);
      setCurrentClient(null); setTempUser(null);
      setSellerMode(false);
      setOrgMode(false);
      router.push("/")
    }
    let days = 365;
    if (currentUser?.isEnterprise) {
      days = 365;
    } else if (currentUser?.isPremium) {
      days = 365;
    } else if(currentUser?.isFreeTrial) {
      days = 7;
    }
    const futureDate = moment(currentUser?.subscriptionDate).add(days, "days").format("YYYY-MM-DD");
    const membershipIsValid = moment(futureDate).isAfter(moment().format("YYYY-MM-DD"));
    
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
       
        
        <div className={`max-h-[100vh] min-h-[70vh] min-w-[300px] ${showSideBar ? 'block md:block': 'hidden'}`}>
          <Command className='rounded-none flex-1 justify-between'>
            <CommandList>
              <CommandGroup heading='Suggestions'>
                {
                  !orgMode && !sellerMode &&
                  <CommandItem>
                    <Blinds className='mr-2 h-4 w-4' />
                    <Link href='/my-properties'>My Properties</Link>
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
                  <CommandItem>
                    <LayoutList className='h-4 w-4' />
                    Tasks and Reminders
                    <TaskList />
                  </CommandItem>
                  
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

            <CommandList>
              <CommandGroup heading='Help'>
                {/* <CommandItem>
                  <Cog className='mr-2 h-4 w-4' />
                  <Link href='/my-account'>Settings</Link>
                </CommandItem> */}
                {
                    !orgMode && (
                      <CommandItem>
                        <BadgeDollarSign className='mr-2 h-4 w-4' />
                        <Link href='/owner-billings'>Billings</Link>
                      </CommandItem>
                    )
                  }
                {
                  (currentUser?.isPremium || currentUser?.isEnterprise) && !membershipIsValid &&
                  <CommandItem>
                    <ShieldPlus className='mr-2 h-4 w-4' />
                    <Link href='/features'>Update Membership</Link>
                  </CommandItem>
                }
                {
                  (currentUser?.isFreeTrial || !currentUser?.isSubscribed) && !orgMode &&
                  <CommandItem>
                    <ShieldPlus className='mr-2 h-4 w-4' />
                    <Link href='/features#pricing'>Upgrade to Premium</Link>
                  </CommandItem>
                }
                <CommandItem>
                  <User2Icon className='mr-2 h-4 w-4' />
                  <Link href='/my-account'>My Profile</Link>
                </CommandItem>
                {
                  !orgMode &&
                  <CommandItem>
                    <CircleDollarSign className='mr-2 h-4 w-4' />
                    <Link href='/billing'>My Billing</Link>
                  </CommandItem>
                }
                <CommandItem>
                  <LogOut className='mr-2 h-4 w-4' />
                  <button onClick={handleLogout}>Logout</button>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
            </CommandList>

          </Command>
        </div>
      </div>
    );
  };
  
  export default Sidebar;