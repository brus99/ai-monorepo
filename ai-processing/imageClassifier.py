from typing import List
from transformers import pipeline
from flask import Flask, request
from flask_cors import CORS
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
app = Flask(__name__)
CORS(app)

@app.route("/suggestCombos", methods=['POST'], )
def suggestCombos(clothingData: List[str] = [], weatherRating = ''):

    data = request.get_json()

    print(data)

    imageData = data['clothingData']

    from transformers import pipeline
    classifier = pipeline("zero-shot-classification",
                        model="facebook/bart-large-mnli")
    
    candidate_labels = ['person', 'animal', 'object', 'other']

    frequencies = dict()

    for i in range(len(imageData)):
        res = classifier(imageData[i], candidate_labels)
        print(res)
        frequencies[res['labels'][0]] = frequencies.get(res['labels'][0], [])+ [imageData[i]]

    
    return frequencies


@app.route("/extractInfoFromImages", methods=['POST'])
def extractInfoFromImages():

    import requests
    from transformers import BlipProcessor, BlipForQuestionAnswering

    processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-base")
    model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-base")

    img_url = 'https://external-preview.redd.it/V3bkg7AFgFq4-Z-89Tmy7Kj8MWSeZuvd1G7O0S8Zs-Y.jpg?width=640&crop=smart&auto=webp&s=1ea301d67a34b57a7e917b55a2e354ee76dc2e19' 
    raw_image = Image.open(requests.get(img_url, stream=True).raw).convert('RGB')

    initialPrompt = "is this a car or person"

    inputs = processor(raw_image, initialPrompt, return_tensors="pt")
    out = model.generate(**inputs)

    carQuestions = ["does this contain a license plate?", "is the car moving", "what color is the car?"]
    personQuestions = ["is the person wearing a hat?", "is the person wearing glasses?", "what color is the person's shirt?", "how tall do they look?"]

    if(processor.decode(out[0], skip_special_tokens=True) == 'car'):
        res = []
        for question in carQuestions:
            inputs = processor(raw_image, question, return_tensors="pt")

            out = model.generate(**inputs)
            res.append(question + ' - ' + processor.decode(out[0], skip_special_tokens=True))
        print(res)
        return res
    elif(processor.decode(out[0], skip_special_tokens=True) == 'person'):
        res = []
        answers = dict()
        for question in personQuestions:
            inputs = processor(raw_image, question, return_tensors="pt")m

            out = model.generate(**inputs)
            res.append(question + ' - ' + processor.decode(out[0], skip_special_tokens=True))
        print(res)
        return res
    else:
        return "not a car or person"







@app.route("/", methods=['POST'])
def classifyImages():

    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
    responses = []

    for i in range(len(request.files)):

        image_key = 'image-' + str(i)

        raw_image = Image.open(request.files[image_key]).convert('RGB')


        print('i got',raw_image)

        text = "an image of"
        inputs = processor(raw_image, text, return_tensors="pt")

        out = model.generate(**inputs)
        model_response = processor.decode(out[0], skip_special_tokens=True)
        print(model_response)
        responses.append(model_response)

    return responses




