import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { tasks } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

const statusConfig = {
  'todo': { label: 'To Do', icon: Circle, className: 'bg-secondary text-secondary-foreground' },
  'in-progress': { label: 'In Progress', icon: Clock, className: 'bg-primary/20 text-primary' },
  'review': { label: 'Review', icon: AlertCircle, className: 'bg-warning/20 text-warning' },
  'completed': { label: 'Completed', icon: CheckCircle2, className: 'bg-success/20 text-success' },
};

const priorityConfig = {
  'low': 'bg-secondary text-secondary-foreground',
  'medium': 'bg-primary/20 text-primary',
  'high': 'bg-warning/20 text-warning',
  'urgent': 'bg-destructive/20 text-destructive',
};

export function RecentTasks() {
  const recentTasks = tasks.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Tasks</CardTitle>
        <a href="/tasks" className="text-sm text-primary hover:underline">
          View all
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTasks.map((task) => {
            const status = statusConfig[task.status];
            const StatusIcon = status.icon;
            return (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
              >
                <StatusIcon className={cn('mt-0.5 h-5 w-5', status.className.split(' ')[1])} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-foreground truncate">{task.title}</p>
                    <Badge variant="outline" className={cn('shrink-0', priorityConfig[task.priority])}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground truncate">
                    {task.projectName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
