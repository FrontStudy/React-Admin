import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import axios from 'axios';
import { urlMemberPost } from '../../service/string'; // Adjust the path based on your project structureimport './styles.css'; // Adjust the path based on your project structure

function Diarymain() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const fetchPosts = async () => {
        try {
            const response = await axios.get(urlMemberPost, {
                params: {
                    offset: 0,
                    size: 50,
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

    const handlePostClick = (postId) => {
        navigate(`/diary/SharedDiarypageDetail/${postId}`);
    };

    return (
        <div className='diarymain diarycontentBox'>
            <h2>어떤 하루를 보냈나요?</h2>
            <div>
                <ul className='MeDiaryListBox'>
                    {posts.map(post => (
                        (post.title && post.content) && (
                            <li key={post.id} className='MeDiaryListLi'>
                                <a className='MeDiaryList' onClick={() => handlePostClick(post.id)}>
                                    <div>
                                        <p className='MeDiaryList-title hidden-scrollbar'>{post.title}</p>
                                        <p className='MeDiaryList-content hidden-scrollbar'>{post.content}</p>
                                        <small>{new Date(post.createdDate).toLocaleDateString()}</small>
                                    </div>
                                </a>
                            </li>
                        )
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Diarymain;