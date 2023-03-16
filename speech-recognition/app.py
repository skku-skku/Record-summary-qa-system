from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from pydub import AudioSegment
import speech_recognition as sr


app = Flask(__name__)

# 업로드 HTML 렌더링
@app.route('/')
def render_file():
    return render_template('upload.html')

# 파일 업로드 처리
@app.route('/fileUpload', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        #음성 파일 이름만 추출
        name = f.filename.split('.')[0]
        #음성 파일의 타입 추출
        file_type = f.filename.split('.')[-1]

        # .m4a 확장자일 경우 .wav로 변환
        if str(file_type) == "m4a":
            sound = AudioSegment.from_file(f)
            sound.export(str(name)+ ".wav", format="wav")

        r = sr.Recognizer()

        with sr.AudioFile(str(name)+".wav") as source:
            audio = r.record(source)
        stt = r.recognize_google(audio_data = audio, language="ko-KR")
            

        #f.save(secure_filename(f.filename))
        return stt

if __name__ == '__main__':
    # 서버 실행
    app.run(debug = True)