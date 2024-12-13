import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ searchText = "", handleSearch }) {
  const [localSearchText, setLocalSearchText] = useState(searchText);
  return (
    <div className="w-[500px] max-w-lg p-6">
      <div className="relative">
        {/* 검색 인풋 박스 */}
        <input
          type="text"
          value={localSearchText}
          onChange={(e) => setLocalSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(localSearchText);
            }
          }}
          placeholder="검색어를 입력하세요"
          className="w-full h-20 pl-4 pr-14 py-2 text-2xl border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {/* 검색 아이콘 버튼 */}
        <button
          onClick={() => {
            handleSearch(localSearchText);
          }}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-500 focus:outline-none"
        >
          <FaSearch size={30} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
