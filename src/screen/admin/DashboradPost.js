import React, { useState, useEffect } from 'react';
import * as API from '../../service/api';

function DashboardPost() {
  const [topCommentedPost, setTopCommentedPost] = useState({ title: '', content1: '', content2: '', content3: '' });
  const [topLikedPost, setTopLikedPost] = useState({ title: '', content1: '', content2: '', content3: '' });

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      // 예시 API 호출
      const commentedPostData = await API.servicesPostData();
      const likedPostData = await API.servicesPostData();

      if (commentedPostData.status === "success" && likedPostData.status === "success") {
        setTopCommentedPost({
          title: '댓글을 가장 많이 받은 게시물',
          content1: commentedPostData.data.content1,
          content2: commentedPostData.data.content2,
          content3: commentedPostData.data.content3
        });
        setTopLikedPost({
          title: '좋아요를 가장 많이 받은 게시물',
          content1: likedPostData.data.content1,
          content2: likedPostData.data.content2,
          content3: likedPostData.data.content3
        });
      }
    } catch (error) {
      console.error('게시글 데이터를 불러오는데 실패했습니다.', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>{topCommentedPost.title}</h2>
        <div style={contentStyle}>
          <p>{topCommentedPost.content1}</p>
          <p>{topCommentedPost.content2}</p>
          <p>{topCommentedPost.content3}</p>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={titleStyle}>{topLikedPost.title}</h2>
        <div style={contentStyle}>
          <p>{topLikedPost.content1}</p>
          <p>{topLikedPost.content2}</p>
          <p>{topLikedPost.content3}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  flex: 1,
  margin: '10px',
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const titleStyle = {
  padding: '10px 0',
  fontSize: '20px',
  fontWeight: 'bold'
};

const contentStyle = {
  border: '1px solid black',
  padding: '10px'
};

export default DashboardPost;