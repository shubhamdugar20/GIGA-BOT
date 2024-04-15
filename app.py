import csv
import os
import datetime

from flask import Flask, render_template, request, jsonify,send_file
from flask_cors import CORS

from chat import get_response

app = Flask(__name__)
CORS(app)

CSV_FILE = 'chat_transcripts.csv'
CSV_HEADERS = ['timestamp', 'sender', 'message']

def create_csv():
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(CSV_HEADERS)

def insert_transcript(timestamp, sender, message):
    with open(CSV_FILE, 'a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow([timestamp, sender, message])

create_csv()

bot_not_understood_count = 0
escalated_to_executive = False

@app.get("/")
def index_get():
    return render_template("base.html", escalated=escalated_to_executive)

@app.post("/predict")
def predict():
    global bot_not_understood_count
    global escalated_to_executive
    
    text = request.get_json().get("message")
    timestamp = str(datetime.datetime.now())
    
    # Storing user message
    insert_transcript(timestamp, 'User', text)
    
    # Getting bot response
    response = get_response(text)
    
    if response.strip() == "sorry I am unable to answer your question can you clarify?":
        bot_not_understood_count += 1
    else:
        bot_not_understood_count = 0
    
    if bot_not_understood_count >= 2:
        response = "Our doubt support executive will take over the chat from here."
        escalated_to_executive = True
    else:
        # Storing bot response only if not escalated
        insert_transcript(timestamp, 'Bot', response)
    
    message = {"answer": response}
    return jsonify(message)

@app.route("/download-csv")
def download_csv():
    return send_file(CSV_FILE, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
