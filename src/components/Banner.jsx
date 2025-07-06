import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { Button } from '@/components/ui/button';
import { asset } from '@/assets/assets';
import { Fade } from 'react-awesome-reveal';

const slides = [
  {
    id: 1,
    title: '🌿 Urban Garden Meetup',
    desc: 'Join us this Saturday to explore balcony gardening tips and compost hacks!',
    image: asset.garden1,
  },
  {
    id: 2,
    title: '🌸 Community Plant Swap',
    desc: 'Bring a plant, take a plant! Let’s grow together with shared greenery.',
    image: asset.garden2,
  },
  {
    id: 3,
    title: '🌱 Hydroponics Workshop',
    desc: 'Discover soil-free growing at our hydroponics hands-on session.',
    image: asset.garden3,
  },
];

export default function Banner() {
  return (
    <div>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-[91vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-screen bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#001F1Dcc] to-[#004D3Bcc] flex items-center justify-center text-white">
                <div className="max-w-xl text-center px-4 space-y-4">
                  <Fade delay={"0.5"} direction='down'>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      {slide.title}
                    </h2>
                  </Fade>
                  <p className="text-lg">{slide.desc}</p>
                  <Button className=" bg-[#52b788] hover:bg-[#40916c] text-white">
                    Explore Event
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
