import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setErrorMessage("아이디와 비밀번호를 입력해 주세요.");
      return;
    }
    // 로그인 처리 로직 추가
    setErrorMessage("");
    console.log("로그인 시도:", { userId, password });
  };

  return (
    <div className="min-h-[750px] flex justify-center items-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full sm:w-[700px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">로그인</h2>

        {/* 오류 메시지 */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="text">
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
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
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

          <button
            type="submit"
            className="w-full py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
          >
            로그인
          </button>

          <div className="text-center mt-4 text-gray-600 text-sm">
            <span>계정이 없으신가요?</span>
            <Link to="/join" className="text-gray-800 font-semibold hover:underline">
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
