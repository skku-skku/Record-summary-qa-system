import React, { useState } from "react";
import { RecoilRoot } from 'recoil';
import "./App.css";
import Calendar from 'react-calendar';
import MainCard from "./components/MainCard";
import Button from "./components/Button";
import Box from "./components/Box";
import Answer from "./components/Answer";
import 'react-calendar/dist/Calendar.css';
import { ReactComponent as MainIcon} from "./main_icon.svg";
import { ReactComponent as SendIcon} from "./send.svg";

function App() {
  const [value, onChange] = useState(new Date());
  return (
    <div style={{height:"100vh"}}>
        <div style={{height:"4.3rem", margin:"0.5rem"}}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingLeft:'1rem'}}>
                <MainIcon width="2.5rem" height="2.5rem"/>
                <p style={{margin:'1rem', fontWeight:'bold', fontSize:'1.4rem', fontFamily:'NanumGothicBold'}}>JolUp</p>
            </div>
            <hr style={{border:'none', border:'1px solid #EBEBEB'}}/>
        </div>

        <div style={{display:'flex', flexDirection:'row', marginTop:"-0.5rem"}}>
            <div style={{backgroundColor:'#F9F9F9', width:'50%', display:'flex', flexDirection:'column', justifyContent:'cneter', alignItems:'center'}}>
                <p style={{fontFamily:'NanumGothicBold', fontSize:"1.2rem", margin:"2rem"}}>업로드</p>
                <p style={{fontSize:'0.8rem', color:'#00ABB3', marginTop:"-1rem"}}>{value.toDateString()}</p>
                <p style={{textDecorationLine:"underline", margin:"2rem"}} >WAV 파일 불러오기</p>
                <Button name={"요약하기"}/>
                <Box content={"요약된 내용입니다다다다다 주요안건은 다음과 같습니ㄷ다...아아아아가나다라마바사아자차카s"}/>
                <div style={{position:"absolute", bottom:"1rem"}}>
                    <Button name={"등록하기"} />
                </div>
            </div>

            <div style={{width:'90%', padding:'1rem', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <div style={{ width:"400px", height:"400px"}}>
                    <Calendar onChange={onChange} value={value}/>
                </div>
                <div style={{backgroundColor:'#F9F9F9', boxShadow:'3px 3px 3px #C3C3C3', borderRadius:'15px 15px 15px 15px', marginBottom:"0rem", marginTop:"1rem", width:"95%", height:"7%", display:"flex", flexDirection:"row", justifyContent:"space-between",  alignItems:'center', padding:"1rem", height:'2rem'}}>
                    <p style={{fontFamily:'NanumGothicBold', color:'#00ABB3', marginRight:"2rem"}}>Q</p>
                    <SendIcon width='1rem'/>
                </div>
                <Answer content={"대답합니다."}/>
            </div>
            <div style={{backgroundColor:'#F9F9F9', display:'flex', flexDirection:'column', alignItems:'center', padding:'1rem', height:"87vh" ,overflowY:"auto"}}>
                <MainCard title={"클라이언트 1차 미팅-1"} date={"2023년 3월 25일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"스타일 컴포넌트 왜 안 돼"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
            </div>
        </div>
  </div>
  );
}

export default App;
