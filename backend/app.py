from flask import Flask, render_template, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from pydub import AudioSegment
from flask_restx import Api, Resource, reqparse
from pymongo import MongoClient
from load_model import LoadModel
import speech_recognition as sr

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

#파일 업로드 후 STT 진행
@api.route('/uploader')
class UpLoader(Resource):
 def post(self):

    f = request.files['inputfile']
    #회의록 제목
    title = request.form['title']
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

    # MongoDB에 저장
    record = {
            'title':title,
            'create_date':date,
            'original': stt_result,
            'summary': summary
        } 
    
    
    # db에 저장할 값 
    #db.records.insert_one(record)

    print("stt_result is " + stt_result) # 전체 stt_result
    #요약된 텍스트를 return 해서 front에서 보여줄 것 
    return {'summary': " "}, 200
            


if __name__ == '__main__':
    app.run('localhost', port = 9999, debug=True)