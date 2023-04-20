from flask import Flask, render_template, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from pydub import AudioSegment
from flask_restx import Api, Resource, reqparse
from pymongo import MongoClient
from load_model import LoadModel
import speech_recognition as sr
import openai

openai.api_key = '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'




app = Flask(__name__)
CORS(app)
api = Api(app) #API 구현을 위한 api 객체 등록


#Mongo DB 연결 
client = MongoClient('localhost', 27017)
print(client)
db = client.Record
print(db)

# # Main page
# @app.route('/', methods=['GET','POST'])
# class MainPage(Resource):
#     def home():
#         return render_template('index.html')


# # Upload page 버튼 클릭시 이 라우트 이용
# @app.route('/upload', methods=['GET','POST'])
# def uploader():
#     return render_template("upload.html")

data = {}
#파일 업로드 후 STT 진행
@api.route('/uploader')
class UpLoader(Resource):
 def post(self):

    f = request.files['inputfile']
    #회의록 제목
    title = request.form['title']
    #날짜
    date = request.form['date']
    #음성 파일 이름만 추출
    name = f.filename.split('.')[0]
    #음성 파일의 타입 추출
    file_type = f.filename.split('.')[-1]

    stt_result=""
    # .m4a 확장자일 경우 .wav로 변환
    if str(file_type) != "wav":
        sound = AudioSegment.from_file(f)
        sound.export(str(name)+ ".wav", format="wav")
            
        r = sr.Recognizer()

        with sr.AudioFile(str(name)+".wav") as source:
            duration = 120 # chunk 단위로 처리할 시간 (초)
            offset = 0 # 시작 offset 초기값
            while offset < sound.duration_seconds:
                # 시작 offset부터 duration 길이만큼 chunk로 음성 파일을 처리
                audio = r.record(source, duration=duration, offset=offset)
                try:
                    stt = r.recognize_google(audio_data=audio, language="ko-KR")
                    stt_result += stt + ""
                    #print(stt)                
                except sr.UnknownValueError:
                    print("음성을 인식할 수 없음")
                except sr.RequestError as e:
                    print(f"음성을 인식하는 중에 오류가 발생하였습니다: {e}")
                offset += duration

        # 확장자 변경까지는 음성 파일 길이에 상관없이 성공

        # .wav 확장자일 경우
    if str(file_type) == "wav":
            
        r = sr.Recognizer()
        with sr.AudioFile(f) as source:
            duration = 120 # chunk 단위로 처리할 시간 (초)
            offset = 0 # 시작 offset 초기값
            total_duration = source.DURATION
                
            while offset < total_duration:
                # 시작 offset부터 duration 길이만큼 chunk로 음성 파일을 처리
                audio = r.record(source, duration=duration, offset=offset)
                try:
                    stt = r.recognize_google(audio_data=audio, language="ko-KR")
                    stt_result += stt + ""
                    #print(stt)
                except sr.UnknownValueError:
                    print("음성을 인식할 수 없음")
                except sr.RequestError as e:
                    print(f"음성을 인식하는 중에 오류가 발생하였습니다: {e}")
                offset += duration
    
    #요약 실행
    model = LoadModel(str(stt_result))
    summary = model.solution()
    print("title: "+ title)
    print("date" + date)
    print("summary " + summary)

    # MongoDB에 저장할 딕셔너리
    record = {
            'title':title,
            'create_date':date,
            'original': stt_result,
            'summary': summary
        } 
    
    if date not in data:
        data[date] = stt_result
    else:
        data[date] += stt_result
    
    print(data)
    
    # db에 저장할 값 
    db.records.insert_one(record)

    print("stt_result is " + stt_result) # 전체 stt_result
    #요약된 텍스트를 return 해서 front에서 보여줄 것 

    return {'summary': summary}, 200
 
@api.route('/question')
class Question(Resource):
    def post(self):
        # 회의록 본문
        # db에서 모든 record 검색
        # records = db.records.find({}, {'create_date': 1, 'original': 1})

        # # 날짜별 original 데이터를 저장할 딕셔너리 생성
        # data = {}

        # # 검색된 record를 하나씩 처리
        # for record in records:
        #     create_date = record['create_date']
        #     original = record['original']

        #     # 날짜별 original 데이터를 저장하는 리스트가 딕셔너리에 존재하는지 확인
        #     if create_date in data:
        #         data[create_date].append(original)
        #     else:
        #         data[create_date] = [original]

        # # original 데이터만 추출
        # original_data = []
        # for value in data.values():
        #     original_data.extend(value)

        # 질문
        question = request.form['question']
        print(question)

        # 질문하고 싶은 날짜
        date = request.form['date']
        print(date)
        text = """
            미 국방부가 우크라이나 무기 지원 가능성을 시사한 윤석열 대통령 언급과 관련해 "북대서양 조약기구 나토와 우크라이나 국방연락그룹에 대한 한국의 기여를 환영한다"고 밝혔습니다.

            미 국방부 대변인은 윤 대통령 언급에 대한 한국 언론들의 서면 질의에 한미 양측은 공동의 가치를 기반으로 한 철통 같은 동맹이라며 이같이 답했습니다.

            미 국방부는 동시에 백 오십만 발이 넘는 155밀리 포탄 등이 포함된 3억 2천 5백만 달러 우리 돈 4천 3백억 원 규모의 우크라이나 추가 지원 계획도 발표했습니다.

            이에 따라 현재 만 4천 발 가량인 미국 내 155밀리 포탄의 월별 생산량은 연말까지 2만 4천 발로 늘리고 앞으로 5년 안에 최대 세 배까지 확대할 방침입니다.
        """
        # 프롬프트
        messages = [{"role":"system", "content":f"Please answer in follow sentences. '{text}'"}]
        

        # Question and Answering
        
        if question:
            messages.append({
                "role":"user", "content": question
            })
            chat = openai.ChatCompletion.create(
                model="gpt-3.5-turbo", messages=messages
            )
        answer = str(chat.choices[0].message.content)
        print(answer)
        
        # messages.append({"role":"assistant", "content":reply})

        return {'answer' : answer}


            

if __name__ == '__main__':
    app.run('localhost', port = 9999, debug=True)