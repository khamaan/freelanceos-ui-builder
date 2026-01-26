import { DollarSign, Clock, FolderKanban, CheckSquare, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { stats } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const statsConfig = [
  {
    label: 'Total Revenue',
    value: stats.totalRevenue,
    format: 'currency',
    icon: DollarSign,
    change: 12.5,
    changeType: 'positive' as const,
  },
  {
    label: 'Pending Payments',
    value: stats.pendingPayments,
    format: 'currency',
    icon: Clock,
    change: -5.2,
    changeType: 'negative' as const,
  },
  {
    label: 'Active Projects',
    value: stats.activeProjects,
    format: 'number',
    icon: FolderKanban,
    change: 2,
    changeType: 'positive' as const,
  },
  {
    label: 'Completed Tasks',
    value: stats.completedTasks,
    format: 'number',
    icon: CheckSquare,
    change: 8,
    changeType: 'positive' as const,
  },
];

function formatValue(value: number, format: string) {
  if (format === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
  return value.toLocaleString();
}

export function StatsCards() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat) => (
        <Card key={stat.label} className="relative overflow-hidden">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground truncate">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl md:text-3xl font-bold text-foreground">
                  {formatValue(stat.value, stat.format)}
                </p>
                <div className="mt-2 flex items-center gap-1 flex-wrap">
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="h-4 w-4 text-success flex-shrink-0" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive flex-shrink-0" />
                  )}
                  <span
                    className={cn(
                      'text-sm font-medium',
                      stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                    )}
                  >
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                  <span className="text-sm text-muted-foreground hidden sm:inline">vs last month</span>
                </div>
              </div>
              <div className="rounded-lg bg-primary/10 p-2 md:p-3 flex-shrink-0">
                <stat.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
