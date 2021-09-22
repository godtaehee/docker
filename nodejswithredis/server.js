const express = require('express');
const redis = require('redis');

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

const port = 8080;

const app = express();
client.set('number', 0);

app.get('/', (req, res) => {
  client.get("number", (err, number) => {
    res.send(number);
    client.set("number", parseInt(number) + 1);
  });
});


app.listen(port, () => {
  console.log('http://localhost:5000')
})