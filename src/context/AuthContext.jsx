import { createContext, useContext, useState } from 'react';
import { getCookie, removeCookie, setCookie } from '../utils/cookieUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    getCookie('accessToken') ? true : false // 쿠키에 토큰이 있으면 로그인 상태로 설정
  );

  const login = (token) => {
    setIsAuthenticated(true);
    setCookie('accessToken', token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    removeCookie('accessToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
