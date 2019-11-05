const mongoose = require('mongoose');
const config = require('./index');

function initDb() {
	mongoose.connect(
		config.MONGO_URI,
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		},
		function(error) {
			if (error) {
				console.log('Not connected to Database...');
			} else {
				console.log('Connected to Database...');
			}
		}
	);
}

module.exports = initDb;
