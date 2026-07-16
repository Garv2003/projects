from flask import Flask, render_template, request, send_file
from gtts import gTTS
import os
import uuid

app = Flask(__name__)

# Directory to store audio files
audio_dir = os.path.join("static", "audio")
os.makedirs(audio_dir, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    text = request.form.get("text")
    filename = f"{uuid.uuid4()}.mp3"
    audio_path = os.path.join(audio_dir, filename)

    # Convert text to speech and save as an mp3 file
    tts = gTTS(text=text, lang='en', slow=False)
    tts.save(audio_path)

    # Send the generated audio file to the client
    return send_file(audio_path, mimetype='audio/mp3')

if __name__ == '__main__':
    app.run(debug=True)
