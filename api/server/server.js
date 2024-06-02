const http = require('http');
const url = require('url');
const querystring = require('querystring');


// Define the HTTP server
const server = http.createServer();
const hostname = '127.0.0.1';
const port = 3000;

// Listen for requests made to the server
server.on('request', async (req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url);

  // Extract the query parameters
  const { text } = querystring.parse(parsedUrl.query);

  // Set the response headers
  res.setHeader('Content-Type', 'application/json');

  let response;
  if (parsedUrl.pathname === '/classify' && text) {
    const classifier = await MyClassificationPipeline.getInstance();
    response = await classifier(text);
    res.statusCode = 200;
  } else {
    response = { 'error': 'Bad request' }
    res.statusCode = 400;
  }

  // Send the JSON response
  res.end(JSON.stringify(response));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



class MyClassificationPipeline {
  static task = 'text-classification';
  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // Dynamically import the Transformers.js library
      let { pipeline, env} = await import('@xenova/transformers');

      // NOTE: Uncomment this to change the cache directory
      // env.cacheDir = './.cache';

      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}
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