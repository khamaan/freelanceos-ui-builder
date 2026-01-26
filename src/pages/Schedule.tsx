import { Topbar } from '@/components/layout/Topbar';
import { CalendarWidget } from '@/components/calendar/CalendarWidget';
import { EventsList } from '@/components/calendar/EventsList';

export default function Schedule() {
  return (
    <div className="min-h-screen">
      <Topbar 
        title="Schedule" 
        subtitle="Manage your calendar and events" 
      />
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CalendarWidget />
          </div>
          <div>
            <EventsList />
          </div>
        </div>
      </div>
    </div>
  );
}
