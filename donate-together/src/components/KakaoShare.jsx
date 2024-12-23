import React, { useEffect } from "react";

function KakaoShare({ id, title }) {

  useEffect(() => {
    // 카카오 SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("abc6778f0de6df09ed6416d7651ccd5f"); 
    }
  }, []); 

  const handleKakaoShare = () => {
    if (!window.Kakao.isInitialized()) {
      console.log("Kakao SDK is not initialized.");
      return;
    }
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: "같이 기부해요",
        imageUrl: "/images/banner1.jpg",
        link: {
          mobileWebUrl: `https://donate-together-wjlee.vercel.app/donates/` + id,
          webUrl: "https://donate-together-wjlee.vercel.app/donates/" + id,
        },
      },
      buttons: [
        {
          title: "웹사이트 바로가기",
          link: {
            mobileWebUrl: "https://donate-together-wjlee.vercel.app/donates/" + id,
            webUrl: "https://donate-together-wjlee.vercel.app/donates/" + id,
          },
        },
      ],
    });
  };
  return (
    <button
      onClick={handleKakaoShare}
      className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
    >
      공유하기
    </button>
  );
}

export default KakaoShare;
