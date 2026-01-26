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
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 animate-fade-in">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <CalendarWidget />
          </div>
          <div className="order-1 lg:order-2">
            <EventsList />
          </div>
        </div>
      </div>
    </div>
  );
}
