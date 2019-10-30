const express = require('express');
const users = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/users', users)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
function logger(req, res, next) {
  console.log(req.method, res.url, new Date())
  next()
}

module.exports = server;
