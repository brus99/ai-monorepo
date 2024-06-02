const MyClassificationPipeline = require('../pipeline');
const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');

const server = http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        console.log(handleRequest(body));

      });
  });
const hostname = '127.0.0.1';
const port = 3000;


async function handleRequest(body) {
  const { clothingData, weatherRating } = JSON.parse(body);

  const question = 'You are a fashion designer given a list of clothing and a weather rating. What clothing combos would you suggest? Return at least 3 items.';

  const context = clothingData + weatherRating;

  console.log(clothingData, weatherRating, question, context);

  let response;
  // eslint-disable-next-line no-constant-condition
  if (true) {
    const classifier = await MyClassificationPipeline.getInstance();
    response = await classifier(question, context);
  } else {
    response = { 'error': 'Bad request' }
  }

  return response;
}

//has to do with use of two server.on request handlers
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



    return result


    
*/