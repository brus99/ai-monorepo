from distutils.filelist import FileList
from typing import List
from aiohttp import FormData
from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForCausalLM
from flask import Flask

app = Flask(__name__)


@app.route("/2")
def suggestCombos(clothingData: List[str] = []):

    import torch

    suggestClassifier = pipeline('text-generation')

    ques = 'placehold'


    res = suggestClassifier(question=ques,image=imageData)

    return res



@app.route("/")
def classifyImages(fileList: FormData = []):
    responses = []

    for file in fileList:
        imageData = file.read()
        
        suggestClassifier = pipeline('visual-question-answering')

        ques = 'you are catalogeing a persons closet. Describe this article of clothing in 15 words. Describe it so somebody could easily pick out the article of clothing based on the descriptors and most importantly, ensure that the descriptors let them know in what weather they can wear it. Make sure you break down the weather into 5 categories, very cold, cold, medium, hot and very hot. Your second priority should be fashion, such as the style of the clothing like Bojo, formal or summery.'


        res = suggestClassifier(question=ques,image=imageData)

        responses.append(res[0]) #results[0] contains the highest certainty guess by the model


    return responses




