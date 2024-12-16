import React, { useState } from "react";
import campaign from "../../data/campaign.json";

function Campaign(props) {
  const [isGridView, setIsGridView] = useState(true); // 반응형 변수

  return (
    <div className="container mx-auto px-12 lg:px-24 mt-16">
      <h2 className="text-center font-bold text-3xl">
        도네이트투게더는 당신과 함께 <br /> 더 나은 세상을 만듭니다
      </h2>
      <div
        className={`grid gap-6 ${
          isGridView
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1"
        }  mt-10 `}
      >
        {campaign.map((v, i) => (
          <div className="rounded-2xl" key={i}>
            <img src={v.src} alt={v.title} className="w-full object-cover" />
            <div className="bg-white p-5 roun">
              <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                {v.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{v.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Campaign;
