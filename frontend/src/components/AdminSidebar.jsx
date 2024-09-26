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
  import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Notebook
  } from 'lucide-react';
  import Link from 'next/link';
  
  const AdminSidebar = () => {
    return (
      <Command className='b rounded-none'>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
              <CommandItem>
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <Link href='/dashboard'>Dashboard</Link>
              </CommandItem>
              <CommandItem>
                <ShieldCheck className='mr-2 h-4 w-4' />
                <Link href='/admin'>Admin Functions</Link>
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
    );
  };
  
  export default AdminSidebar;