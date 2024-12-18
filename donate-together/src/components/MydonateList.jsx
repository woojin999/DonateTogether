import React from "react";
import { useLoginData } from "../context/UserProvider";

function MydonateList(props) {
  const { loginSts, loginId, userKakaoData } = useLoginData();
  const donationData = JSON.parse(localStorage.getItem("donation-data"));
  const donateListData = JSON.parse(localStorage.getItem("donate-data"));

  // 1. donation 배열에서 userid가 로그인한 회원 항목만 필터링
  const adminDonations = donationData.filter(
    (don) =>
      don.userid === (loginSts ? loginId : (userKakaoData.properties ? userKakaoData.properties.nickname : ""))
  );

  // 2. adminDonations의 donateIdx와 donatelist의 id가 일치하는 항목을 결합
  const resultData = donateListData
    .map((don) => {
      // 해당 id와 일치하는 donateIdx 찾기
      const matchingDonations = adminDonations.filter(
        (d) => d.donateIdx === don.id
      );

      // 일치하는 donateIdx가 있으면 그 항목과 함께 반환
      if (matchingDonations.length > 0) {
        return {
          title: don.title, // donatelist의 데이터
          donations: matchingDonations, // 해당하는 donation 배열
        };
      }
      return null; // 일치하는 항목이 없으면 null
    })
    .filter((d) => d !== null); // null 제거
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-5">나의 기부내역</h2>
      <ul>
        {resultData.length == 0 && (
          <p>기부 내역이 없습니다.</p>
        )}
        {resultData.map((v) =>
          v.donations.map((donation, index) => (
            <li key={index} className="border rounded-2xl p-5 mb-5">
              <p className="text-sm mb-1">{donation.donationDate}</p>
              <p className="mb-1">{v.title}</p>
              <p className="text-xl font-bold">{donation.price}원</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default MydonateList;
