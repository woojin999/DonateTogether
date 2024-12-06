import orgDonateData from "../data/donate.json"

// 로컬스 초기화
const clearDonateData = () => {
  localStorage.removeItem("donate-data");
}; /////////// clearDonateData //////////////

const initDonateData = () => {
  // 만약 로컬스 "donate-data"가 null이면 생성
  if (localStorage.getItem("donate-data") === null) {
    localStorage.setItem("donate-data", JSON.stringify(orgDonateData));
  }
}; ///////////// initData /////////////////

export { clearDonateData, initDonateData };




