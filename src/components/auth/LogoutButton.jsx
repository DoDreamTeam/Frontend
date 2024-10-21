import React from "react";
import { removeCookie } from "../../utils/cookieUtils";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("accessToken");
    navigate("/");
    window.location.reload();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
