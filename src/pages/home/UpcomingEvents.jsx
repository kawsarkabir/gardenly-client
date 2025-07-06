import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function GardeningEvents() {
  const events = [
    {
      id: 1,
      date: '2025-07-15',
      title: 'Community Composting Workshop',
      location: 'City Park, Green Hall',
      image: 'https://i.postimg.cc/9QsjQ6cs/event1.jpg',
      description:
        'Learn the basics of composting to reduce waste and enrich your garden soil.',
      registrationLink: '#',
    },
    {
      id: 2,
      date: '2025-07-25',
      title: 'Hydroponics Basics Seminar',
      location: 'Online Zoom',
      image: 'https://i.postimg.cc/mDyxVh7G/event2.png',
      description:
        'Discover how to grow plants without soil in this informative online seminar.',
      registrationLink: '#',
    },
    {
      id: 3,
      date: '2025-08-05',
      title: 'Balcony Garden Contest',
      location: 'Neighborhood Center',
      image: 'https://i.postimg.cc/MpnSx6Jy/event3.jpg',
      description:
        'Show off your balcony garden skills and compete for great prizes.',
      registrationLink: '#',
    },
  ];

  return (
    <section className="my-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="uppercase text-[#52b788] font-semibold tracking-wide mb-2">
          Upcoming Events
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Our Exclusive Events
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Stay updated with the latest workshops, seminars, and contests in our
          gardening community. Join events to learn, share, and grow together.
        </p>
      </div>

      <ul className="space-y-8">
        {events.map(
          ({
            id,
            image,
            title,
            date,
            location,
            description,
            registrationLink,
          }) => (
            <li
              key={id}
              className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white rounded-lg shadow hover:shadow-md transition p-6"
            >
              {/* Event Image */}
              <img
                src={image}
                alt={title}
                className="w-full md:w-40 h-28 rounded-lg object-cover flex-shrink-0"
                loading="lazy"
              />

              {/* Event Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 mb-1">{description}</p>
                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mt-2">
                  <span>
                    📅{' '}
                    {new Date(date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span>📍 {location}</span>
                </div>
              </div>

              {/* Registration Button */}
              <div className="mt-4 md:mt-8">
                <Link href={registrationLink}>
                  <Button
                    size={'lg'}
                    className=" bg-green-600 hover:bg-green-700   transition"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
