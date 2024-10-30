import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtils";

const API_URL = import.meta.env.VITE_REST_SERVER;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalReq = err.config;
    if (err.response && err.response.status === 403 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        const response = await refreshTokenHandler();
        // 정상 재발급시
        if (response.status === 200) {
          setCookie("accessToken", response.data.accessToken);
          originalReq.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api.request(originalReq);
        }
      } catch (error) {
        console.log("토큰 재발급 실패", error);
        removeCookie("accessToken");
        return Promise.reject(err);
      }
    }
  }
);

const refreshTokenHandler = async () => {
  try {
    if (getCookie("accessToken")) {
      const response = await api.post("/refresh-token");
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export default api;
