import React, { useState } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";

function MyMap(props) {
  const navermaps = useNavermaps();

  const [places, setPlaces] = useState([]); // 검색된 장소 리스트
  const [keyword, setKeyword] = useState(""); // 사용자 입력 키워드

 const searchPlaces = async () => {
  if (!keyword) return;

  // 프록시 서버에 요청을 보냅니다.
  const apiUrl = `/naver-api?query=성남&display=5`;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  try {
    const response = await fetch(proxyUrl+apiUrl);
    const data = await response.json();
    setPlaces(data.items);
  } catch (error) {
    console.error("API 호출 실패:", error);
  }
};
  
  return (
    <div className="relative w-full h-full">
      {/* 검색 폼 */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 p-4 bg-white rounded-md shadow-lg">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어 입력"
          className="p-2 mr-2 border rounded-md border-gray-300"
        />
        <button
          onClick={searchPlaces}
          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          검색
        </button>
      </div>

      {/* 지도 */}
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={10}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            defaultPosition={
              new navermaps.LatLng(place.latitude, place.longitude)
            }
            title={place.title}
            onClick={() => alert(`선택된 장소: ${place.title}`)}
          />
        ))}
      </NaverMap>
    </div>
  );
}

export default MyMap;
