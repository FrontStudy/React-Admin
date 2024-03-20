import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Diarymain() {
    
    return (
        <div className='diarymain diarycontentBox' style={{"background":"var(--diary-five-color)"}}>
          <h2>어떤 하루를 보냈나요?</h2>
          <div className='diaryWiper'>
            <Swiper
              spaceBetween={50}
              slidesPerView={5}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide className='SwiperSlide'>Slide 1</SwiperSlide>
              <SwiperSlide className='SwiperSlide'>Slide 2</SwiperSlide>
              <SwiperSlide className='SwiperSlide'>Slide 3</SwiperSlide>
              <SwiperSlide className='SwiperSlide'>Slide 4</SwiperSlide>
              <SwiperSlide className='SwiperSlide'>Slide 5</SwiperSlide>
              <SwiperSlide className='SwiperSlide'>Slide 6</SwiperSlide>
              <SwiperSlide className='SwiperSlide'>Slide 7</SwiperSlide>
            </Swiper>
          </div>
        </div>
    );
}

export default Diarymain;