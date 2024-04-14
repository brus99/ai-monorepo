from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from flask import Flask

app = Flask(__name__)




@app.route("/")
def classifyImages():
    classifier = pipeline(task='image-classification')

    results = classifier(images='https://media.istockphoto.com/id/685779142/photo/red-tshirt-clothes.jpg?s=2048x2048&w=is&k=20&c=1WMEw-9MQ0RKWzyYZYF8k5GUesY6YvtdosEAFk46wZY=')


    responses = []

    for res in results:
        responses.append(res['label'])

    return responses[0]




