require('dotenv').config();

const server = require('./server');

const PORT = process.env.PORT || 5432;

server.listen(PORT, () => console.log(`Hello World! Port: ${PORT}`));
