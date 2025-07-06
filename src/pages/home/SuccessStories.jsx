import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SuccessStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('/success.json')
      .then((res) => res.json())
      .then((data) => setStories(data));
  }, []);

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <Fade direction="up">
          <div className="text-center mb-12">
            <p className="uppercase text-[#52b788] font-semibold tracking-wide mb-2">
              From Our Community
            </p>
            <h2 className="text-3xl md:text-4xl font-bold  text-foreground">
              Success Stories from Gardeners
            </h2>
            <p className="  mt-4 max-w-2xl mx-auto text-muted-foreground">
              Real journeys of growth and greenery. Be inspired by fellow
              gardeners transforming their lives and spaces.
            </p>
          </div>
        </Fade>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            pagination={{
              clickable: true,
              el: '.custom-swiper-pagination',
            }}
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
                <div className="bg-white rounded-xl shadow hover:shadow-md transition p-6 flex my-2 flex-col items-center text-center h-full mx-2">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-24 h-24 rounded-full border-4 border-green-400 object-cover mb-4"
                  />
                  <p className="text-gray-700 italic text-sm mb-3">
                    “{story.story}”
                  </p>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {story.name}
                  </h4>
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
