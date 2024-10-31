import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setCookie } from "../utils/cookieUtils";
import axios from "axios";

const OAuthVertification = () => {
  const { provider } = useParams();
  const code = new URLSearchParams(window.location.search).get("code");
  const state = new URLSearchParams(window.location.search).get("state");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REST_SERVER}/oauth/${provider}?code=${code}`,
        {},
        { withCredentials: true } // 쿠키를 포함
      );

      // 응답에서 accessToken 추출
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      // 쿠키에 저장
      setCookie("accessToken", accessToken, { path: "/" });
      setCookie("refreshToken", refreshToken, { path: "/" });

      // 리다이렉트
      navigate(state || "/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    login();
  }, [code]);

  return (
    <div className="bg-white shadow-md rounded-lg p-8 text-center">
      <h2 className="text-xl font-semibold mb-4">로그인 중</h2>
      <p className="text-gray-600">잠시만 기다려 주세요...</p>
      <div className="loader mt-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default OAuthVertification;
