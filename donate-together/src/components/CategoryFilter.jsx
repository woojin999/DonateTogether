import React, { useState } from "react";

function CategoryFilter({ category, onChange }) {
  const categories = ["전체", "동물", "청소년", "환경", "장애인", "사회", "어르신"];
  
  // activeCategory 상태를 추가하여 클릭된 항목을 추적
  const [activeCategory, setActiveCategory] = useState(category || "전체");

  const handleClick = (cate) => {
    // 선택된 항목만 활성화하고, 전체 항목 클릭 시 undefined 처리
    setActiveCategory(cate); // 클릭된 항목을 활성 상태로 설정
    onChange(cate === "전체" ? undefined : cate); // 카테고리 변경
  };

  return (
    <div className="container mx-auto p-5">
      <ul className="flex gap-4 justify-center">
        {categories.map((cate) => (
          <li
            key={cate}
            onClick={() => handleClick(cate)}
            className={`cursor-pointer border border-gray-200 rounded-2xl p-2
              ${activeCategory === cate ? 'bg-stone-900 text-white' : 'hover:bg-stone-900 hover:text-white'}`}
          >
            {cate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
