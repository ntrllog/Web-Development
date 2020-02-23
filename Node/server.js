const express = require('express');

const app = express();

app.get('/', function(req, res) {
  res.send("Hello");
});

app.get('/about', function(req, res) {
  res.send('I am me.');
});

app.get('/contact', function(req, res) {
  res.send('contact me.');
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});

