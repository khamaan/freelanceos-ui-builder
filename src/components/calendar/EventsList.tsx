import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Video, AlertTriangle, Bell, Calendar } from 'lucide-react';
import { calendarEvents } from '@/lib/mockData';
import { format, parseISO, isAfter } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const eventTypeConfig = {
  meeting: { icon: Video, label: 'Meeting' },
  deadline: { icon: AlertTriangle, label: 'Deadline' },
  reminder: { icon: Bell, label: 'Reminder' },
  task: { icon: Calendar, label: 'Task' },
};

export function EventsList() {
  const upcomingEvents = calendarEvents
    .filter((event) => isAfter(parseISO(event.startDate), new Date()))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingEvents.map((event) => {
          const eventType = eventTypeConfig[event.type];
          const EventIcon = eventType.icon;
          return (
            <div
              key={event.id}
              className="group flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
            >
              <div
                className="mt-0.5 rounded-lg p-2"
                style={{ backgroundColor: `${event.color}20` }}
              >
                <EventIcon className="h-4 w-4" style={{ color: event.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground">{event.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {event.description}
                    </p>
                  </div>
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
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" style={{ 
                    backgroundColor: `${event.color}10`,
                    borderColor: `${event.color}30`,
                    color: event.color 
                  }}>
                    {eventType.label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {format(parseISO(event.startDate), 'MMM d, h:mm a')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
