## Record-summary-qa-system
<img width="1024" alt="image" src="https://user-images.githubusercontent.com/82494506/236672751-3065f611-4f6c-4014-b25c-5ef131d8733f.png">

### 📌 제작 동기
----
늘어난 미팅 회수로 피로도가 증가한 현대인들을 위한 회의록 관리 서비스입니다. 사용자가 음성 파일을 서비스에 업로드하면 텍스트로 변환이 됩니다. 변환된 텍스트를 바탕으로 회의록의 요약본이 사용자가 선택한 날짜에 저장됩니다. 이에 따라 사용자는 쉽게 회의록을 확인하고 관리할 수 있습니다.
사용자는 날짜 별로 회의 내용에 대해 질의를 하고 답변을 받을 수 있습니다. 이를 통해 사용자는 보다 빠르게 회의를 복기하고 접근할 수 있습니다. 

### 📌 주요 기능
------
**🎙️ 녹음된 음성파일을 업로드 후 텍스트로 변환**   
> 사용자는 녹음된 음성파일을 시스템에 올리면, 음성파일이 자동으로 텍스트로 변환된다.  

**📑 변환된 텍스트 요약 진행**   
> 변환된 텍스트를 기반으로 요약이 진행된다. 완료된 요약문은 사용자가 확인할 수 있고 전체 텍스트는 데이터베이스에 저장된다.

**💡 빠른 회의 복기를 위한 질의응답**
> 사용자는 화면의 날짜를 선택하고 해당 회의에대한 질문을 하면 바로 답변을 받아 빠르게 회의 내용을 복기할 수 있다. 이때, 회의 내용에대한 답변은 데이터베이스에 저장된 전체 텍스트를 기반으로 이루어진다. 

### 📌 시스템 구성도
<img width="512" alt="image" src="https://github.com/skku-skku/Record-summary-qa-system/assets/80453200/cde7da16-a4b8-4da4-b0fe-05742ff9daad">

### 📌 실행방법
```
# front-end
cd front-react/jolup
npm run start

# back-end

cd backend
python app.py
```
### 📌 실행화면
<img width="730" alt="image" src="https://github.com/skku-skku/Record-summary-qa-system/assets/80453200/9651af1a-2229-4eee-80df-394431fdf9a3">
