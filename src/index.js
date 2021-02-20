// 1 - pull in the HTTP server module
const http = require('http');
const query = require('querystring');
// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');
const htmlResponses = require('./htmlResponses');
const jsonResponses = require('./jsonResponses');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/random-joke': jsonResponses.getRandomJokeResponse,
  notFound: htmlResponses.get404Response,
};
// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);
  console.log('parsedUrl=', parsedUrl);
  console.log('pathname=', pathname);

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
