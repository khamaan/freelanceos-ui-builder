import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { calendarEvents } from '@/lib/mockData';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  addMonths,
  subMonths
} from 'date-fns';
import { cn } from '@/lib/utils';

export function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDay = (day: Date) => {
    return calendarEvents.filter((event) =>
      isSameDay(parseISO(event.startDate), day)
    );
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4 flex-wrap gap-2">
        <CardTitle className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="sm" className="ml-2 gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Event</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
        <div className="grid grid-cols-7 gap-px rounded-lg bg-border overflow-hidden">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div
              key={`${day}-${i}`}
              className="bg-muted py-1.5 sm:py-2 text-center text-xs font-medium text-muted-foreground"
            >
              <span className="sm:hidden">{day}</span>
              <span className="hidden sm:inline">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</span>
            </div>
          ))}
          {days.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            const isToday = isSameDay(day, today);
            const isCurrentMonth = isSameMonth(day, currentMonth);

            return (
              <div
                key={index}
                className={cn(
                  'min-h-[50px] sm:min-h-[80px] bg-card p-0.5 sm:p-1 transition-colors hover:bg-accent/50',
                  !isCurrentMonth && 'bg-muted/50'
                )}
              >
                <div
                  className={cn(
                    'mb-0.5 sm:mb-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-xs sm:text-sm',
                    isToday && 'bg-primary text-primary-foreground font-medium',
                    !isToday && !isCurrentMonth && 'text-muted-foreground'
                  )}
                >
                  {format(day, 'd')}
                </div>
                <div className="space-y-0.5 hidden sm:block">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="truncate rounded px-1 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${event.color}20`,
                        color: event.color,
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="px-1 text-xs text-muted-foreground">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
                {dayEvents.length > 0 && (
                  <div className="sm:hidden flex justify-center">
                    <div 
                      className="h-1.5 w-1.5 rounded-full" 
                      style={{ backgroundColor: dayEvents[0].color }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
