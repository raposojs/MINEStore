'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap

var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
        user: 'customerservice.mine@gmail.com',
        pass: 'MINE1234'
    }
});

module.exports = router;


router.get('/sendemail', function (req, res, next) {

	var mailOptions = {
		to: req.query.to,
		subject: req.query.subject,
		text: req.query.text
	};

	smtpTransport.sendMail(mailOptions, function(err, res){
		if (err){ res.send(err)}
		else {
			console.log('Message sent: ' + res.message);
			res.status(201).end();
		}
	});


});



