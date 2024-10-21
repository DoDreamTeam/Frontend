import React from "react";
import useModal from "../../hooks/useModal";
import logo from "../../assets/logo.png";
import GoogleIcon from "../../assets/google.png";
import KakaoIcon from "../../assets/kakao.png";
import NaverIcon from "../../assets/naver.png";
import { useLocation } from "react-router-dom";

const LoginButton = () => {
  const { openModal, Modal } = useModal();
  const location = useLocation();

  const handleGoogleLogin = () => {
    const params = new URLSearchParams({
      scope: "email profile",
      response_type: "code",
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      client_id: import.meta.env.VITE_GOOGLE_ID,
      state: location.pathname,
    });

    const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    window.location.href = GOOGLE_URL;
  };

  const handleKakaoLogin = () => {
    const params = new URLSearchParams({
      response_type: "code",
      redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      client_id: import.meta.env.VITE_KAKAO_ID,
      state: location.pathname,
    });

    const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;

    window.location.href = KAKAO_URL;
  };

  const handleNaverLogin = () => {
    const params = new URLSearchParams({
      response_type: "code",
      redirect_uri: import.meta.env.VITE_NAVER_REDIRECT_URI,
      client_id: import.meta.env.VITE_NAVER_ID,
      state: location.pathname,
    });

    const NAVER_URL = `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;

    window.location.href = NAVER_URL;
  };

  return (
    <>
      <button onClick={openModal} className="hover:text-blue-400">
        로그인
      </button>

      <Modal>
        <div className="flex flex-col items-center p-6">
          <img src={logo} alt="logo" className="mb-4 h-20" />
          <div className="text-xl mb-3">Dodream에 오신 걸 환영합니다!</div>
          <div className="text-m mb-8">
            로그인 후, Dodream의 서비스를 이용해보세요.
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center bg-white p-2 border rounded justify-center shadow-lg"
            >
              <img src={GoogleIcon} alt="google-icon" className="mr-2 h-6" />
              구글로 로그인하기
            </button>
            <button
              onClick={handleKakaoLogin}
              className="flex items-center bg-yellow-300 p-2 rounded justify-center shadow-lg"
            >
              <img src={KakaoIcon} alt="kakao-icon" className="mr-2 h-6" />
              카카오로 로그인하기
            </button>
            <button
              onClick={handleNaverLogin}
              className="flex items-center bg-[#2CB24A] p-2 rounded justify-center shadow-lg"
            >
              <img src={NaverIcon} alt="naver-icon" className="mr-2 h-6" />
              네이버로 로그인하기
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginButton;
