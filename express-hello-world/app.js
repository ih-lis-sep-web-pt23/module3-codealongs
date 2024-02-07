const express = require('express');
const logger = require('morgan');

const app = express();

// setup the request logger to run on each request
app.use(logger('dev'));

// make the files inside of the 'public' folder available
app.use(express.static('public'));

// parses incoming http requests that contain json
app.use(express.json());

app.get('/home', (request, response) => {
  // console.log(request);
  response.sendFile(__dirname + '/views/home-page.html');
  // response.send('<h1>Welcome Ironhacker!</h1>');
});

app.get('/cat', (request, response) => {
  console.log(__dirname);
  response.sendFile(__dirname + '/views/cat-page.html');

  // response.send(`<!DOCTYPE html>
  // <html>
  //   <head>
  //     <meta charset="utf-8">
  //     <title>Cat</title>
  //     <link rel="stylesheet" href="/stylesheets/styles.css" />
  //   </head>
  //   <body>
  //     <h1>Cat</h1>
  //     <p>This is my second route</p>
  //     <img src="/images/cool-cat.jpg" />
  //   </body>
  // </html>`);
});

app.get('/data', (request, response) => {
  const user = {
    username: 'LuciaDuarte',
    firstName: 'Lucia',
    lastName: 'Duarte'
  };

  response.json(user);
});

app.get('/users/:username/books/:bookId', (req, res) => {
  // request parameters
  // object where the key is defined above in the route after :
  // and the value is whatever is called in the endpoint
  console.log(req.params);
  res.send(req.params);
});

// search?query=ironhack
// search?school=ironhack&course=web
app.get('/search', (req, res) => {
  // comes after the ?
  // follows the structure key=value -> school=ironhack
  console.log(req.query);

  res.send(req.query);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(3000, () => console.log('Port running!'));
