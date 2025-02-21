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
  if (orgMode) {
    return (
      <div className='flex'>
        <AnimatedText 
          text={"You do not have the necessary priveleges to view Agency Billings"} 
        />
      </div>
    )
  }
  return (
    <div className='flex'>
      <Sidebar />
      <div className='p-5 w-full'>{children}</div>
    </div>
  );
};

export default MainLayout;