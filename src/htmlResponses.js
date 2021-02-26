const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const jokeClient = fs.readFileSync(`${__dirname}/../client/joke-client.html`);
const defaultStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getJokeClient = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(jokeClient);
  response.end();
};

const getDefaultStyles = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(defaultStyles);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getJokeClient = getJokeClient;
module.exports.getDefaultStyles = getDefaultStyles;
