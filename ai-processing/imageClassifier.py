from typing import List
from transformers import pipeline
from flask import Flask, request
from flask_cors import CORS
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
app = Flask(__name__)
CORS(app)

@app.route("/sortResponsesToBuckets", methods=['POST'], )
def suggestCombos():

    data = request.get_json()

    print(data)

    imageData = data.get('imageClassificationData', []) 

    from transformers import pipeline
    classifier = pipeline("zero-shot-classification",
                        model="facebook/bart-large-mnli")
    
    candidate_labels = ['person', 'animal', 'object', 'other']

    frequencies = dict()

    for i in range(len(imageData)):
        res = classifier(imageData[i], candidate_labels)
        print(res)
        frequencies[res['labels'][0]] = frequencies.get(res['labels'][0], []) + [imageData[i]]

    
    return frequencies


@app.route("/extractInfoFromImages", methods=['POST'])
def extractInfoFromImages():

    import requests
    from transformers import BlipProcessor, BlipForQuestionAnswering

    processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-base")
    model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-base")

    img_url = 'https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/v2/LSUGYJFTKFPG5P6J3L6SHRYMDI.jpg?auth=5c4c07d824291378dc0cd5f9de34a0e522be2aa549306a109365311432ee0885&height=553&width=830&smart=true&quality=80' 
    raw_image = Image.open(requests.get(img_url, stream=True).raw).convert('RGB')

    initialPrompt = "is this a car, person or animal?"

    inputs = processor(raw_image, initialPrompt, return_tensors="pt")
    out = model.generate(**inputs)

    carQuestions = ["does this contain a license plate?", "is the car moving", "what color is the car?", "what model is the car?"]
    personQuestions = ["is the person wearing a hat?", "is the person wearing glasses?", "what color is the person's shirt?", "how tall do they look?"]
    animalQuestions = ["what type of animal is it?", "what color is the animal?", "is the animal wearing a collar?"]

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
            inputs = processor(raw_image, question, return_tensors="pt")

            out = model.generate(**inputs)
            res.append(question + ' - ' + processor.decode(out[0], skip_special_tokens=True))
        print(res)
        return res
    elif(processor.decode(out[0], skip_special_tokens=True) == 'animal'):
        res = []
        answers = dict()
        for question in animalQuestions:
            inputs = processor(raw_image, question, return_tensors="pt")

            out = model.generate(**inputs)
            res.append(question + ' - ' + processor.decode(out[0], skip_special_tokens=True))
        print(res)
        return res
    else:
        return "not a car, person, or animal"







@app.route("/", methods=['POST'])
def classifyImages():

    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
    responses = []



    

    for i in range(len(request.files)):
        image_key = 'image-' + str(i)

        raw_image = Image.open(request.files[image_key]).convert('RGB')
        
        text = "an image of"
        inputs = processor(raw_image, text, return_tensors="pt")

        out = model.generate(**inputs)
        model_response = processor.decode(out[0], skip_special_tokens=True)
        print(model_response)
        responses.append(image_key +': ' + model_response)

    return responses




