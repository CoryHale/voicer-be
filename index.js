require('dotenv').config();
const schedule = require('./cronJob.js');

const server = require('./server');

const PORT = process.env.PORT || 4000;

schedule()

server.listen(PORT, () => console.log(`Hello World! Port: ${PORT}`));
