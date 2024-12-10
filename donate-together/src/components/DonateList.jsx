import React, { useState } from "react";
import DonateItem from "./DonateItem";

function donateList({ filteredData, isGridView }) {
  //보여줄 데이터의 수를 조정
  const [visibleCount, setVisibleCount] = useState(12);

  // 더보기 버튼 클릭 시 실행되는 함수
  const loadMoreItems = () => {
    setVisibleCount(visibleCount + 12); // 현재 보여주는 개수에서 12개씩 추가
  };

  // 표시할 데이터
  const itemsToShow = filteredData.slice(0, visibleCount);
  return (
    <>
    <div
      className={`grid gap-6 ${
        isGridView
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        : "grid-cols-1"
      }  `}
      >
      {itemsToShow.map((item) => (
        <DonateItem
        key={item.id}
          topic={item.topic}
          category={item.category}
          id={item.id}
          lastModified={item.lastModified}
          title={item.title}
          content={item.content}
          image={item.image}
          />
        ))}

    </div>
      {/* 더보기 버튼 */}
      {filteredData.length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreItems}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
            더보기
          </button>
        </div>
      )}
      </>
  );
}

export default donateList;
