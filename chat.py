import random
import json
import torch
import csv
import datetime
import os.path

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "Sam"

def get_response(msg):
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])
    
    return "sorry I am unable to answer your question can you clarify?"

def log_to_csv(user_input, bot_response):
    file_exists = os.path.isfile('chat_log.csv')
    with open('chat_log.csv', mode='a', newline='') as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(['Timestamp', 'User Input', 'Bot Response'])
        writer.writerow([datetime.datetime.now(), user_input, bot_response])

if __name__ == "__main__":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "quit":
            break

        bot_response = get_response(user_input)
        print(bot_response)
        log_to_csv(user_input, bot_response)
