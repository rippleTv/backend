const { readFileSync } = require('fs');
const { resolve } = require('path');
const emailDir = resolve('email-templates');
const config = require('../config');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);

exports.sendConfirmEmailMessage = function sendConfirmEmailMessage(user) {
	const verificationLink = `https://rippletvapi.herokuapp.com/api/user/verify/${user.verification_code}`;
	const html = readFileSync(`${emailDir}/confirm.html`)
		.toString()
		.replace(/{{LINK}}/, verificationLink);

	const msg = {
		to: user.email,
		from: 'support@rippletv.com',
		subject: 'Confirm RippleTv Email Address',
		html
	};

	sgMail.send(msg);
};
