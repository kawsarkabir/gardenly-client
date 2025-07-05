export default function GardeningEvents() {
  const events = [
    {
      id: 1,
      date: '2025-07-15',
      title: 'Community Composting Workshop',
      location: 'City Park, Green Hall',
    },
    {
      id: 2,
      date: '2025-07-25',
      title: 'Hydroponics Basics Seminar',
      location: 'Online Zoom',
    },
    {
      id: 3,
      date: '2025-08-05',
      title: 'Balcony Garden Contest',
      location: 'Neighborhood Center',
    },
  ];

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-6">Upcoming Gardening Events</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="border rounded p-4 hover:bg-green-50 transition"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{event.title}</span>
              <span className="text-sm text-gray-600">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{event.location}</p>
          </li>
        ))}
      </ul>
      <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        See All Events
      </button>
    </section>
  );
}
