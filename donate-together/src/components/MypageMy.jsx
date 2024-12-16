import React from "react";
import { useLoginData } from "../context/UserProvider";

function MypageMy(props) {
  const { loginSts, loginId, userKakaoData } = useLoginData();
  const donationData = JSON.parse(localStorage.getItem("donation-data"));
  
  
  return (
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
                    (loginSts ? loginId : (userKakaoData.properties ? userKakaoData.properties.nickname : ""))
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
                    (loginSts ? loginId : (userKakaoData.properties ? userKakaoData.properties.nickname : ""))
                ).length
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MypageMy;
