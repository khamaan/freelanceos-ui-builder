import { Topbar } from '@/components/layout/Topbar';
import { TimerWidget } from '@/components/time/TimerWidget';
import { TimeEntriesList } from '@/components/time/TimeEntriesList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { stats, timeEntries } from '@/lib/mockData';
import { Clock, DollarSign, TrendingUp } from 'lucide-react';

export default function TimeTracking() {
  const totalHoursToday = timeEntries
    .filter((e) => e.startTime.startsWith(new Date().toISOString().split('T')[0]))
    .reduce((sum, e) => sum + e.duration, 0);

  const totalEarningsToday = timeEntries
    .filter((e) => e.billable && e.startTime.startsWith(new Date().toISOString().split('T')[0]))
    .reduce((sum, e) => sum + e.duration * e.rate, 0);

  return (
    <div className="min-h-screen">
      <Topbar 
        title="Time Tracking" 
        subtitle={`${stats.hoursThisWeek} hours this week`} 
      />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 animate-fade-in">
        {/* Summary Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hours Today
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHoursToday.toFixed(1)}h</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Earnings Today
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEarningsToday.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2 md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hours This Month
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.hoursThisMonth}h</div>
            </CardContent>
          </Card>
        </div>

        {/* Timer and Entries */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          <div>
            <TimerWidget />
          </div>
          <div className="lg:col-span-2">
            <TimeEntriesList />
          </div>
        </div>
      </div>
    </div>
  );
}
