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
  } from 'lucide-react';
  import Link from 'next/link';
  
  const Sidebar = () => {
    const {adminMode, orgMode, currentUser, sellerMode} = useMainProvider();
    return (
      <Command className='b rounded-none'>
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
    );
  };
  
  export default Sidebar;