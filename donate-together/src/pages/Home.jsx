import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DonateList from "../components/DonateList";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { getDonates } from "../api/donate";
import CategoryFilter from "../components/CategoryFilter";

function Home(props) {
  const [filter, setFilter] = useState({
    categoryText: undefined,
    category: undefined,
  });
  const handleFilter = (key, value) =>
    setFilter({
      ...filter,
      [key]: value,
    });

  const [isGridView, setIsGridView] = useState(true);

  const [localCategoryText, setLocalCategoryText] = useState("");

  // 데이터 조회리스트

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["donates", filter.categoryText, filter.category],
    queryFn: () =>
      getDonates({
        title_like: filter.categoryText,
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
      {!isLoading && !error && (
        <DonateList
          filteredData={data}
          categoryText={filter.categoryText}
          isGridView={isGridView}
        />
      )}
    </>
  );
}

export default Home;
