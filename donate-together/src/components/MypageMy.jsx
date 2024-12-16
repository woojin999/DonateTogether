import React from "react";
import { useLoginData } from "../context/UserProvider";

function MypageMy(props) {
  const { loginSts, loginId, userKakaoData, isLoadingKakao } = useLoginData();
  const donationData = JSON.parse(localStorage.getItem("donation-data"));

  return (
    <div className="mt-7 border rounded-2xl shadow-lg overflow-hidden p-8">
      <h3 className="text-3xl font-bold text-gray-900">MY</h3>
      <div className="mt-5">
        <div>
          <p className="text-gray-500">총 기부금</p>
          {!isLoadingKakao && (
            <div className="flex justify-between items-end">
              <p className="text-3xl font-bold text-gray-900">
                {donationData
                  .filter(
                    (donation) =>
                      donation.userid ===
                      (loginSts
                        ? loginId // 로그인 상태일 때는 loginId 사용
                        : userKakaoData && userKakaoData.properties
                        ? userKakaoData.properties.nickname // userKakaoData가 존재할 때만 nickname 사용
                        : null) // userKakaoData가 없으면 null 반환
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
                      (loginSts
                        ? loginId // 로그인 상태일 때는 loginId 사용
                        : userKakaoData && userKakaoData.properties
                        ? userKakaoData.properties.nickname // userKakaoData가 존재할 때만 nickname 사용
                        : null) // userKakaoData가 없으면 null 반환
                  ).length
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MypageMy;
