import axios from 'axios';
import * as STR from '../../service/string';

const fetchUserDetail = async (token) => {
  try {
    const response = await axios.get(STR.urlDetailInfo, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.data && response.data.status === "success") {
      return response.data.data; // Return the correct user data
    } else {
      console.error('Error fetching user data:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

export default fetchUserDetail;