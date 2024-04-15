
AI Chatbot Project
This project implements an AI chatbot using PyTorch for natural language processing (NLP), Flask for backend server development, and HTML with JavaScript for the frontend interface.

Overview
The goal of this project is to create an intelligent chatbot capable of understanding and responding to user queries in natural language. The chatbot leverages PyTorch, a deep learning framework, to build a neural network model for NLP tasks. Additionally, it utilizes NLTK (Natural Language Toolkit) for text preprocessing and optimization techniques such as stemming and lemmatization.

Features
NLP Optimization: The chatbot preprocesses user queries using stemming and lemmatization techniques provided by NLTK. This optimization helps in reducing the dimensionality of the input space and improving the accuracy of the neural network model.
PyTorch Neural Network: The core of the chatbot is powered by a neural network model implemented using PyTorch. This model is trained on a dataset of conversations to understand and generate appropriate responses.
Flask Backend: Flask is used to develop the backend server that handles incoming user queries, processes them, and generates responses using the trained neural network model.
HTML and JavaScript Frontend: The frontend interface of the chatbot is built using HTML and JavaScript. It provides users with an intuitive chatbox where they can interact with the chatbot.
NLP Optimization
Stemming
Stemming is the process of reducing words to their root or base form. It helps in simplifying the vocabulary by removing suffixes and prefixes. For example, "running" and "runner" are stemmed to "run". This optimization reduces the complexity of the input text and improves the efficiency of the NLP model.

Lemmatization
Lemmatization is similar to stemming but aims to return the base or dictionary form of a word, known as the lemma. Unlike stemming, lemmatization considers the context of the word and ensures that the resulting lemma is a valid word. For example, "running" and "ran" are lemmatized to "run". By preserving the semantic meaning of words, lemmatization enhances the accuracy of the NLP model.

Neural Network Model
The neural network model used in this project is trained on a dataset. 
The NeuralNet class defines a feedforward neural network with two hidden layers, ReLU activation functions, and customizable input, hidden, and output sizes, suitable for various classification tasks.
### Create an environment
Whatever you prefer (e.g. `conda` or `venv`)
```console
mkdir myproject
$ cd myproject
$ python3 -m venv venv
```

### Activate it
Mac / Linux:
```console
. venv/bin/activate
```
Windows:
```console
venv\Scripts\activate
```
### Install PyTorch and dependencies

For Installation of PyTorch see [official website](https://pytorch.org/).

You also need `nltk`:
 ```console
pip install nltk
 ```

If you get an error during the first run, you also need to install `nltk.tokenize.punkt`:
Run this once in your terminal:
 ```console
$ python
>>> import nltk
>>> nltk.download('punkt')
```

## Usage
Run
```console
python train.py
```
This will dump `data.pth` file. And then run
```console
python chat.py
