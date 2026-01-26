import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calendarEvents } from '@/lib/mockData';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Video, AlertTriangle, Bell } from 'lucide-react';

const eventTypeConfig = {
  meeting: { icon: Video, label: 'Meeting' },
  deadline: { icon: AlertTriangle, label: 'Deadline' },
  reminder: { icon: Bell, label: 'Reminder' },
  task: { icon: Calendar, label: 'Task' },
};

export function UpcomingEvents() {
  const upcomingEvents = calendarEvents
    .filter((event) => new Date(event.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 4);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
        <a href="/schedule" className="text-sm text-primary hover:underline">
          View calendar
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event) => {
            const eventType = eventTypeConfig[event.type];
            const EventIcon = eventType.icon;
            return (
              <div
                key={event.id}
                className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
              >
                <div
                  className="mt-0.5 rounded-lg p-2"
                  style={{ backgroundColor: `${event.color}20` }}
                >
                  <EventIcon className="h-4 w-4" style={{ color: event.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{event.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {format(parseISO(event.startDate), 'MMM d, h:mm a')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
