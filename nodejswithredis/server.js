const express = require('express');
const redis = require('redis');

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

const port = 8080;
const host = 'localhost';

const app = express();
client.set('number', 0);

app.get('/', (req, res) => {
  client("number", (err, number) => {
    client.set("number", parseInt(number) + 1);
    res.send(number);
  });
});


app.listen(port, () => {
  console.log('http://localhost:8080')
})