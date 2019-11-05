const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/userRouter.js');
const authRouter = require('./auth/authRouter');
const jobRouter = require('./jobs/jobRouter');
const jobOfferRouter = require('./jobOffers/jobOfferRouter');
const ClientProfileRouter = require('./clientProfiles/clientProfileRouter');
const talentProfileRouter = require('./talentProfiles/talentProfileRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);
server.use('/api/jobs', jobRouter);
server.use('/api/jobs', jobOfferRouter);
server.use('/api/clients', ClientProfileRouter);
server.use('/api/talents', talentProfileRouter);

server.get('/', (req, res) => {
  res.send('<h1>Backend API for Voicer</h1>');
});

module.exports = server;
