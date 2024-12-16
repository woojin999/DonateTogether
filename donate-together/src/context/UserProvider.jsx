import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loginSts, setLoginSts] = useState(() => {
    const savedLoginInfo = sessionStorage.getItem("loginInfo");
    return savedLoginInfo ? JSON.parse(savedLoginInfo) : null; // 문자열을 객체로 변환
  });
  const [kakaoLoginSts, setkakaoLoginSts] = useState(() => {
    const savedLoginInfo = sessionStorage.getItem("kakao_access_token");
    return savedLoginInfo ? savedLoginInfo : null; // 문자열을 객체로 변환
  });

  const [loginName, setLoginName] = useState(null); // 로그인회원 이름 저장
  const [loginId, setLoginId] = useState(null); // 로그인회원 아이디 저장
  const [loginEmail, setLoginEmail] = useState(null); // 로그인회원 이메일 저장

  const [userKakaoData, setUserKakaoData] = useState(null);
  const [isLoadingKakao, setIsLoadingKakao] = useState(true); // 로딩 상태 추가

  const goNav = useNavigate();
  const goPage = useCallback((param1, param2) => {
    goNav(param1, param2);
  }, []);
  

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("loginInfo");
    sessionStorage.removeItem("kakao_access_token");
    setLoginSts(null);
    setLoginName(null);
    setLoginEmail(null);
    setLoginId(null);
    setUserKakaoData(null);
    setkakaoLoginSts(null);
    goPage("/");
  }, []);

  useEffect(() => {
      const accessToken = sessionStorage.getItem("kakao_access_token");
  
      if (accessToken) {
        fetch("https://kapi.kakao.com/v2/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUserKakaoData(data);
            setIsLoadingKakao(false);
          })
          .catch((error) => {
            console.error("사용자 정보 요청 실패:", error);
            setIsLoadingKakao(false);
          });
      } else {
        setIsLoadingKakao(false);
      }
    }, []);

  return (
    <UserContext.Provider
      value={{
        loginSts,
        loginName,
        setLoginName,
        loginEmail,
        setLoginEmail,
        loginId,
        setLoginId,
        setLoginSts,
        handleLogout,
        goPage,
        userKakaoData,
        setUserKakaoData,
        isLoadingKakao,
        setIsLoadingKakao,
        kakaoLoginSts,
        setkakaoLoginSts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useLoginData = () => useContext(UserContext);
