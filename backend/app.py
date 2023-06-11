#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from pydub import AudioSegment
from flask_restx import Api, Resource, reqparse
from pymongo import MongoClient
from load_model import LoadModel
import speech_recognition as sr
import openai
from dotenv import load_dotenv
import os


load_dotenv()

# API key 가져오기
openai.api_key = os.environ.get('API_KEY')

app = Flask(__name__)
CORS(app)
api = Api(app) #API 구현을 위한 api 객체 등록


#Mongo DB 연결 
client = MongoClient('localhost', 27017)
print(client)
db = client.Record
print(db)


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

    @app.route('/data', methods=['GET'])
    def get_data():
    # Retrieve records from the database
        records = db.records.find()
        # Create a list to store the data
        date = request.args.get('date')
        filtered_data = []
        for record in records:
            if record['create_date'] == date:
                item = {
                'title': record['title'],
                'date': record['create_date'],
                'summary': record['summary']
                }
                filtered_data.append(item)

        # Return the data as a JSON response
        return jsonify(filtered_data)
            

if __name__ == '__main__':
    app.run('localhost', port = 9999, debug=True)