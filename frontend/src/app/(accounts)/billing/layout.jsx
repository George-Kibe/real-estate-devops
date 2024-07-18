"use client"

import AnimatedText from '@/components/AnimatedText';
import Sidebar from '@/components/Sidebar';
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
          <Sidebar />
        </div>
        <div className='p-5 w-full md:max-w-[1140px]'>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;