import React, { useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookieUtils';
import api from '../../api/api';
import { getUserId } from './GetUserId';

const GetUser = (userId) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const logInUserId = getUserId();

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/mypage/${userId}`, {});
      setUserData(response.data);
    } catch (err) {
      setError(err);
      console.error('Error fetching user data:', err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return { userData, setUserData, error, refetch: fetchUserData };
};

export default GetUser;
