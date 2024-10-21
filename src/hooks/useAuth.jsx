import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookieUtils";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie("accessToken");
    setIsAuthenticated(!!token); // 토큰이 존재하면 true, 아니면 false
  }, []);

  return isAuthenticated;
};

export default useAuth;
