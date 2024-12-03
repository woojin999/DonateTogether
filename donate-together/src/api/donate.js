import orgDonateData from "../../data/db.json";

export function getDonates(params) {

  // 만약 로컬스 "donate-data"가 null이면 생성
  if (localStorage.getItem("donate-data") === null) {
    localStorage.setItem("donate-data", JSON.stringify(orgDonateData));
  }

  // 로컬스토리지에서 데이터를 가져옴
  const donateData = JSON.parse(localStorage.getItem("donate-data"));

  // 로컬스토리지에 데이터가 없을 경우 처리
  if (!donateData || !donateData.donates) {
    return [];
  }

  const donatesList = donateData.donates;

  // 필터링 및 정렬
  const sortedDonates = donatesList.sort(
    (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
  );

  // 카테고리에 따라 필터링
  if (params && params.category) {
    const filteredDonates = sortedDonates.filter((donate) =>
      donate.category.includes(params.category)
    );
    return filteredDonates;
  }

  return sortedDonates;
}
