import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from '@/components/ui/command';
import { useMainProvider } from '@/providers/MainProvider';
  import { CreditCard, User } from 'lucide-react';
  import Link from 'next/link';
  
  const UserSidebar = () => {
    const {orgMode, sellerMode} = useMainProvider();
    return (
      <Command className='b rounded-none'>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Account Settings'>
            {
              !orgMode && 
              <>
              <CommandItem>
                <User className='mr-2 h-4 w-4' />
                <Link href='/my-account'>Account</Link>
              </CommandItem>
              {
               sellerMode && 
                <CommandItem>
                  <CreditCard className='mr-2 h-4 w-4' />
                  <Link href='/billing'>My Billing</Link>
                </CommandItem>
              }
              </>
            }
          </CommandGroup>
        </CommandList>
      </Command>
    );
  };
  
  export default UserSidebar;