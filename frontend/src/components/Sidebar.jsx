import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from '@/components/ui/command';
import { useMainProvider } from '@/providers/MainProvider';
  import {
    LayoutDashboard,
    Newspaper,
    Users,
    CreditCard,
    Settings,
    Star,
    User,
    User2Icon
  } from 'lucide-react';
  import Link from 'next/link';
  
  const Sidebar = () => {
    const {orgMode, currentUser, sellerMode} = useMainProvider();
    return (
      <Command className='b rounded-none'>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            {
              orgMode || sellerMode &&
              <CommandItem>
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <Link href='/dashboard'>Dashboard</Link>
              </CommandItem>
            }
            {
                orgMode || sellerMode && 
                <CommandItem>
                  <Users className='mr-2 h-4 w-4' />
                  <Link href='/users'>Users</Link>
                </CommandItem>
              }
            {
              !orgMode && !sellerMode &&
              <CommandItem>
                <Star className='mr-2 h-4 w-4' />
                <Link href='/favorites'>Favorites</Link>
              </CommandItem>
            }
            {
              orgMode || sellerMode && 
              <>
              <CommandItem>
                <Newspaper className='mr-2 h-4 w-4' />
                <Link href='/reports'>Reports</Link>
              </CommandItem>
              <CommandItem>
                <Users className='mr-2 h-4 w-4' />
                <Link href='/members'>{orgMode? `${currentUser?.name} 's Members` : "My members"}
                </Link>
              </CommandItem>
              <CommandItem>
                <User2Icon className='h-4 w-4' />
                <User2Icon className='mr-2 h-4 w-4' />
                <Link href='/clients'>Clients</Link>
              </CommandItem>
            </>
            }
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            {
              !orgMode && 
              <>
              <CommandItem>
                <User className='mr-2 h-4 w-4' />
                <Link href='/my-account'>My Account</Link>
              </CommandItem>
              {
                orgMode || sellerMode && 
                <CommandItem>
                  <CreditCard className='mr-2 h-4 w-4' />
                  <Link href='/billing'>Billing</Link>
                </CommandItem>
              }
              </>
            }
          </CommandGroup>
        </CommandList>
      </Command>
    );
  };
  
  export default Sidebar;