'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var env = require('../../../env');



var transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	auth: {
		user: env.NODEMAILER.user,
		pass: env.NODEMAILER.pass
	}
}));


module.exports = router;


router.post('/sendemail', function (req, res, next) {
	var mailOptions = req.body;

	transporter.sendMail(mailOptions, function(err, response){
		if (err){ res.send(err)}
		else {
			console.log('Message sent: ' + response.message);
			res.status(201).end();
		}
	});


});



