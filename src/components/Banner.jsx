import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import Slide from './Slide';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80',
    title: 'Discover Luxury at Your Fingertips',
    text: 'Browse through a selection of premium hotels and find your perfect room, all with just a few clicks.',
  },
  {
    image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?q=80&w=1974&auto=format&fit=crop&q=80',
    title: 'Your Dream Stay Awaits',
    text: 'Find top-rated hotels tailored to your preferences and book your ideal room in minutes.',
  },
  {
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80',
    title: 'Escape to Comfort and Style',
    text: 'Experience comfort and luxury like never before with our wide range of exclusive hotel options.',
  },
];

export default function Banner() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full"
    >
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-pagination-bullet"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper h-[75vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Slide {...slide} />
          </SwiperSlide>
        ))}
        <div className="swiper-button-next !text-white after:!text-2xl"></div>
        <div className="swiper-button-prev !text-white after:!text-2xl"></div>
      </Swiper>
    </motion.div>
  );
}