import React, { useState } from "react";
import { useLoginData } from "../context/UserProvider";

function MyPage(props) {
  const categories = [
    { subMenu: "MY", subpg: "my" },
    { subMenu: "기부내역", subpg: "mydonatelist" },
    { subMenu: "개인정보", subpg: "myinfo" },
  ];
  const { loginSts, loginName, loginId, isLoadingKakao, userKakaoData } =
    useLoginData();
  const [subMenu, setSubMenu] = useState("my");
  const donationData = JSON.parse(localStorage.getItem("donation-data"));
  return (
    <div className="max-w-4xl mx-auto px-24 lg:px-36 mt-16">
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
            >
              {v.subMenu}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-7 border rounded-2xl shadow-lg overflow-hidden p-8">
        <h3 className="text-3xl font-bold text-gray-900">MY</h3>
        <div className="mt-5">
          <div>
            <p className="text-gray-500">총 기부금</p>
            <div className="flex justify-between items-end">
              <p className="text-3xl font-bold text-gray-900">
                {donationData
                  .filter(
                    (donation) =>
                      donation.userid ===
                      (loginSts ? loginId : userKakaoData.properties.nickname)
                  ) // "admin"인 객체만 필터링
                  .reduce((total, donation) => total + donation.price, 0)}{" "}
                원
              </p>
              <p className="text-gray-900">
                기부횟수: 
                {
                  donationData.filter(
                    (donation) =>
                      donation.userid ===
                      (loginSts ? loginId : userKakaoData.properties.nickname)
                  ).length
                }
              </p>
            </div>
          </div>
          <div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
