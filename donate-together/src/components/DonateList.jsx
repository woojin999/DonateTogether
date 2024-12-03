import React from "react";
import DonateItem from "./DonateItem";

function donateList({ filteredData, isGridView}) {
  return (
    <div
      className={`grid gap-6 ${
        isGridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
      }  `}
    >
      {filteredData.map((item) => (
        <DonateItem
          key={item.id}
          category={item.category}
          id={item.id}
          lastModified={item.lastModified}
          title={item.title}
          content={item.content}
          image={item.image}
        />
      ))}
    </div>
  );
}

export default donateList;
