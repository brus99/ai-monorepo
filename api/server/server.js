const MyClassificationPipeline = require('../pipeline');
const redis = require('redis');
const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');


import { createClient } from 'redis';


http.createServer(async (request, response) => {
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
    });


    if(url.pathName ==='/setUserInfo' && request.method ==='POST') {
      const requestBody = JSON.parse(body);
      const { userId, userInfo } = requestBody;

      client.set(userId, JSON.stringify(userInfo));

      response.statusCode = 200;
      response.write('User info saved');
      response.end();

    }
    if (url.pathName ==='/getUserInfo' && request.method ==='GET') {
      const requestBody = JSON.parse(body);
      const { userId } = requestBody;

      response.statusCode = 200;
      response.write(client.get(userId));

      response.end()
    }
});

async function redisFactory() {
  const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: '=',
        port: 10837
    },
    connectTimeout: 10000,
  });

  client.on('error', (err) => {
    console.log('Redis Error', err);
  });

  await client.connect();
  return client;
}
