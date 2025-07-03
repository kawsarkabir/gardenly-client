import { useEvents } from '@/hooks/useEvents';
import { Card, CardContent } from '@/components/ui/card';

export default function UpcomingEvents() {
  const { data: events = [], isLoading } = useEvents();

  if (isLoading) return <p className="text-center py-10">Loading events...</p>;

  return (
    <section className="py-16 bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          🌿 Upcoming Gardening Events
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <Card key={i} className="bg-white text-black shadow-md">
              <img
                src={event.image}
                alt={event.title}
                className="h-48 w-full object-cover rounded-t"
              />
              <CardContent className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  📅 {event.date} | 📍 {event.location}
                </p>
                <p className="text-gray-700">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
