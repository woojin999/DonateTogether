import React from "react";

function CategoryFilter({ category, onChange }) {
  const categories = ["전체","동물", "청소년", "환경", "장애인", "사회", "어르신"];

  return (
    <div className="container mx-auto p-5">
      <ul className="flex gap-4 justify-center">
        {categories.map((cate) => (
          <li
            className="cursor-pointer border border-gray-200 rounded-xl p-2 hover:text-white hover:bg-black"
            key={cate}
            onClick={() => {
              onChange(cate == "전체" ? undefined : cate);
            }}
          >
            {cate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
