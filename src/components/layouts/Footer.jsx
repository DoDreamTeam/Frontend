import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="flex justify-center items-center px-8 py-4 bg-gray-100 w-full">
      <div className="flex justify-between items-center w-full max-w-screen-lg">
        <div className="flex flex-col items-start ml-2">
          <img
            src={logo}
            alt="logo"
            className="h-20"
            onClick={() => navigate("/")}
          />
          <div className="text-left text-sm text-gray-400 mb-4">
            <p>Copyright © DoDream. All rights reserved.</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <span
            className="cursor-pointer text-gray-600 hover:text-gray-400"
            onClick={() => alert("서비스 소개 클릭!")}
          >
            서비스 소개
          </span>
          <a
            href="https://github.com/DoDreamTeam"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-gray-600 hover:text-gray-400"
          >
            깃허브 바로가기
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
