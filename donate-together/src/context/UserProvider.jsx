import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loginSts, setLoginSts] = useState(() => {
    const savedLoginInfo = sessionStorage.getItem("loginInfo");
    return savedLoginInfo ? JSON.parse(savedLoginInfo) : null; // 문자열을 객체로 변환
  });
  const [loginName, setLoginName] = useState(null); // 로그인회원 이름 저장
  const [loginEmail, setLoginEmail] = useState(null); // 로그인회원 이름 저장

  const goNav = useNavigate();
  const goPage = useCallback((param1, param2) => {
    goNav(param1, param2);
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("loginInfo");
    setLoginSts(null);
    setLoginName(null);
    setLoginEmail(null);
    goPage("/");
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginSts,
        loginName,
        setLoginName,
        loginEmail,
        setLoginEmail,
        setLoginSts,
        handleLogout,
        goPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useLoginData = () => useContext(UserContext);
