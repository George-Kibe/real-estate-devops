"use client"

import AdminSidebar from '@/components/AdminSidebar';
import { useMainProvider } from '@/providers/MainProvider';
import { useRouter } from 'next/navigation';

const MainLayout = ({ children }) => {
  const {currentUser, loading: userLoading} = useMainProvider();
  const router = useRouter();
  if(!userLoading && !currentUser){
    router.push("/login")
  }
  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='p-5 w-full'>{children}</div>
    </div>
  );
};

export default MainLayout;