import React, { useState,useQuery, useRef, useEffect } from "react";
import axios from 'axios'
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
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";



function App() {

  const [value, onChange] = useState(new Date());
  const [inputValue, setTitle] = useState('');
  const [inputValue2, setInputValue] = useState('');
  const [getsummary, setSummary] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [cards, setCards] = useState([]);
  const [question, setQuestion] =useState('');
  const [getAnswer, setAnswer] = useState('');
  // const cardsRef = useRef([]);
  const fileInput = useRef(null);
  const dateFormatter = new Intl.DateTimeFormat('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'});//날짜 포맷터

  const handleChange = (e) => { //제목 입력 
    setTitle(e.target.value);
  }
  const handleChange2 = (e) => { //질문입력
    setInputValue(e.target.value);
  }


  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFileName(selectedFile.name);
  };

  const handleSummarize = (event) =>
  {
    event.preventDefault(); // 기본 동작 막기
    const formData = new FormData();
    formData.append("date", dateFormatter.format(value));
    formData.append('inputfile', fileInput.current.files[0]);
    formData.append('title', inputValue);

    axios.post('http://localhost:9999/uploader', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }})
        .then((response)=>{
            console.log(response);
            console.log(selectedFileName);
            console.log(inputValue);
            setSummary(response.data.summary);
            alert(`업로드한 ${selectedFileName} 파일이 성공적으로 요약되었습니다.`);
        })
        .catch((error) => {
            console.log(error);
        })

    
  };
  
  const registerCard=() =>{
    const newCard = {
      title: inputValue,
      date: dateFormatter.format(value),
      summary:getsummary
    };
    setCards([...cards, newCard]);
  };
    useEffect(() => {
      console.log(cards);
    }, [cards]);
  
  const handleQuestion = (e)=>{
    e.preventDefault(); // 기본 동작 막기

    const formData = new FormData();
    formData.append('date', dateFormatter.format(value))
    formData.append("question", inputValue2);

    axios.post('http://localhost:9999/question', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData})
        .then((response)=>{
            console.log(response);
            console.log(inputValue2);
            setAnswer(response.data.answer);
        })
        .catch((error) => {
            console.log(error);
        })
  }
//   const fileUpload = () => { //파일 업로더
//   };
    
//     const fileInput = async(e) => {
//         const target = e.target;
//         if(!target) return;

//         const file = target.file;
//         if(!file)   return;

//         const formData = new FormData();
//     }

//   }
//   const [mark, setMark] = useState([]);

//   const { data } = useQuery(
//     ["logDate", month],
//     async () => {
//       const result = await axios.get(
//         `/api/healthLogs?health_log_type=DIET`
//       );
//       return result.data;
//     },
//     {
//       onSuccess: (data) => {
//         setMark(data);
//        // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
//       },
//     }
//   );


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
                
                <button onClick={handleButtonClick}>음성 파일 불러오기</button>

                <form   onSubmit={handleSummarize}>
                <input name="inputfile" type="file" required ref={fileInput} style={{ display: 'none' }} onChange={handleFileSelect}/>

                {selectedFileName && <p style={{fontFamily:'NanumGothicBold', fontSize:"0.8rem",textAlign:"center"}}>
                    선택된 파일: {selectedFileName}</p>}

                <div style={{backgroundColor:'#FFFFFF', boxShadow:'3px 3px 3px #C3C3C3', borderRadius:'15px 15px 15px 15px', marginBottom:"0rem", marginTop:"1rem", width:"80%", height:"0%", display:"flex", justifyContent:"space-between",  alignItems:'center', padding:"1rem"}}>

                <input name="title" type="text" required value={inputValue} onChange={handleChange} 
                        placeholder="제목을 입력해주세요."
                        style={{ width: "100%", border:"none", backgroundColor:'#FFFFFF', fontFamily:'NanumGothic', fontSize:'1rem'}}/>
                
                </div>
                <div style={{width: '100%', display: 'flex', flexDirection:'row', alignItems:'center', ifyContent:'center', justifyContent:'center'}}>
                  <Button type="submit" name={"요약하기"} onClick={handleSummarize}/>
                </div>
                
                </form>

                <Box content={getsummary} />

                <div style={{position:"absolute", bottom:"-0.6rem", margin:"auto"}}>
                    <Button name={"등록하기"} onClick={registerCard}/>
                </div>

            </div>

            <div style={{width:'90%', padding:'1rem', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <div style={{ width:"400px", height:"400px"}}>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        // formatDay={(locale, date) => moment(date).format("DD")}
                        tileContent={<div style={{display:'flex', justifyContent:"center", alignItems:"center", padding:"0.2rem"}}><div className="dot"/></div>}
                        // tileContent={({date, veiw}) => {
                        //     if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                        //         return (
                        //          <>
                        //            <div className="flex justify-center items-center absoluteDiv">
                        //              <div className="dot"></div>
                        //            </div>
                        //          </>
                        //        );
                        //     }
                        // }}
                        />
                </div>
                <div style={{backgroundColor:'#F9F9F9', boxShadow:'3px 3px 3px #C3C3C3', borderRadius:'15px 15px 15px 15px', marginBottom:"0rem", marginTop:"1rem", width:"95%", height:"7%", display:"flex", flexDirection:"row", justifyContent:"space-between",  alignItems:'center', padding:"1rem", height:'2rem'}}>
                    <p style={{fontFamily:'NanumGothicBold', color:'#00ABB3', marginRight:"2rem"}}>Q</p>
                    <input
                        type="text"
                        value={inputValue2}
                        onChange={handleChange2}
                        placeholder="질문을 입력해주세요."
                        style={{width:"100%", marginRight:"1.5rem", border:"none", height:"100%", backgroundColor:'#F9F9F9', fontFamily:'NanumGothic', fontSize:'1rem'}}
                        />
                    <SendIcon width='1.3rem' onClick={handleQuestion}/>
                </div>
                <Answer content={getAnswer}/>
            </div>

            <div style={{backgroundColor:'#F9F9F9', display:'flex', flexDirection:'column', alignItems:'center', padding:'1rem', height:"87vh" ,overflowY:"auto"}}>
              {cards.map((card, index) => (
            <MainCard key={index} title={card.title} date={card.date} context={card.summary} />
              ))}
                {/* <MainCard title={"클라이언트 1차 미팅-1"} date={"2023년 3월 25일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"스타일 컴포넌트 왜 안 돼"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
                <MainCard title={"개빡치네"} date={"2023년 3월 26일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/> */}
                
            </div>
        </div>
  </div>
  );
}

export default App;
