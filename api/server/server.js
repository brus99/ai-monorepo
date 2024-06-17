
const http = require('http');
const { createClient } = require('redis');

const server = http.createServer(async (request, response) => {
  const { headers, method, url } = request;

  const client = await redisFactory();


  let body = [];
  request
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', async () => {
      body = Buffer.concat(body).toString();
      console.log('body:', body);

      response.setHeader('Content-Type', 'application/json');


    console.log('path',url.pathName, url);


    if(body && url==='/setUserInfo' && request.method ==='POST') {
      const requestBody = JSON.parse(body);
      const { userId, userInfo } = requestBody;

      await client.set(userId, JSON.stringify(userInfo));
      console.log(userInfo, 'user info saved')

      response.statusCode = 200;
      response.write('User info saved');
      response.end();

    }
    if (url ==='/getUserInfo' && request.method ==='GET') {
      const requestBody = JSON.parse(body);
      const { userId } = requestBody;

      const userInfo = await client.get(userId);

      response.statusCode = 200;
      response.write(userInfo);

      response.end()
    }
  });
});
const port = 3000;
const hostname = '127.0.0.1';

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


async function redisFactory() {
  const client = createClient();

  client.on('error', (err) => {
    console.log('Redis Error', err);
  });

  await client.connect({
    enable_offline_queue: false,
  });
  return client;
}


