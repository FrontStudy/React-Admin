import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import { urlMemberPost } from '../../service/string'; // Adjust the path based on your project structure

function Diarymain() {
  const [posts, setPosts] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(5); // Define state for slidesPerView
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

    // Function to update the slides per view dynamically based on screen width
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      const maxSlides = Math.min(posts.length, 5); // Ensure we don't show more slides than posts
      const slideWidth = 240; // Adjust the slide width if necessary

      const calculatedSlides = Math.floor(width / slideWidth);
      setSlidesPerView(Math.max(1, Math.min(maxSlides, calculatedSlides)));
    };

    // Initial calculation and add event listener for window resize
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, [posts.length]);

  return (
    <div className='diarymain diarycontentBox'>
      <h2>어떤 하루를 보냈나요?</h2>
      <div className='diaryWiper'>
        <Swiper
          spaceBetween={10}
          slidesPerView={slidesPerView} // Use the dynamic slidesPerView state
          slidesPerGroup={1} // Slide one item at a time
          loop={false} // Disable looping
          onReachEnd={() => console.log('You have reached the end of slides')}
          centeredSlides={false} // Align slides to the start
          watchSlidesProgress={true} // Keep track of slide progress
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
