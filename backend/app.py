#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request
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

#data = {"2023-04-20": "주요안건은 다음과 같습니다. 상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은 사용자의 사용자 경험을 고려하는 것이 가장 중요합니다. 저희 마감이 다음주 월요일이니까 그때까지만 다들 조금만 신경써주시면 감사할 것 같습니다. 특히 색상의 경우에는 색약을 고려하여 빨간색과 초록색은  배제하는 것이 좋을 것 같습니다.", "2023-04-26": "오늘 회의 시작하겠습니다. 계현씨 어제 말씀드린 안건은 어떻게 됐나요. 어제 데이터를 찾아본 결과 필요한 데이터들은 다 존재했고요 추가적으로 요약에 대한 데이터를 더 찾아보려고합니다. 모두의 말뭉치에 데이터가 많던데 혹시 여기서는 수집하셨나요 네 여기서도 수집완료하였습니다. 다른 분들도 필요한 데이터들 다 수집해주시고요 20일까지는 수집과 전처리가 모두 완료되어야 합니다. 다음주 수요일 회의때까지 보고서 잘 작성하시고 전처리해서 와주시면 감사하겠습니다"}


# 파일 업로드 후 STT 진행
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
    print(file_type)
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
    elif str(file_type) == "wav":
            
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
    tmp= "주요안건은 다음과 같습니다. 상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은 사용자의 사용자 경험을 고려하는 것이 가장 중요합니다. 저희 마감이 다음주 월요일이니까 그때까지만 다들 조금만 신경써주시면 감사할 것 같습니다. 특히 색상의 경우에는 색약을 고려하여 빨간색과 초록색은  배제하는 것이 좋을 것 같습니다."
    #model = LoadModel(str(tmp))
    model = LoadModel(str(stt_result))
    summary = model.solution()
    print("title: "+ title)
    print("date: " + date)
    print("Result: " + stt_result)
    print("summary: " + summary)

    # MongoDB에 저장할 딕셔너리
    record = {
            'title':title,
            'create_date':date,
            'original': stt_result,
            'summary': summary
        } 
    
    # if date not in data:
    #     data[date] = stt_result
    # else:
    #     data[date] += stt_result
    
    # print(data)
    
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
        question = request.form['question']
        print(question)

        # 질문하고 싶은 날짜
        date = request.form['date']
        print(date)
        record = db.records.find({'create_date': date})
        text = [r['original'] for r in record]

        print(text)

        # # 프롬프트
        messages = [{"role":"system", "content":f"Please answer in follow sentences. '{text}'"}]
        

        # # Question and Answering
        
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