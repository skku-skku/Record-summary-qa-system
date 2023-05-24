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
import datetime

# API key 업데이트
openai.api_key = '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'


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
    tmp= "긴급 회의인데 모두 모여주셔서 감사합니다. 오늘 교수님과 면담한 내용을 바탕으로 저희 프로젝트의 세부사항에대해서 이야기를 해봐야될 것 같아요. 네, 안그래도 제가 생각한 부분은 유저가 어플을 사용할 때 시나리오 흐름의 구성이 부족한 것 같아요. 우선, 그 부분을 먼저 이야기 할까요? 좋습니다. 음, 사용자가 어플을 키면 바로 카메라가 켜지고 경계선이 존재해야할 것 같아요. 경계선이요? 네, 시각 장애인 분들을위한 프로젝트니까 화면에 정확하게 보일러를 찍으시긴 어려울테니, 경계를 만들고 가이드라인을 제시하는거죠. 아 무슨 말인지 알겠어요. 초기에 나왔던 아이디어였던 것 같은데 이 부분은 다시 추가하는게 좋겠네요. 아! 그리고 음성 인식을 진행해서 사용자의 요구사항을 이해하는 방향은 어떤가요? 보일러 사진에대해서 사용 설명서처럼 읊어주면 오늘 들은대로 너무 간단한 기술이될 것 같아요. 듣고보니 그렇네요? 그럼 이 부분은 노션에 추가할테니 다음 정기회의 때 더 이야기해보는게 좋겠어요. 그리고 다음 이야기 나누어봐야할 것이 저희 프로젝트의 차별성인 것 같아요. 이 부분이 정말 어지럽네요. 그러게요, 어떤 차별점을 추가할 수 있을까요? 저희가 지금은 그냥 보일러만을 인식하지만 OCR을 진행한다면 집에 있는 상비약 이름과 복용법 등 안내는 어떤가요? 오 좋은 아이디어인데, 이렇게되면 저희 그냥 음성 안내 서비스가 될 것 같긴하네요. 흠 동의합니다. 이 부분은 짧은 시간내에 아이디어가 나올 것 같지 않으니 저희 다음 정기회의까지 3일 남았으니 각자 어떤 차별성을 줄 수 있을지 고민해보는게 좋을 것 같은데 어떠세요? 네, 좋습니다!! 저도요. 네, 그럼 우선 긴급회의는 이 정도로 마무리하고 다음 정기회의에 뵙겠습니다. 수고하셨습니다. "
    #model = LoadModel(str(tmp))
    model = LoadModel(str(tmp))
    summary = model.solution()
    print("title: "+ title)
    print("date: " + date)
    print("Result: " + tmp)
    print("summary: " + summary)

    # MongoDB에 저장할 딕셔너리
    record = {
            'title':title,
            'create_date':date,
            'original': tmp,
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