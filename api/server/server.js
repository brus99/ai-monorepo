const MyClassificationPipeline = require('../pipeline');
const redis = require('redis');
const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');


import { createClient } from 'redis';

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





const server = http.createServer((request, response) => {
  const { headers, method, url } = request;
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

      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      const jsonResponse = JSON.stringify(responseBody);
      response.write(jsonResponse);
      response.end();
    });

    if(url.pathName ==='/setUserInfo' && request.method ==='POST') {
      const requestBody = JSON.parse(body);
      const { userId, userInfo } = requestBody;

      client.set(userId, JSON.stringify(userInfo));

    };
});

const hostname = '127.0.0.1';
const port = 3000;


async function handleRequest(body) {
  client.call('JSON.SET', )
}
