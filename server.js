// require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');


const server = express();
// const port = process.eventNames.PORT;


server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

// server.get('/', logger, (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`)
// });

//custom middleware

function logger(req, res, next) {
  console.log({
    method: req.method,
    url: req.url,
    timestamp: Date.now(),
  });
  next();
};


module.exports = server;
