import React, { useEffect, useState } from "react";
import { getDonateById } from "../api/donate";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Donation from "../components/Donation";

function DonateDetail() {
  const donateData = JSON.parse(localStorage.getItem("donate-data"));
  const { id } = useParams(); // URL에서 id 추출
  const [donate, setDonate] = useState(null); // 초기값을 null로 설정
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달의 표시 여부

  useEffect(() => {
    const fetchDonate = async () => {
      const data = await getDonateById(id);
      if (data) {
        setDonate(data); // 데이터가 있으면 상태 업데이트
      } else {
        console.log("No data found for this id");
      }
    };

    fetchDonate(); // 데이터 fetch 호출
  }, [id, donate]); // id 값이 바뀔 때마다 호출

  // 조건부 렌더링: donate가 null 또는 undefined일 경우 렌더링을 하지 않음
  if (!donate) {
    return <Loading />; // 데이터가 로드되지 않았을 때 로딩 메시지 출력
  }

  // 모달 열기
  const openModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="grid gap-12 grid-cols-1 md:grid-cols-[7fr_3fr]">
      <div>
        <img
          src={`/images/${donate.image}`}
          alt={donate.image}
          className="rounded-2xl w-full h-[500px] object-cover"
        />
        <p>{donate.content}</p>
      </div>
      <div>
        <h2 className="font-extrabold text-2xl mb-10">{donate.title}</h2>
        <div className="text-right border border-gray-300 rounded-xl p-6 shadow-lg mb-10">
          <p className="text-xl font-bold text-gray-800 mb-2">
            모금함 기부 현황
          </p>
          <p className="text-lg text-gray-600 mb-1">
            총 기부{" "}
            <span className="font-bold text-black">
              {new Intl.NumberFormat().format(donate.price)}
            </span>
            원
          </p>
          <p className="text-lg text-gray-600 mb-3">
            기부 <span className="font-bold text-black">{donate.donateCnt}</span>번 달성!
          </p>
          <p className="border-t-2 border-gray-300 mb-4 pb-2 text-xs pt-4">
            *기부금은 100% 단체에 전달됩니다.
          </p>

          {/* 기부하기 버튼 */}
          <button
            onClick={openModal}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          >
            기부하기
          </button>
        </div>

        <div className="border border-gray-300 rounded-xl p-6 shadow-lg text-left">
          <h3 className="font-semibold border-b-2 border-gray-300 pb-3 mb-3">
            같이 기부해요
          </h3>
          {donateData
            .slice(0, 5) // 최대 6개 항목만 렌더링
            .filter((item) => item.id !== id) // 현재 페이지의 id와 일치하는 항목은 제외
            .map((item) => (
              <Link
                key={item.id}
                className="flex mb-3"
                to={`/donates/${item.id}`}
              >
                <img
                  src={`/images/${item.image}`}
                  alt={`/images/${item.image}`}
                  className="w-24 h-auto max-h-16 object-contain mr-2"
                />

                <p className="flex-1 h-14 line-clamp-2 overflow-hidden text-ellipsis pt-1">
                  {item.title}
                </p>
              </Link>
            ))}
        </div>
      </div>

      {/* 모달 팝업 */}
      {isModalVisible && (
        <Donation setIsModalVisible={setIsModalVisible} donateIdx={id} />
      )}
    </div>
  );
}

export default DonateDetail;
