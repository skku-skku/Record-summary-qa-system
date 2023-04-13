import React, { useState } from "react";
import styled from 'styled-components';
import Calendar from 'react-calendar';
import MainCard from "../components/MainCard";

function MainPage(){
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <div>
                <p style={{marginLeft:'1rem', marginBottom:'0rem', fontWeight:'bold', fontSize:'1.5rem'}}>일정</p>
                <hr style={{border:'none', border:'1px solid #EBEBEB'}}/>
            </div>
            <div style={{width:'90%', padding:'1rem', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Calendar onChange={onChange} value={value} />
            </div>
            <div style={{backgroundColor:'#F9F9F9', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'1rem', padding:'1rem'}}>
                <MainCard title={"클라이언트 1차 미팅-1"} date={"2023년 3월 25일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"스타일 컴포넌트 왜 안 돼"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
            </div>
        </div>
    );
}

export default MainPage;

const Wrapper = styled.div`
  width: 80%;
  heigh: 10%;
  background-color: #F9F9F9;
  padding: 1rem;
`;
