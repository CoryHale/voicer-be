const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const userRouter = require('./users/userRouter.js');
const authRouter = require('./auth/authRouter');
const jobRouter = require('./jobs/jobRouter');
const jobOfferRouter = require('./jobOffers/jobOfferRouter');
const ClientProfileRouter = require('./clientProfiles/clientProfileRouter');
const talentProfileRouter = require('./talentProfiles/talentProfileRouter');
const restricted = require('./auth/authenticate-middleware');
const sign_s3 = require('./uploads/signS3');
const voiceSampleRouter = require("./talentVoiceSamples/voiceSampleRouter");

const server = express();

server.use(helmet());
server.use(express.json());
// server.use(cors({ origin: 'https://voicer-app.com', credentials: true }));
server.use(cors());


server.use('/api/users', restricted, userRouter);
server.use('/api/auth', authRouter);
server.use('/api/jobs', restricted, jobRouter);
server.use('/api/jobs', restricted, jobOfferRouter);
server.use('/api/clients', restricted, ClientProfileRouter);
server.use('/api/talents', restricted, talentProfileRouter);
server.use('/api/uploads', restricted, sign_s3.sign_s3);
server.use("/api/talents/voice-samples", restricted, voiceSampleRouter);

server.get('/', (req, res) => {
    res.send('<h1>Backend API for Voicer</h1>');
});

module.exports = server;
