import React from "react";
import { Link } from "react-router-dom";

function DonateItem({ id, title, lastModified,topic, category, content, image }) {
  
  
  return (
    <Link
      className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
      to={`/donates/${id}`}
    >
      <div className="p-6">
        <img
          src={`/images/${image}`}
          alt={image}
          className="h-52 w-full object-cover rounded-xl mb-3"
        />
        <h2 className="text-2xl font-bold mb-2 text-gray-800 line-clamp-1">
          {title}
        </h2>
        <p className="text-sm text-gray-600 mb-4">기부시작일: {lastModified}</p>
        <span className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-gray-700 bg-red-200 rounded-full">
          {category}
        </span>
        <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-red-200 rounded-full">
          {topic}
        </span>
        <p className="text-lg text-gray-600 mt-2 line-clamp-2">{content}</p>
      </div>
    </Link>
  );
}

export default DonateItem;
