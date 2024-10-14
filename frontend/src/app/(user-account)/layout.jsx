"use client"

import AdminSidebar from '@/components/AdminSidebar';
import AnimatedText from '@/components/AnimatedText';
import UserSidebar from '@/components/UserSidebar';
import { useMainProvider } from '@/providers/MainProvider';
import { useRouter } from 'next/navigation';

const MainLayout = ({ children }) => {
  const {currentUser, loading: userLoading, orgMode} = useMainProvider();
  const router = useRouter();
  if(!userLoading && !currentUser){
    router.push("/login")
  }
  if(orgMode){
    return <AnimatedText text={"You do not have necessary privileges to access this page!"} />;
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