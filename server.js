require('dotenv').config();
const express = require('express');
const users = require('./users/userRouter');
const posts = require('./posts/postRouter');

const server = express();

server.use(express.static(__dirname + '/client/build'))
server.use(express.json());
server.use(logger);
server.use('/api/users', users)
server.use('/api/posts', posts)

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
});

//custom middleware
function logger(req, res, next) {
  console.log(req.method, req.url, new Date())
  next()
}

module.exports = server;
