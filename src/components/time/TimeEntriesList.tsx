import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, DollarSign } from 'lucide-react';
import { timeEntries } from '@/lib/mockData';
import { format, parseISO } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TimeEntriesList() {
  const groupedEntries = timeEntries.reduce((acc, entry) => {
    const date = format(parseISO(entry.startTime), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, typeof timeEntries>);

  const sortedDates = Object.keys(groupedEntries).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Time Entries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sortedDates.map((date) => {
          const entries = groupedEntries[date];
          const totalHours = entries.reduce((sum, e) => sum + e.duration, 0);
          const totalEarnings = entries
            .filter((e) => e.billable)
            .reduce((sum, e) => sum + e.duration * e.rate, 0);

          return (
            <div key={date} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">
                  {format(parseISO(date), 'EEEE, MMMM d')}
                </h4>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{totalHours.toFixed(1)} hours</span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5" />
                    {totalEarnings.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="group flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium text-foreground">
                          {entry.description || entry.taskName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {entry.projectName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-medium text-foreground">
                          {entry.duration.toFixed(1)}h
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(parseISO(entry.startTime), 'h:mm a')} -{' '}
                          {entry.endTime
                            ? format(parseISO(entry.endTime), 'h:mm a')
                            : 'Now'}
                        </p>
                      </div>
                      {entry.billable && (
                        <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                          ${(entry.duration * entry.rate).toFixed(0)}
                        </Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
