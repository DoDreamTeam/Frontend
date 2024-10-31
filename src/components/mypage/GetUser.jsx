import React, { useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookieUtils';
import api from '../../api/api'; // axios 설정된 api 모듈
import { getUserId } from './GetUserId'; // 로그인한 사용자 ID 가져오기

const GetUser = (userId) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const logInUserId = getUserId(); // 로그인한 사용자 ID

  const fetchUserData = async () => {
    try {
      const token = getCookie('accessToken');
      const response = await api.get(`/mypage/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

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

  // 로그인한 사용자 ID와 URL의 userId가 다를 때 로그인한 사용자 정보를 가져옴
  useEffect(() => {
    if (userId !== logInUserId) {
      fetchUserData(logInUserId); // 로그인한 사용자 ID로 다시 호출
    }
  }, [userId, logInUserId]);

  return { userData, setUserData, error };
};

export default GetUser;
