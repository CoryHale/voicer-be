const express = require('express');
const cors = require('cors');
//const helmet = require('helmet');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const secret = require('../config/secrets');

const server = express();

server.use(cors());
server.use(express.json());

server.post('/api/login', (req, res) => {
  let { username, password } = req.body;
  res.status(200).json({message: `Welcome ${username}`});
});

module.exports = server;
