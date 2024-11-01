import { getCookie } from "../../utils/cookieUtils";


export const getUserId = () => {
  const token = getCookie("accessToken"); // 쿠키에서 토큰 가져오기
  if (!token) return null; // 토큰이 없으면 null 반환
  const payload = JSON.parse(atob(token.split('.')[1])); // 토큰에서 payload 추출
  return payload.sub; // 사용자 ID 반환
};
