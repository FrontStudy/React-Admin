import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import { urlMemberPost } from '../../service/string'; // Adjust the path based on your project structure

function Diarymain() {
  const [posts, setPosts] = useState([]);
  const itemsPerPage = 10;

  const fetchPosts = async () => {
      try {
          const response = await axios.get(urlMemberPost, {
              params: {
                  offset: 0,
                  size: itemsPerPage,
              },
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          setPosts(response.data.data);
      } catch (error) {
          console.error('Failed to load member posts.', error);
      }
  };

  useEffect(() => {
      fetchPosts();
  }, []);

  return (
      <div className='diarymain diarycontentBox'>
          <h2>어떤 하루를 보냈나요?</h2>
          <div className='diaryWiper'>
              <Swiper
                  spaceBetween={50}
                  slidesPerView={5}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
              >
                  {posts.map(post => (
                      <SwiperSlide key={post.id} className='SwiperSlide'>
                          <h3>{post.title}</h3>
                          <p>{post.content}</p>
                          <small>{new Date(post.createdDate).toLocaleDateString()}</small>
                      </SwiperSlide>
                  ))}
              </Swiper>
          </div>
      </div>
  );
}

export default Diarymain;
