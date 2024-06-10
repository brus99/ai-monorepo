from typing import List
from transformers import pipeline
from flask import Flask, request
from flask_cors import CORS
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration, BlipTextModel
from transformers import AutoModelForCausalLM, AutoTokenizer
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
    
    sequence_to_classify = imageData[0]
    candidate_labels = ['person', 'animal', 'object', 'other']

    frequencies = dict()

    for i in range(len(imageData)):

        res = classifier(imageData[i], candidate_labels)
        print(res)
        frequencies[res['labels'][0]] = frequencies.get(res['labels'][0], [])+ [imageData[i]]

        
    print(frequencies)
    return frequencies
    
    #{'labels': ['travel', 'dancing', 'cooking'],
    # 'scores': [0.9938651323318481, 0.0032737774308770895, 0.002861034357920289],
    # 'sequence': 'one day I will see the world'}










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




