require('dotenv').config();

const schedule = require('./cronJob.js');

const server = require('./server');

const PORT = process.env.PORT || 4000;

// Testing Cron Job immediately
// "0 * * * *"
// Testing Cron Job every hour
// "* 1 * * *"
// Cron Job Monthly
// "0 0 1 1-12 *"

schedule()





server.listen(PORT, () => console.log(`Hello World! Port: ${PORT}`));
