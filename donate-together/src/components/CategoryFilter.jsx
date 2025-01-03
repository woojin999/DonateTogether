import React, { useState } from "react";

function CategoryFilter({ category, onChange }) {
  const categories = [
    { title: "전체", img: "ico_all.png" },
    { title: "청소년", img: "ico_kidz.png" },
    { title: "어르신", img: "ico_old.png" },
    { title: "장애인", img: "ico_accessible.png" },
    { title: "환경", img: "ico_earth.png" },
    { title: "사회", img: "ico_neighborhood.png" },
  ];

  // activeCategory 상태를 추가하여 클릭된 항목을 추적
  const [activeCategory, setActiveCategory] = useState(category || "전체");

  const handleClick = (cate) => {
    // 선택된 항목만 활성화하고, 전체 항목 클릭 시 undefined 처리
    setActiveCategory(cate.title); // 클릭된 항목을 활성 상태로 설정
    onChange(cate.title === "전체" ? undefined : cate.title); // 카테고리 변경
  };

  return (
    <div className="container mx-auto">
      <ul className="grid grid-cols-3 gap-4 justify-center lg:flex lg:flex-wrap lg:gap-4">
        {categories.map((cate) => (
          <li
            key={cate.title}
            onClick={() => handleClick(cate)}
            className={`cursor-pointer border border-gray-200 transition-all duration-300 rounded-2xl p-2
              ${
                activeCategory === cate.title
                  ? "bg-stone-900 text-white"
                  : "hover:bg-stone-900 hover:text-white"
              }`}
          >
            <img
              src={`/images/${cate.img}`}
              alt={cate.title}
              className="w-5 h-5 mr-2 inline-block"
            />
            {cate.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
