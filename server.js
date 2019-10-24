const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/userRouter.js')
const authRouter = require('./auth/authRouter');
const jobRouter = require('./jobs/jobRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);
server.use('/api/jobs', jobRouter);

server.get('/', (req, res) => {
    res.send('<h1>Backend API for Voicer</h1>');
})

module.exports = server;