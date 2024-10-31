import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../utils/cookieUtils';

const useUser = (userId) => {
  const [userData, setUserData] = useState(null); // 사용자 데이터
  const [error, setError] = useState(null); // 에러

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie('accessToken'); // 토큰 가져오기
        const response = await axios.get(
          `${import.meta.env.VITE_REST_SERVER}/mypage/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
            },
          }
        );
        setUserData(response.data); // 사용자 데이터 저장
      } catch (err) {
        setError(err);
      }
    };
    fetchUserData();
  }, [userId]);

  return { userData, error };
};

export default useUser;
