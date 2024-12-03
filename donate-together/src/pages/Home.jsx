import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DonateList from "../components/DonateList";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { getDonates } from "../api/donate";
import CategoryFilter from "../components/CategoryFilter";
import { FaPencilAlt } from "react-icons/fa";
import { initDonateData } from "../../func/donate_fn";

function Home(props) {
  const [filter, setFilter] = useState({
    category: undefined,
  });
  const handleFilter = (key, value) =>
    setFilter({
      ...filter,
      [key]: value,
    });

  const [isGridView, setIsGridView] = useState(true);

  const [localCategoryText, setLocalCategoryText] = useState("");

  // initDonateData();

  // const baseData = JSON.parse(localStorage.getItem("donate-data")).donates;
  // console.log(baseData);
  
  // console.log(getDonates());
  
  
  // 데이터 조회리스트
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["donates", filter.category],
    queryFn: () =>
      getDonates({
        category: filter.category,
      }),
    initialData: [],
  });

  return (
    <>
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
          <h3 className="underline text-lg">모금 제안</h3>
        </div>
      </div>
      {!isLoading && !error && (
        <DonateList
          filteredData={data}
          isGridView={isGridView}
        />
      )}
    </>
  );
}

export default Home;
