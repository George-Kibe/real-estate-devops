import DashboardCard from '@/components/dashboard/DashboardCard';
// import PostsTable from '@/components/posts/PostsTable';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import { Folder, MessageCircle, Newspaper, User } from 'lucide-react';

export default function AdminMainPage() {
  return (
    <>
      <div className='flex flex-col md:flex-row justify-between gap-5 mb-5'>
        <DashboardCard
          title='Apartments.com'
          count={400}
          icon={<Newspaper className='text-slate-500' size={32} />}
        />
        <DashboardCard
          title='HousingLink'
          count={256}
          icon={<Folder className='text-slate-500' size={32} />}
        />
        <DashboardCard
          title='CommonBond'
          count={750}
          icon={<User className='text-slate-500' size={32} />}
        />
        <DashboardCard
          title='Resources.hud'
          count={0}
          icon={<MessageCircle className='text-slate-500' size={32} />}
        />
      </div>
      <AnalyticsChart />
      {/* <PostsTable title='Latest Posts' limit={5} /> */}
    </>
  );
}