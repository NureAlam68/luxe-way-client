// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../assets/bgHotel.jpg'
import bgimg2 from '../assets/bgOutside.jpg'
import bgimg3 from '../assets/bgRoom.jpg'

export default function Banner() {
  return (
    <div className='w-full'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg3}
            title='Discover Luxury at Your Fingertips'
            text='Browse through a selection of premium hotels and find your perfect room, all with just a few clicks.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            title='Your Dream Stay Awaits'
            text='Find top-rated hotels tailored to your preferences and book your ideal room in minutes.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg1}
            title='Escape to Comfort and Style'
            text='Experience comfort and luxury like never before with our wide range of exclusive hotel options.'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
