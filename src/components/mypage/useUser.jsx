import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/cookieUtils';

const useUser = (userId) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = getCookie('accessToken');
      const response = await axios.get(
        `${import.meta.env.VITE_REST_SERVER}/mypage/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return { userData, setUserData, error };
};

export default useUser;
