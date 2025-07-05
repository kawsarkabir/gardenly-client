import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function SuccessStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('/success.json')
      .then((res) => res.json())
      .then((data) => setStories(data));
  }, []);

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          🌱 Community Success Stories
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Real people. Real plants. Real growth. Get inspired by stories from
          our amazing gardening community.
        </p>

        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id}>
                <div className="flex flex-col items-center text-center max-w-sm mx-auto bg-green-50 p-6 rounded-lg shadow hover:shadow-md transition my-10">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-24 h-24 object-cover rounded-full border-4 border-green-300 mb-4"
                  />
                  <p className="text-sm italic text-gray-700 mb-2">
                    “{story.story}”
                  </p>
                  <h4 className="font-bold text-lg">{story.name}</h4>
                  <p className="text-xs text-gray-500">{story.location}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
