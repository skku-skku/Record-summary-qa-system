import React from 'react';
import { RecoilRoot } from 'recoil';
import MainCard from './components/MainCard';

function App() {
  return (
    <div>
      <p>hello</p>
      <MainCard title={"클라이언트 1차 미팅-1"} date={"2023년 3월 25일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
    </div>
  );
}

export default App;
