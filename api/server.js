const express = require('express');
const cors = require('cors');
//const helmet = require('helmet');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const secret = require('../config/secrets');

const server = express();

const authRouter = require('../auth/authRouter.js');

server.use(cors());
server.use(express.json());
server.use('/api/auth', authRouter);


module.exports = server;
