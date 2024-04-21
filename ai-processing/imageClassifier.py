from typing import List
from transformers import pipeline
from flask import Flask, request
from flask_cors import CORS
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration, BlipTextModel

app = Flask(__name__)
CORS(app)

@app.route("/suggestCombos")
def suggestCombos(clothingData: List[str] = [], weatherRating = ''):

    import transformers
    import torch

    model_id = "meta-llama/Meta-Llama-3-8B"

    pipeline = transformers.pipeline(
        "text-generation", model=model_id, model_kwargs={"torch_dtype": torch.bfloat16}, device_map="auto"
    )



    prompt = '''you are a fashion designer. you have a client who is looking for a new outfit. they are looking for something that is perfect for a {weatherRating} day. they have given you the following items of clothing to work with:
    ''' + clothingData + ''' With this clothing data, I want you to supply me suggested outfit combinations based on the weather rating you are given. The weather rating you are given will be in a 5 scale, very cold/cold/medium/hot/very hot. Suggest as many combos as you feel appropriately fits the criteria.'''

    res = pipeline(prompt)


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




