const express = require('express');
const cors = require('cors');
//const helmet = require('helmet');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const secret = require('../config/secrets');

const server = express();

server.use(cors());
server.use(express.json());

server.get('/login', (req, res) => {
  res.status(200).send('<h1>Login endpoint</h1>')
});

module.exports = server;
