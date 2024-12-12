import React from 'react';
import { useLoginData } from '../context/UserProvider';

function MyPage(props) {
  const {handleLogout} = useLoginData();


  return (
    <>
    <div>
      마이페이지
    </div>
    <div className='cursor-pointer' onClick={handleLogout}>
    임시 로그아웃
    </div>
    </>
  );
}

export default MyPage;