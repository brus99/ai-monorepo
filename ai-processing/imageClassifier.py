from distutils.filelist import FileList
from typing import List
from aiohttp import FormData
from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForCausalLM
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/2")
def suggestCombos(clothingData: List[str] = [], weatherRating = ''):

    import torch

    suggestClassifier = pipeline('text-generation')

    prompt = '''you are a fashion designer who is skilled in creating an outfit. An outfit is defined as atleast one top piece like a shirt and one bottom like pants,
    'but you can also add more than one or accessories like hats if they are a part of the items I provide you. 
    Your skills include choosing color schemes for an outfit, considering the style of the outfit (like bojo or emo), and 
     very importantly you need to consider the weather the outfit will be used in. I will also give you the weather of the user in 5 categories: very cold, cold, medium, hot, very hot. 
     Here is the current weather rating I want you to consider 
     {weatherRating} 
      I will give you a list of items where each item is an article of clothing that was fed into another ml model to produce a 15 word descriptor of the clothing item. 
      I want you to provide outfit combination recommendations based on the input of clothing items and weather. 
      Return the outfits in a bulleted list and provide your justificaiton in 2 sentences under each. Provide the results in a format that can be easily parsed so I can extract the outfits to 
      the user, 
      include this as well as the bulleted list/description I described earlier. I will provide you the clothing items descriptions line by line here '''
    
    for item in clothingData:
        prompt += '/n{item}'

    res = suggestClassifier(task='text2text-generation',inputs=prompt)

    return res



from flask import request
from PIL import Image
@app.route("/", methods=['POST'])
def classifyImages():
    responses = []
    print(request.files)

    # Access the uploaded files
    for i in range(len(request.files)):
        file_key = 'image-' + str(i)
        file = request.files.get(file_key)

        if file:
            print('Received file', file.filename)

            suggestClassifier = pipeline('visual-question-answering')

            ques = 'What is this article of clothing?'
            imageData = Image.open(file.stream)
            res = suggestClassifier(imageData,ques)

            print(res)


            responses.append(res[0]) #results[0] contains the highest certainty guess by the model

    return responses




