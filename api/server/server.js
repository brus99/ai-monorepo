const MyClassificationPipeline = require('../pipeline');

const http = require('http');
const url = require('url');
const querystring = require('querystring');


const server = http.createServer();
const hostname = '127.0.0.1';
const port = 3000;

server.on('request', async (req, res) => {
  const parsedUrl = url.parse(req.url);

  const { text } = querystring.parse(parsedUrl.query);

  res.setHeader('Content-Type', 'application/json');

  let response;
  if (parsedUrl.pathname === '/classify' && text) {
    const classifier = await MyClassificationPipeline.getInstance();
    response = await classifier(text, 'answer this question, today is friday');
    res.statusCode = 200;
  } else {
    response = { 'error': 'Bad request' }
    res.statusCode = 400;
  }

  res.end(JSON.stringify(response));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




/*
@app.route("/suggestCombos", methods=['POST'])
def suggestCombos(clothingData: List[str] = [], weatherRating = ''):
    data = request.get_json()
    print(data)


    print(data['clothingData'])


    clothing = ''

    for item in data['clothingData']:
        clothing += item + ' '
    
    weatherRating = data['weatherRating']




    pipe= pipeline('question-answering')


    question = 'You are a fashion designer given a list of clothing and a weather rating. What clothing combos would you suggest. Return atleast 3 items?'
    context = clothing + weatherRating

    result = pipe(question,context)

    print(
        f"Answer: '{result['answer']}', score: {round(result['score'], 4)}, start: {result['start']}, end: {result['end']}"
    )


    return result


    
*/