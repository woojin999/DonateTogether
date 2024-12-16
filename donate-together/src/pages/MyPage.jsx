import React, { useState } from "react";
import { useLoginData } from "../context/UserProvider";
import MypageMy from "../components/MypageMy";
import MydonateList from "../components/MydonateList";
import Myinfo from "../components/Myinfo";

function MyPage(props) {
  const categories = [
    { subMenu: "MY", subpg: "my" },
    { subMenu: "기부내역", subpg: "mydonatelist" },
    { subMenu: "개인정보", subpg: "myinfo" },
  ];
  const {
    loginSts,
    loginName,
    loginId,
    isLoadingKakao,
    userKakaoData,
    handleLogout,
  } = useLoginData();
  const [subMenu, setSubMenu] = useState("my"); // 서브메뉴 상태변수

  // 메뉴 변경
  const clickButton = (e) => {
    let btnText = e.target.innerText;

    switch (btnText) {
      case "MY":
        setSubMenu("my");
        break;
      case "기부내역":
        setSubMenu("mydonatelist");
        break;
      case "개인정보":
        setSubMenu("myinfo");
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[700px] px-24 lg:px-36 mt-16">
      <h2 className="font-bold text-3xl text-center">마이페이지</h2>
      <div className="mt-7">
        <p className="mb-2 text-xl">기부천사</p>
        {loginSts && <p className="font-bold text-4xl">{loginName}님</p>}
        {!isLoadingKakao && userKakaoData && (
          <p className="font-bold text-4xl">
            {userKakaoData.properties.nickname}님
          </p>
        )}
      </div>
      <div className="mt-7 border rounded-2xl shadow-md overflow-hidden p-2">
        <ul className="flex justify-evenly">
          {categories.map((v, i) => (
            <li
              key={i}
              className="py-2 px-4 bg-gray-200 border-r hover:bg-gray-300 transition-all duration-300 cursor-pointer rounded-2xl"
              onClick={clickButton}
            >
              {v.subMenu}
            </li>
          ))}
          <li
            key="logout"
            className="py-2 px-4 bg-gray-200 border-r hover:bg-gray-300 transition-all duration-300 cursor-pointer rounded-2xl"
            onClick={handleLogout}
          >
            로그아웃
          </li>
        </ul>
      </div>
      {subMenu == "my" && <MypageMy />}
      {subMenu == "mydonatelist" && <MydonateList />}
      {subMenu == "myinfo" && <Myinfo />}
    </div>
  );
}

export default MyPage;
