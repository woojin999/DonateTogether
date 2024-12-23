import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DonateList from "../components/DonateList";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { getDonates } from "../api/donate";
import CategoryFilter from "../components/CategoryFilter";
import { FaPencilAlt } from "react-icons/fa";
import DonateAdd from "../components/DonateAdd";
import { useData } from "../context/StsProvider";
import { useLoginData } from "../context/UserProvider";
import MainBanner from "../components/MainBanner";

function Home(props) {
  const [dataUpdated, setDataUpdated] = useState(false); // 로컬스토리지 변경 여부
  const [isGridView, setIsGridView] = useState(true); // 반응형 변수
  const { boardSts, setBoardSts } = useData(); // 게시글 상태변수
  const {
    loginSts,
    goPage,
    userKakaoData,
    setUserKakaoData,
    isLoadingKakao,
    setIsLoadingKakao,
  } = useLoginData(); // 로그인 context
  const [filter, setFilter] = useState({
    category: undefined,
  }); // 카테고리별 데이터 출력
  
  // 카테고리 필터
  const handleFilter = (key, value) =>
    setFilter({
      ...filter,
      [key]: value,
    });

  // 데이터 조회리스트
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["donates", filter.category, dataUpdated],
    queryFn: () =>
      getDonates({
        category: filter.category,
      }),
    initialData: [],
  });

  const handleScrollToTop = () => {
    // 페이지를 최상단으로 스크롤
    window.scrollTo({
      top: 0,
      // behavior: "smooth", // 부드럽게 스크롤
    });
  };

  // boardSts 변환 버튼
  const clickButton = (e) => {
    let btnText = e.target.innerText;

    switch (btnText) {
      case "모금 제안":
        if (loginSts) {
          setBoardSts("write");
          handleScrollToTop();
        } else if (userKakaoData) {
          setBoardSts("write");
          handleScrollToTop();
        } else {
          goPage("/login");
        }
        break;
      case "리스트":
        setBoardSts("list");
        break;
      case "등록하기":
        setBoardSts("list");
        break;
      default:
        break;
    }
  };


  useEffect(() => {
    // localStorage의 데이터가 바뀌면 refetch 호출
    const handleStorageChange = () => {
      setDataUpdated((prev) => !prev); // dataUpdated 상태 토글
    };

    // 로컬스토리지의 변화를 감지
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 카카오로그인 처리
  useEffect(() => {
    const accessToken = sessionStorage.getItem("kakao_access_token");

    if (accessToken) {
      fetch("https://kapi.kakao.com/v2/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserKakaoData(data);
          setIsLoadingKakao(false);
        })
        .catch((error) => {
          console.error("사용자 정보 요청 실패:", error);
          setIsLoadingKakao(false);
        });
    } else {
      setIsLoadingKakao(false);
    }
  }, []);

  return (
    <>
      {boardSts == "list" && <MainBanner />}
      {boardSts == "list" && (
        <div className="container mx-auto px-12 lg:px-24">
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
            <CategoryFilter
              category={filter.category}
              onChange={(val) => handleFilter("category", val)}
            />
          </div>
          {isLoading && <Loading />}
          {error && <Error message={error.message} onRetry={refetch} />}
          <div className="flex gap-5">
            <h3 className="text-2xl font-extrabold mb-5">
              진행중 모금함 {data.length}
            </h3>
            <div className="flex gap-1 items-center mb-4 cursor-pointer">
              <FaPencilAlt className="" />
              <h3 className="underline text-lg" onClick={clickButton}>
                모금 제안
              </h3>
            </div>
          </div>
          {!isLoading && !error && (
            <DonateList filteredData={data} isGridView={isGridView} />
          )}
        </div>
      )}
      {boardSts == "write" && (
        <DonateAdd clickButton={clickButton} setDataUpdated={setDataUpdated} />
      )}
    </>
  );
}

export default Home;
