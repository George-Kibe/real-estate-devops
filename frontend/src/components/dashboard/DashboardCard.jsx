import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

// interface DashboardCardProps {
//   title: string;
//   count: number;
//   icon: React.ReactElement<LucideIcon>;
// }

const DashboardCard = ({ title, count, icon }) => {
  return (
    <Card className='p-2'>
      <CardContent className='flex flex-row gap-4 justify-between'>
        <h3 className='text-center mb-2 font-semibold'>
          {title}
          <p className='text-2xl font-semibold'>
            {count}
          </p>
        </h3>
        <div className='flex-end'>
          <div className="bg-[#E5FBDE] p-2 md:p-4 rounded-sm">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;