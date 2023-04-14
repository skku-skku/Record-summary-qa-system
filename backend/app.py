from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from pydub import AudioSegment
from pymongo import MongoClient
import io
import os
import speech_recognition as sr

app = Flask(__name__)

# client = MongoClient('localhost', 27017)
# print(client)
# db = client.Record
# print(db)
# os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:\\Users\\공부 ㅅㄱ~~\\Desktop\\성균관대학교\\졸업작품\\backend\\assistant.json'
# CHUNK_SIZE = 5000000

# Main page
@app.route('/', methods=['GET','POST'])
def home():
    return render_template('index.html')

# Check page
@app.route('/check', methods=['GET','POST'])
def check():
    return render_template('check.html')

# Upload page
@app.route('/upload', methods=['GET','POST'])
def uploader():
    return render_template("upload.html")

@app.route('/uploader', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':

        f = request.files['file']
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

        print(stt_result)
        return stt_result

 
if __name__ == '__main__':
    app.run('localhost', port = 9999, debug=True)