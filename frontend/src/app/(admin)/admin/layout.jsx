"use client"

import AdminSidebar from '@/components/AdminSidebar';
import { useMainProvider } from '@/providers/MainProvider';
import { useRouter } from 'next/navigation';

const MainLayout = ({ children }) => {
  const {currentUser, loading: userLoading, orgMode} = useMainProvider();
  const admins = ["gkw@gmail.com", "abdulsimba@gmail.com", "gk@gmail.com"];
  
  const router = useRouter();
  if(!userLoading && !currentUser){
    router.push("/login")
  }

  if(!orgMode && !admins.includes(currentUser?.email)){
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl font-bold'>You do not have the necessary priveleges to view this page.</h1>
      </div>
    )
  }
  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='p-5 w-full'>{children}</div>
    </div>
  );
};

export default MainLayout;