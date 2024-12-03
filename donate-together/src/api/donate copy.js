import { donates } from "./http";

// 데이터 리스트
export async function getDonates(params) {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  

  // const {data} = await JSON.parse(localStorage.getItem("donate-data")).donates;

  const {data} = await donates.get('/' ,{params:payload});
  
  return data;
}
