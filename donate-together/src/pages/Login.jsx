import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initmemberData } from "../../func/donate_fn";
import { useLoginData } from "../context/UserProvider";

function Login() {
  const [userId, setUserId] = useState("guest");
  const [password, setPassword] = useState("1111");
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoginSts, goPage } = useLoginData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setErrorMessage("아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    initmemberData();

    let memberData = JSON.parse(localStorage.getItem("member-data"));

    let result = memberData.find((v) => {
      if (v.userid == userId) return true;
    }); // 아이디 존재여부 찾기

    if (!result) {
      setErrorMessage("아이디가 존재하지 않습니다");
      return;
    } else {
      if (result.password == password) {
        sessionStorage.setItem("loginInfo", JSON.stringify(result)); // 로그인 정보 저장
        setLoginSts(sessionStorage.getItem("loginInfo")); // 로그인 상태 업데이트
      } else {
        setErrorMessage("비밀번호가 틀렸습니다.");
        return;
      }
    }
    setErrorMessage("");
    goPage("/");
  };

  //   카카오 로그인 버튼 클릭 → 카카오 로그인 페이지로 리디렉션.
  // 카카오 로그인 완료 → 카카오는 인증 코드 (code)를 redirect_uri에 첨부하여 리디렉션.
  // 리디렉션 후 코드 추출 → 리액트에서 URL에서 인증 코드를 추출.
  // 카카오 API로 Access Token 요청 → 인증 코드를 사용하여 access token을 요청.
  // Access Token을 세션 스토리지에 저장 → 얻은 access_token을 sessionStorage에 저장하여 이후 사용.

  const handleKakaoLogin = () => {
    let REST_API_KEY = "c6a565a9fd74e9db2346c1c630dd5faf";
    // let REDIRECT_URI = "http://localhost:5173/kakaologin"; // 개발용 리디렉션 URI
    const REDIRECT_URI = "https://donate-together-wjlee.vercel.app/kakaologin"; // 배포용 리디렉션 URI

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoURL;
  };

  return (
    <div className="min-h-[750px] flex justify-center items-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full sm:w-[700px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          로그인
        </h2>

        {/* 오류 메시지 */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="text"
            >
              아이디
            </label>
            <input
              type="userId"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div className="flex gap-5">
            <Link
              to="/"
              className="w-full py-3 bg-gray-400 text-center text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
            >
              홈으로
            </Link>
            <button
              type="submit"
              className="w-full py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
            >
              로그인
            </button>
          </div>

          <div className="flex justify-center mt-5 mx-auto" onClick={handleKakaoLogin}>
            <img
              src="/images/kakao_login_large_wide.png"
              alt="kakao_login"
              className="h-12 object-contain cursor-pointer"
            />
          </div>

          <div className="text-center mt-4 text-gray-600 text-sm">
            <span>계정이 없으신가요?</span>
            <Link
              to="/join"
              className="text-gray-800 font-semibold hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
