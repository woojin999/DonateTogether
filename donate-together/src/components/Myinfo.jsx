import React from "react";
import { useLoginData } from "../context/UserProvider";

function Myinfo(props) {
  const userinfo = JSON.parse(sessionStorage.getItem("loginInfo"));
  const kakao_access_token = sessionStorage.getItem("kakao_access_token");
  const { userKakaoData } = useLoginData();
  console.log(userKakaoData);
  

  return (
    <div className="mt-10">
      <div className="p-8 rounded-2xl shadow-xl overflow-hidden w-full">
        {userinfo && (
          <>
            <div className="mb-4">
              <p className=" text-gray-700 text-sm font-semibold mb-2">
                아이디
              </p>
              <p className="w-full p-3 border border-gray-300 rounded-lg">
                {userinfo.userid}
              </p>
            </div>
            <div className="mb-4">
              <p className=" text-gray-700 text-sm font-semibold mb-2">이름</p>
              <p className="w-full p-3 border border-gray-300 rounded-lg">
                {userinfo.username}
              </p>
            </div>
            <div className="mb-4">
              <p className=" text-gray-700 text-sm font-semibold mb-2">
                이메일
              </p>
              <p className="w-full p-3 border border-gray-300 rounded-lg">
                {userinfo.email}
              </p>
            </div>
            <div className="mb-4">
              <p className=" text-gray-700 text-sm font-semibold mb-2">주소</p>
              <p className="w-full p-3 border border-gray-300 rounded-lg">
                {userinfo.address}
              </p>
            </div>
          </>
        )}
        {kakao_access_token && (
          <>
            <div className="mb-4">
              <p className=" text-gray-700 text-sm font-semibold mb-2">
                카카오 이름
              </p>
              <p className="w-full p-3 border border-gray-300 rounded-lg">
                {userKakaoData.properties.nickname}
              </p>
            </div>
            <div className="mb-4">
              <p className=" text-gray-700 text-sm font-semibold mb-2">
                카카오 이메일
              </p>
              <p className="w-full p-3 border border-gray-300 rounded-lg">
                {userKakaoData.kakao_account.email}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Myinfo;
