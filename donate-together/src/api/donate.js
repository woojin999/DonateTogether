import orgDonateData from "../../data/donate.json";
import donationData from "../../data/donation.json";

// 도네이트 진행 리스트 데이터 가져오기
export function getDonates(params) {
  // 만약 로컬스 "donate-data"가 null이면 생성
  if (localStorage.getItem("donate-data") === null) {
    localStorage.setItem("donate-data", JSON.stringify(orgDonateData));
  }
  // 기부중인 데이터
  if (localStorage.getItem("donation-data") === null) {
    localStorage.setItem("donation-data", JSON.stringify(donationData));
  }

  // 로컬스토리지에서 데이터를 가져옴
  const donateData = JSON.parse(localStorage.getItem("donate-data"));

  // 로컬스토리지에 데이터가 없을 경우 처리
  if (!donateData) {
    return [];
  }

  // 필터링 및 정렬
  const sortedDonates = donateData.sort(
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

export async function getDonateById(id) {
  // localStorage에서 donate-data를 가져옴
  const donateData = JSON.parse(localStorage.getItem("donate-data"));

  if (!donateData) {
    console.error("No donate data found in localStorage");
    return null; // 데이터가 없으면 null 반환
  }

  // id에 맞는 데이터를 찾음
  const donateItem = donateData.find((item) => item.id === parseInt(id));

  if (!donateItem) {
    console.error(`Donate item with id ${id} not found.`);
    return null; // 찾은 데이터가 없으면 null 반환
  }

  // 찾은 donateItem 반환
  return donateItem; // data 속성이 필요 없으므로 바로 donateItem 반환
}

export async function getDonationById(id) {
  // localStorage에서 donate-data를 가져옴
  const donationData = JSON.parse(localStorage.getItem("donation-data"));

  if (!donationData) {
    console.error("No donation data found in localStorage");
    return null; // 데이터가 없으면 null 반환
  }

  // id에 맞는 데이터를 찾음
  const donationItem = donationData
    .filter((item) => item.donateIdx === parseInt(id));

  if (!donationItem) {
    console.error(`Donation item with id ${id} not found.`);
    return null; // 찾은 데이터가 없으면 null 반환
  }

  // 찾은 donationItem 반환
  return donationItem; // data 속성이 필요 없으므로 바로 donationItem 반환
}
