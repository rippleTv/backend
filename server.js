const { createServer } = require('http');

const app = require('./app');
const config = require('./config');
// const dbConnect = require('./config/db');
const server = createServer(app);

server.listen(config.PORT);

server.on('listening', () => {
	console.log(`Server listening at port ${config.PORT}`);
	// dbConnect();
});

server.on('error', err => {
	console.error(err.message);
});
