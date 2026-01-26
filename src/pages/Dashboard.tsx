import { Topbar } from '@/components/layout/Topbar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ProjectDistributionChart } from '@/components/dashboard/ProjectDistributionChart';
import { RecentTasks } from '@/components/dashboard/RecentTasks';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';
import { stats } from '@/lib/mockData';

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Topbar 
        title="Dashboard" 
        subtitle={`${stats.hoursThisWeek} hours tracked this week`} 
      />
      <div className="p-6 space-y-6 animate-fade-in">
        <StatsCards />
        <div className="grid gap-6 lg:grid-cols-3">
          <RevenueChart />
          <ProjectDistributionChart />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentTasks />
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}
