import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
// import 'swiper/css';  // Swiper 스타일 가져오기 (최신 버전 사용)

// Swiper 라이브러리 스타일을 제대로 적용하려면 이 코드로 수정해주세요.
function MainBanner() {
  const bannerData = [
    {
      imgSrc: "/images/banner1.jpg", // 첫 번째 배너 이미지 경로
      link: "/donates/3", // 클릭 시 이동할 링크
      alt: "기부 배너 1",
      title: "겨울의 차가움을 녹이는 온기 프로젝트 '온 나눔'", // 배너 제목
      description: "추위를 녹이는 따뜻한 나눔.", // 배너 설명
    },
    {
      imgSrc: "/images/banner2.jpg", // 두 번째 배너 이미지 경로
      link: "/donates/2", // 클릭 시 이동할 링크
      alt: "기부 배너 2",
      title: "여러분은 누군가에게 따뜻한 연탄이 되어보신 적이 있나요?", // 배너 제목
      description: "나 아닌 누군가에게 기꺼이 연탄 한 장 되는 것", // 배너 설명
    },
    {
      imgSrc: "/images/banner3.jpg", // 세 번째 배너 이미지 경로
      link: "/donates/4", // 클릭 시 이동할 링크
      alt: "기부 배너 3",
      title: "겨울이 두렵습니다", // 배너 제목
      description: "어르신에게 따뜻한 온기를 선물해 주세요.", // 배너 설명
    },
  ];

  return (
    <div className="relative  w-full h-[400px] sm:h-[500px] mb-10">
      <Swiper
        pagination={{
          type: "fraction",
        }}
        autoplay={{
          delay: 5000, // 3초마다 슬라이드 전환
          disableOnInteraction: false, // 사용자가 상호작용해도 자동 전환이 멈추지 않도록
        }}
        modules={[Autoplay]}
        slidesPerView={1}
        className="mySwiper"
      >
        <div className="pd-dt-img">
          {bannerData.map((v, i) => (
            <SwiperSlide key={i}>
                <Link to={v.link}>
                <div className="relative w-full h-[400px] sm:h-[500px]">
                  <img
                    src={v.imgSrc}
                    alt={v.alt}
                    className="w-full h-[400px] sm:h-[500px] object-cover" // 이미지가 슬라이드를 꽉 채우도록
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
                    <div className="text-center text-white">
                      <h2 className="text-3xl font-extrabold mb-3">
                        {v.title}
                      </h2>
                      <p className="text-lg mb-4">{v.description}</p>
                    </div>
                  </div>
                </div>
            </Link>
              </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

export default MainBanner;
