import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie } from '../utils/cookieUtils';
import { useQuery } from '@tanstack/react-query';
import api from '../api/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const token = getCookie('accessToken');
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 상태로 관리

  const {
    data: fetchedUserInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      if (!token) return null;
      try {
        const response = await api.get(`/mypage/book/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching user info: ', error);
        throw error;
      }
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (fetchedUserInfo) {
      setUserInfo(fetchedUserInfo);
    }
  }, [fetchedUserInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
