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

function Home(props) {
  // 로컬스토리지 변경 여부
  const [dataUpdated, setDataUpdated] = useState(false);
  // 카테고리별 데이터 출력
  const [filter, setFilter] = useState({
    category: undefined,
  });
  const handleFilter = (key, value) =>
    setFilter({
      ...filter,
      [key]: value,
    });

  // 반응형
  const [isGridView, setIsGridView] = useState(true);

  // 데이터 조회리스트
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["donates", filter.category, dataUpdated],
    queryFn: () =>
      getDonates({
        category: filter.category,
      }),
    initialData: [],
  });

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

  const { boardSts, setBoardSts } = useData();

  // boardSts 변환 버튼
  const clickButton = (e) => {
    let btnText = e.target.innerText;

    switch (btnText) {
      case "모금 제안":
        setBoardSts("write");
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

  return (
    <>
      {boardSts == "list" && (
        <div>
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
