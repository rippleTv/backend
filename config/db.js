const mongoose = require('mongoose');
function initDb() {
	mongoose.connect(
		'mongodb://127.0.0.1:27017/RippleTv',
		{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
		function(error) {
			if (error) {
				console.log('Connection to Database Failed...');
			} else {
				console.log('Connected to Database...');
			}
		}
	);
}

module.exports = initDb;
