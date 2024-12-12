import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  const fetchAccessToken = async (code) => {
    const REST_API_KEY = "1e4fffbd897ebf6b1036719547a9f2e2"; // 카카오 REST API 키
    const REDIRECT_URI = "http://localhost:5173/kakaologin"; // 리디렉션 URI

    const tokenRequestData = new URLSearchParams();
    tokenRequestData.append("grant_type", "authorization_code");
    tokenRequestData.append("client_id", REST_API_KEY);
    tokenRequestData.append("redirect_uri", REDIRECT_URI);
    tokenRequestData.append("code", code);

    try {
      const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        body: tokenRequestData,
      });

      if (!tokenResponse.ok) {
        // 상태 코드가 2xx가 아닌 경우 에러 처리
        const errorData = await tokenResponse.json();
        
        console.error('토큰 요청 실패:', errorData); // 에러 정보 출력
        return; // 에러가 발생하면 이후 처리를 막음
      }

      const tokenData = await tokenResponse.json();

      if (tokenData.access_token) {
        // Access token을 세션 스토리지에 저장
        sessionStorage.setItem("kakao_access_token", tokenData.access_token);
        // console.log(tokenData.access_token);

        // 로그인 후 대시보드 등으로 이동
        navigate("/");
      } else {
        console.error("토큰 요청 실패:", tokenData);
      }
    } catch (error) {
      console.error("Access token 요청 실패:", error);
    }
  };

  return <div>로그인 중...</div>;
};

export default LoginCallback;