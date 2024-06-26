import React, { useState, useEffect } from 'react';
import * as STR from '../../service/string';
import fetchUserDetail from './fetchUserDetail'; // Adjust the path according to your folder structure
import axios from 'axios';

function Mymemberinformation() {
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState('');
  const token = localStorage.getItem(STR.TOKEN); // Adjust according to where your token is stored

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await fetchUserDetail(token);
      if (data) {
        setUserInfo(data);
        setEditedNickname(data.nickname);
      }
    };
    getUserInfo();
  }, [token]);

  const handleChange = (e) => {
    setEditedNickname(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(STR.urlUpdateUserNickname(userInfo.id), { nickname: editedNickname }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data && response.data.status === "success") {
        setUserInfo({ ...userInfo, nickname: editedNickname });
        setIsEditing(false);
      } else {
        console.error('Error updating user data:', response.data);
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div id='mymemberinformation'>
      <div className='UserDetail_info-box'>
        <span className='label'>닉네임: </span>
        {isEditing ? (
          <input
            type='text'
            name='nickname'
            value={editedNickname}
            onChange={handleChange}
            className='editable-input'
          />
        ) : (
          <span className="value">{userInfo.nickname}</span>
        )}
      </div>
      <div className='UserDetail_info-box'>
        <span className='label'>이메일: </span>
        <span className="value">{userInfo.email}</span>
      </div>
      <div className='UserDetail_info-box'>
        <span className='label'>생년월일: </span>
        <span className="value">{userInfo.birthDate}</span>
      </div>
      <div className='UserDetail_info-box'>
        <span className='label'>이름: </span>
        <span className="value">{userInfo.name}</span>
      </div>
      <div className='UserDetail_info-box'>
        <span className='label'>성별: </span>
        <span className="value">{userInfo.gender === 'male' ? 'Male' : 'Female'}</span>
      </div>
      <div className='UserDetail_info-box'>
        <span className='label'>쓴 일기수: </span>
        <span className="value">{userInfo.diaryCount}</span>
      </div>
      <div className='UserDetail_info-box'>
        <span className='label'>팔로워 수: </span>
        <span className="value">{userInfo.followerCount}</span>
      </div>
      <div className='UserDetail_info-box'>
        <span className='label'>팔로잉 수: </span>
        <span className="value">{userInfo.followingCount}</span>
      </div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? '취소' : '수정'}
      </button>
      {isEditing && <button onClick={handleSave}>저장</button>}
    </div>
  );
}

export default Mymemberinformation;
