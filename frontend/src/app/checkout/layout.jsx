"use client"

import UserSidebar from '@/components/UserSidebar';
import { useMainProvider } from '@/providers/MainProvider';
import { useRouter } from 'next/navigation';

const MainLayout = ({ children }) => {
  const {currentUser, loading: userLoading} = useMainProvider();
  const router = useRouter();
  if(!userLoading && !currentUser){
    router.push("/login")
  }
  return (
    <>
      <div className='flex'>
        <div className='hidden md:block h-[100vh] w-[300px]'>
          <UserSidebar />
        </div>
        <div className='p-5 w-full md:max-w-[1140px]'>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;