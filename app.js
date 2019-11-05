const express = require('express');
require('express-async-errors');
const logger = require('morgan');
const Router = express.Router();
const cors = require('cors');
const helmet = require('helmet');

const appRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

//set security headers
app.use(helmet());

//enable cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));

app.use('/api', appRoutes(Router));

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use(errorHandler);

module.exports = app;
