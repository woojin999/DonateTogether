import React, { useEffect, useState } from "react";
import { getDonateById } from "../api/donate";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

function DonateDetail() {
  const { id } = useParams(); // URL에서 id 추출
  const [donate, setDonate] = useState(null); // 초기값을 null로 설정

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
  }, [id]); // id 값이 바뀔 때마다 호출

  // 조건부 렌더링: donate가 null 또는 undefined일 경우 렌더링을 하지 않음
  if (!donate) {
    return <Loading />; // 데이터가 로드되지 않았을 때 로딩 메시지 출력
  }

  return (
    <div className="grid gap-16 grid-cols-1 md:grid-cols-[7fr_3fr]">
      <div>
        <img
          src={`/images/${donate.image}`}
          alt={donate.image}
          className="rounded-2xl w-full h-[500px] object-cover"
        />
        <p>{donate.content}</p>
      </div>
      <div>
        <h2>{donate.title}</h2>
        <p>{new Intl.NumberFormat().format(donate.price)}원</p>
      </div>
    </div>
  );
}

export default DonateDetail;
