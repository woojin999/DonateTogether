import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { initmemberData } from "../../func/donate_fn";
import { v4 as uuidv4 } from "uuid";

function Register() {
  const [userId, setUserId] = useState("");
  const [userIdError,setUserIdError] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPostcodeVisible, setIsPostcodeVisible] = useState(false);
  const [date, setDate] = useState("");
  
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  }, []);
  
  let memberData = JSON.parse(localStorage.getItem("member-data"));

  const handleSubmit = (e) => {
    e.preventDefault();

    const isUser = memberData.find((member) => member.userid === userId);

    if (isUser) {
      setUserIdError(true);  // 아이디 중복 에러
      setErrorMessage("이미 존재하는 아이디입니다.");
      return;
    } else {
      setUserIdError(false); // 아이디 중복 아님
    }

    if (!userId) {
      setErrorMessage("아이디를 입력해 주세요.");
      return;
    } else if (!password) {
      setErrorMessage("비밀번호를 입력해 주세요.");
      return;
    } else if (!name) {
      setErrorMessage("이름을 입력해 주세요.");
      return;
    } else if (!email) {
      setErrorMessage("이메일을 입력해 주세요.");
      return;
    } else if (!address) {
      setErrorMessage("주소를 입력해 주세요.");
      return;
    }

    // 회원가입 처리 로직 추가
    setErrorMessage("");

    initmemberData();


    let newData = {
      uuid: uuidv4(),
      userid: userId,
      password: password,
      username: name,
      email: email,
      date: date,
      address: address + " " + extraAddress,
    };

    memberData.push(newData);

    localStorage.setItem("member-data", JSON.stringify(memberData));

    console.log("회원가입 시도:", newData);
  };

  // 주소가 선택되었을 때 처리하는 함수
  const handlePostcodeComplete = (data) => {
    setAddress(data.roadAddress); // 도로명 주소
    setExtraAddress(data.extraAddress || ""); // 상세 주소 (optional)
    setIsPostcodeVisible(false); // 주소 검색 팝업 닫기
  };

  // 주소 검색 팝업을 열고 닫는 함수
  const togglePostcodePopup = () => {
    setIsPostcodeVisible(!isPostcodeVisible);
  };

  return (
    <div className="min-h-[750px] flex justify-center items-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full sm:w-[700px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          회원가입
        </h2>

        {/* 오류 메시지 */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 아이디 입력 */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="userId"
            >
              아이디
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="아이디를 입력하세요"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-4">
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

          {/* 이름 입력 */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="이름을 입력하세요"
            />
          </div>

          {/* 이메일 입력 */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="이메일을 입력하세요"
            />
          </div>

          {/* 주소 입력 */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="address"
            >
              주소
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="address"
                value={address}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="주소를 검색하세요"
              />
              <button
                type="button"
                onClick={togglePostcodePopup}
                className="w-1/4 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
              >
                검색
              </button>
            </div>
            <input
              type="text"
              value={extraAddress}
              onChange={(e) => setExtraAddress(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="상세 주소를 입력하세요"
            />
            {/* {extraAddress && (
            )} */}
          </div>

          {/* Daum 주소 팝업 */}
          {isPostcodeVisible && (
            <DaumPostcode
              onComplete={handlePostcodeComplete}
              autoClose={false} // 팝업 창 닫히지 않게 설정
            />
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
