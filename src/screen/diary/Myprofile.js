import React, { useState, useEffect } from 'react';
import fetchUserDetail from './fetchUserDetail'; // Adjust the path according to your folder structure
import Mymemberinformation from './Mymemberinformation'; // Adjust the path according to your folder structure

function MyProfile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await fetchUserDetail();
      setUserInfo(data);
      setLoading(false);
    };
    getUserInfo();
  }, []);

  const handleEditProfileClick = () => {
    setIsEditingProfile(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditingProfile(false);
  };

  if (isEditingProfile) {
    return <Mymemberinformation onClose={handleCloseEditProfile} />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>Error loading user data</div>;
  }

  return (
    <>
      <div className="ProfileContainer">
        <div className="ProfileImageContainer">
          <img src={userInfo.profilePicture} alt="Profile" />
        </div>
        <div className="ProfileDetails">
          <ul className="ProfileInfo">
            <li className="ProfileInfoItem">
              <span>{userInfo.nickname}</span>
              <button onClick={handleEditProfileClick}>프로필편집</button>
            </li>
            <li className="ProfileStats">
              <span>게시물 {userInfo.diaryCount}</span>
              <span>팔로워 {userInfo.followerCount}</span>
              <span>팔로우 {userInfo.followingCount}</span>
            </li>
            <li>
              <span>{userInfo.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="ProfileContent">
        <div className="Divider"></div>
        <div className="ProfileTabs">
          <button className="TabButton">게시물</button>
          <button className="TabButton">북마크</button>
        </div>
        <div className="PostsContainer">
          <ul className="PostsList">
            {userInfo.posts && userInfo.posts.map((post, index) => (
              <li key={index} className="PostItem"></li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
