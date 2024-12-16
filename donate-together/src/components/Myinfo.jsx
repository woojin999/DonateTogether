import React from "react";

function Myinfo(props) {
  const userinfo = JSON.parse(sessionStorage.getItem("loginInfo"));
  console.log(userinfo);

  return (
    <div className="mt-10">
      <div className="p-8 rounded-2xl shadow-xl overflow-hidden w-full">
        <div className="mb-4">
          <p className=" text-gray-700 text-sm font-semibold mb-2">아이디</p>
          <p className="w-full p-3 border border-gray-300 rounded-lg">{userinfo.userid}</p>
        </div>
        <div className="mb-4">
          <p className=" text-gray-700 text-sm font-semibold mb-2">이름</p>
          <p className="w-full p-3 border border-gray-300 rounded-lg">{userinfo.username}</p>
        </div>
        <div className="mb-4">
          <p className=" text-gray-700 text-sm font-semibold mb-2">이메일</p>
          <p className="w-full p-3 border border-gray-300 rounded-lg">{userinfo.email}</p>
        </div>
        <div className="mb-4">
          <p className=" text-gray-700 text-sm font-semibold mb-2">주소</p>
          <p className="w-full p-3 border border-gray-300 rounded-lg">{userinfo.address}</p>
        </div>
      </div>
    </div>
  );
}

export default Myinfo;
