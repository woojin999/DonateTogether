import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLoginData } from "../context/UserProvider";

function Donation({ setIsModalVisible, donateIdx }) {
  const [donationAmount, setDonationAmount] = useState(0); // 기부 금액 상태
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const {loginName,userKakaoData,loginSts} = useLoginData();

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  }, []);

  // 모달 닫기
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // 기부 금액 증가 함수
  const increaseDonation = (amount) => {
    setDonationAmount((prevAmount) => prevAmount + amount);
  };

  // 기부 금액 초기화 함수
  const resetDonationAmount = () => {
    setDonationAmount(0);
  };

  const submitDonation = () => {
    if (donationAmount == "") {
      alert("기부 금액을 선택해주세요.");
      return;
    } else if (comment == "") {
      alert("응원 댓글을 작성해주세요.");
      return;
    }

    let data = {
      id: uuidv4(),
      donateIdx: parseInt(donateIdx),
      price: donationAmount,
      contributor: loginSts ? loginName : userKakaoData.properties.nickname,
      comment: comment,
      donationDate: date,
    };

    let locals = JSON.parse(localStorage.getItem("donation-data"));
    locals.push(data);
    localStorage.setItem("donation-data", JSON.stringify(locals));

    const donateData = JSON.parse(localStorage.getItem("donate-data"));

    donateData.find((v) => {
      if (v.id == donateIdx) {
        v.price = v.price + donationAmount;
        v.donateCnt = v.donateCnt + 1;
        return true;
      }
    });
    localStorage.setItem("donate-data", JSON.stringify(donateData));

    setIsModalVisible(false);

    alert("기부완료! 감사합니다.");
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-8 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl text-gray-500"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">기부하기</h2>
        <div className="space-y-4">
          <button
            onClick={() => increaseDonation(1000)}
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            +1천원
          </button>
          <button
            onClick={() => increaseDonation(5000)}
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            +5천원
          </button>
          <button
            onClick={() => increaseDonation(10000)}
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            +1만원
          </button>
          <button
            onClick={() => increaseDonation(50000)}
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            +5만원
          </button>
          <button
            onClick={resetDonationAmount}
            className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
          >
            다시 입력
          </button>
        </div>
        <div className="mt-4">
          <p className="font-semibold">
            기부 금액: {new Intl.NumberFormat().format(donationAmount)}원
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">응원 댓글 쓰기</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg resize-none"
            placeholder="따뜻한 한마디를 남겨주세요"
            required="required"
          ></textarea>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={submitDonation}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            기부하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Donation;
