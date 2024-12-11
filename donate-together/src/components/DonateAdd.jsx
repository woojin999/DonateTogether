import React, { useEffect, useRef, useState } from "react";
import { useData } from "../context/StsProvider";
import { FaImage } from "react-icons/fa";
import { useLoginData } from "../context/userProvider";

function DonateAdd({ clickButton, setDataUpdated }) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const { boardSts, setBoardSts } = useData();
  const { loginName, loginEmail } = useLoginData();

  const uploadFile = useRef(null);

  // 파일저장변수 업데이트 함수
  const updateFileInfo = (x) => (uploadFile.current = x);

  const baseData = JSON.parse(localStorage.getItem("donate-data"));

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  }, []);

  const submitData = () => {
    // 새로운 id값
    let arrId = baseData.map((v) => parseInt(v.id));
    let newId = Math.max(...arrId) + 1;

    // 빈값 리턴 처리
    if (title == "") {
      alert("제목을 입력해주세요.");
      return;
    } else if (topic == "") {
      alert("주제를 입력해주세요.");
      return;
    } else if (category == "") {
      alert("모금 대상을 선택해주세요.");
      return;
    } else if (content == "") {
      alert("내용을 입력해주세요.");
      return;
    }

    let data = {
      id: newId,
      writer:loginName,
      title: title,
      topic: topic,
      category: category,
      content: content,
      price: 0,
      donateCnt: 0,
      image: "sample1.jpg",
      lastModified: date,
    };

    let locals = JSON.parse(localStorage.getItem("donate-data"));
    locals.push(data);
    localStorage.setItem("donate-data", JSON.stringify(locals));

    // 데이터가 업데이트되었음을 알려서 useQuery가 데이터를 다시 가져오도록 함
    setDataUpdated((prev) => !prev); // dataUpdated 상태 토글

    // 등록후 리스트로 이동
    setBoardSts("list");
  };

  return (
    <>
      <h2 className="text-3xl font-extrabold mb-6 text-center">모금 제안</h2>
      <table className="table-auto w-4/5 mx-auto bg-slate-50 border-collapse rounded-lg shadow-md">
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2 text-sm font-bold text-gray-600">
              작성자
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                value={loginName}
                readOnly
                className="w-full px-3 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              />
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-sm font-bold text-gray-600">
              이메일
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                value={loginEmail}
                readOnly
                className="w-full px-3 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              />
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-sm font-bold text-gray-600">제목</td>
            <td className="px-4 py-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-sm font-bold text-gray-600">주제</td>
            <td className="px-4 py-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-sm font-bold text-gray-600">
              모금 대상
            </td>
            <td className="px-4 py-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="" disabled>
                  선택해주세요
                </option>
                <option value="청소년">청소년</option>
                <option value="환경">환경</option>
                <option value="장애인">장애인</option>
                <option value="사회">사회</option>
                <option value="어르신">어르신</option>
              </select>
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-sm font-bold text-gray-600">내용</td>
            <td className="px-4 py-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                cols="60"
                maxLength="300"
                rows="10"
              ></textarea>
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 text-sm font-bold text-gray-600">
              모금 시작일
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                value={date}
                readOnly
                className="w-full px-3 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              />
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 text-sm font-bold text-gray-600">
              사진 첨부
            </td>
            <td className="px-4 py-2">
              <div className="flex flex-col items-center p-5 cursor-not-allowed h-40">
                <FaImage className="text-2xl mb-2 size-24" />
                <p>샘플 이미지 자동 등록.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center gap-5">
        <button
          onClick={() => {
            setBoardSts("list");
          }}
          className="w-2/5 mt-5 text-center px-6 py-3 text-xl font-extrabold text-white bg-gray-500 border border-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          취소
        </button>
        <button
          onClick={submitData}
          className="w-2/5 mt-5 text-center px-6 py-3 text-xl font-extrabold text-white bg-gray-500 border border-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          등록하기
        </button>
      </div>
    </>
  );
}

export default DonateAdd;
