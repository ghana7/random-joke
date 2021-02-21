const _ = require('underscore');
// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst.' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie.' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers.' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends.' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me.' },
  { q: 'Can February March?', a: 'No, but April May' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
  { q: 'Dad, can you put the cat out?', a: 'I didnt know it was on fire.' },
  { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved.' },
  { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite' },
];
const getJokes = (limit) => {
  let clampedLimit = limit;
  if (clampedLimit < 1) {
    clampedLimit = 1;
  }
  if (clampedLimit > jokes.length) {
    clampedLimit = jokes.length;
  }

  const shuffled = _.shuffle(jokes);
  const firstJokes = _.first(shuffled, clampedLimit);
  return firstJokes;
};

const getJoke = () => jokes[Math.floor(Math.random() * jokes.length)];

const getJokesJSON = (limit) => JSON.stringify(getJokes(limit));

const getJokeJSON = () => JSON.stringify(getJoke());

const getJokesXML = (limit) => {
  const randJokes = getJokes(limit);
  let xml = `<jokes>
  `;
  randJokes.forEach((joke) => {
    xml += `<joke>
              <q>${joke.q}</q>
              <a>${joke.a}</a>
            </joke>`;
  });
  xml += '</jokes>';
  return xml;
};

const getJokeXML = () => {
  const joke = getJoke();
  return `<joke>
            <q>${joke.q}</q>
            <a>${joke.a}</a>
          </joke>`;
};

const respond = (response, type, content) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getRandomJokeResponse = (request, response, params, acceptedTypes) => {
  let content;
  let type;
  if (acceptedTypes[0] === 'text/xml') {
    content = getJokeXML();
    type = 'text/xml';
  } else {
    content = getJokeJSON();
    type = 'application/json';
  }
  respond(response, type, content);
};

const getRandomJokesResponse = (request, response, params, acceptedTypes) => {
  let content;
  let type;
  if (acceptedTypes[0] === 'text/xml') {
    content = getJokesXML(params.limit);
    type = 'text/xml';
  } else {
    content = getJokesJSON(params.limit);
    type = 'application/json';
  }
  respond(response, type, content);
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
module.exports.getRandomJokesResponse = getRandomJokesResponse;
