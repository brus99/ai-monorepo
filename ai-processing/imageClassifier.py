from typing import List
from transformers import pipeline
from flask import Flask, request
from flask_cors import CORS
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration, BlipTextModel

app = Flask(__name__)
CORS(app)

@app.route("/suggestCombos", methods=['POST'])
def suggestCombos(clothingData: List[str] = [], weatherRating = ''):


    pipe= pipeline('question-answering')


    question = 'what color is the sky'
    context = 'the sky is blue'

    res = pipe(question,context)

    print(res)


    return res


    








@app.route("/", methods=['POST'])
def classifyImages():

    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
    responses = []

    for i in range(len(request.files)):

        image_key = 'image-' + str(i)

        raw_image = Image.open(request.files[image_key]).convert('RGB')


        print('i got',raw_image)

        text = "a photography of"
        inputs = processor(raw_image, text, return_tensors="pt")

        out = model.generate(**inputs)
        model_response = processor.decode(out[0], skip_special_tokens=True)
        print(model_response)
        responses.append(model_response)

    return responses




