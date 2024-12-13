import React, { useState } from "react";
import { getDonates } from "../api/donate";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/SearchBar";
import DonateList from "../components/DonateList";

function SearchPage() {
  const [isGridView, setIsGridView] = useState(true); // 반응형 변수

  const [filter, setFilter] = useState({
    searchText: "",
  }); // 카테고리별 데이터 출력
  // 카테고리 필터
  const handleFilter = (key, value) =>
    setFilter({
      ...filter,
      [key]: value,
    });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["donates", filter.searchText],
    queryFn: () =>
      getDonates({
        title_like: filter.searchText,
      }),
    initialData: [],
  });
  console.log(data, filter.searchText);

  const searchingData = data.filter((val) =>
    val.title.toLowerCase().includes(filter.searchText.toLowerCase())
  );

  const bestData = data
    .sort((a, b) => b.donateCnt - a.donateCnt) // count를 기준으로 내림차순 정렬
    .slice(0, 4); // 상위 4개 항목만 가져오기
  return (
    <>
      <div className="flex justify-center mt-20 pb-10 mb-10 border-b-2">
        <SearchBar
          searchText={filter.searchText}
          handleSearch={(val) => handleFilter("searchText", val)}
        />
      </div>
      <div className="container mx-auto px-12 lg:px-24">
        {filter.searchText !== "" ? (
          <>
            <div className="mb-5">
              <h2 className="font-bold text-2xl">모금함 ({searchingData.length})</h2>
            </div>
            <DonateList filteredData={searchingData} isGridView={isGridView} />
          </>
        ) : (
          <>
            <div className="mb-5">
              <h2 className="font-bold text-2xl">가장 많이 참여중인 모금함</h2>
            </div>
            <DonateList filteredData={bestData} isGridView={isGridView} />
          </>
        )}
      </div>
    </>
  );
}

export default SearchPage;
