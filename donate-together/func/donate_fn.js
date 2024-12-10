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

const initmemberData = () => {
  if (localStorage.getItem("member-data") === null) {
    localStorage.setItem(
      "member-data",
      `
        [
            {
                "uuid": "admin",
                "userid":"admin",
                "password":"1111",
                "username":"Admin",
                "email":"admin@donate.com",
                "address":"성남시 수정구",
                "date":"2024-12-11"
            },
            {
                "uuid": "tester",
                "userid":"tester",
                "password":"1111",
                "username":"tester",
                "email":"tester@donate.com",
                "date":"2024-12-11"
            }
        ]
    `
    )
  }
}

export { clearDonateData, initDonateData ,initmemberData };




