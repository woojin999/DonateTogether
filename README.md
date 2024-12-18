# React -  DonateTogether Project

- 리액트를 활용하여 기부하기 사이트 구현
- [Plants to the Rescue 이용해보기](https://donate-together-wjlee.vercel.app/)



## ⏱ 개발기간 

2024.12.03 ~ 2024.12.17


## 🛠 프로젝트 주요 기능

- 회원가입 / 로그인 / 카카오로그인 api
- 모금함 리스트 / 모금 제안
- 기부하기 / 기부 내역
- 모금함 검색
- 마이페이지

## 🛠 트러블 슈팅

###  Issue1

**🚨 이슈** 
-  DonateDetail에서 getDonateById 로 받아온 데이터를 바로 출력하게 할려했지만 오류 발생

**💥 원인**
  - 데이터가 로드되기전에 donate 객체가 undefined 이였기 때문

**💡 해결**
- donate의 초기값을 null로 설정하여 if (!donate)로 donate가 존재하지 않는 경우 loading 상태변수를 통해 로딩 메시지를 표시하고 데이터가 로드 되면 loading 상태값을 변경하여 데이터 출력

###  Issue2

**🚨 이슈** 
- 기부글을 등록하고 list로 상태변경하여 게시글 리스트로 출력했을때 새로 등록한 글이 바로 안뜨고 새로고침을 해야 뜨는 이슈

**💥 원인**
  - 랜더링이 되지않고 바로 게시글 목록이 출력되었기 때문

**💡 해결**
 - 데이터의 변경여부 상태값을 만들고 useQuery에서 로컬스토리지의 데이터 값이 변경되는것을 감지하면 다시 데이터를 불러오게 작성

<br/>

![donateTogether](https://github.com/user-attachments/assets/aeac3621-d85e-4e80-af79-5878bc7cdbbe)

![donation](https://github.com/user-attachments/assets/2602a88d-a038-4997-82db-76d11d7c9c3f)



