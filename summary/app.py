from flask import Flask, render_template, request
from load_model import LoadModel

app = Flask(__name__)
# app.config['UPLOAD_FOLDER'] = 'static/uploads'

@app.route('/')
def render_file():
    return render_template('index.html')

@app.route('/makeSummary', methods = ['GET', 'POST'])
def make_summary():
    if request.method == 'POST':
        text = request.form['text']
        model = LoadModel(str(text))
        summary = model.solution()
        return render_template('index.html', summary=summary)

if __name__=='__main__':
    app.run(debug = True)