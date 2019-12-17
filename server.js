const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRouter = require('./users/userRouter.js');
const authRouter = require('./auth/authRouter');
const jobRouter = require('./jobs/jobRouter');
const jobOfferRouter = require('./jobOffers/jobOfferRouter');
const ClientProfileRouter = require('./clientProfiles/clientProfileRouter');
const talentProfileRouter = require('./talentProfiles/talentProfileRouter');
const restricted = require('./auth/authenticate-middleware');
const sign_s3 = require('./auth/sign_s3');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000', credentials: true }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/api/users', restricted, userRouter);
server.use('/api/auth', authRouter);
server.use('/api/jobs', restricted, jobRouter);
server.use('/api/jobs', restricted, jobOfferRouter);
server.use('/api/clients', restricted, ClientProfileRouter);
server.use('/api/talents', restricted, talentProfileRouter);
server.use('/api/uploads', sign_s3.sign_s3);

server.get('/', (req, res) => {
  res.send('<h1>Backend API for Voicer</h1>');
});

module.exports = server;
