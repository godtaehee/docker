const express = require('express');

const port = 8080;
const host = 'localhost';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log('http://localhost:8080')
})