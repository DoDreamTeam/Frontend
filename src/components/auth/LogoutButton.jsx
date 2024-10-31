import React from "react";
import { removeCookie } from "../../utils/cookieUtils";

const LogoutButton = () => {
  const handleLogout = () => {
    removeCookie("accessToken");
    window.location.reload();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
