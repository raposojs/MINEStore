'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
var User = require('../../../db/').model('user');
module.exports = router;
var _ = require('lodash');
var utilities = require("../authUtility.js");


router.param('id', utilities.ensureAuthenticated, function (req, res, next, id) {
	console.log('ID IS', id);
    if (typeof +id !== 'number') return next();
	User.findById(id)
		.then(function (user) {
			if (user) {
				req.user = user;
				next();
				return null; // silence Bluebird warning re: non-returned promise in next
			} else {
				throw new Error(404);
			}
		})
		.catch(next);
});



router.get('/secret-stash', utilities.isAdministrator, function (req, res) {

    var theStash = [
        'http://ep.yimg.com/ay/candy-crate/bulk-candy-store-2.gif',
        'http://www.dailybunny.com/.a/6a00d8341bfd0953ef0148c793026c970c-pi',
        'http://images.boomsbeat.com/data/images/full/44019/puppy-wink_1-jpg.jpg',
        'http://p-fst1.pixstatic.com/51071384dbd0cb50dc00616b._w.540_h.610_s.fit_.jpg',
        'http://childcarecenter.us/static/images/providers/2/89732/logo-sunshine.png',
        'http://www.allgraphics123.com/ag/01/10683/10683.jpg',
        'http://img.pandawhale.com/post-23576-aflac-dancing-duck-pigeons-vic-RU0j.gif',
        'http://www.eveningnews24.co.uk/polopoly_fs/1.1960527.1362056030!/image/1301571176.jpg_gen/derivatives/landscape_630/1301571176.jpg',
        'http://media.giphy.com/media/vCKC987OpQAco/giphy.gif',
        'https://my.vetmatrixbase.com/clients/12679/images/cats-animals-grass-kittens--800x960.jpg',
        'http://www.dailymobile.net/wp-content/uploads/2014/10/lollipops.jpg'
    ];

    res.send(_.shuffle(theStash))

});

router.post('/checkEmail', function(req, res, next){
	User.findAll({where: req.body})
		.then(function(user){
			res.send(!!user.length); 
		})
		.catch(next)
});

router.get('/:id', utilities.verifyUser, function (req, res, next) {
	res.json(req.user);
});


router.get('/:id', utilities.verifyUser, function (req, res, next) {
	res.json(req.user);
});


router.get('/', utilities.isAdministrator, function (req, res, next) {
	User.findAll()
		.then(function (users) {
			res.json(users);
		})
		.catch(next);
});





router.post('/', function (req, res, next) {
	console.log(req.body);
	req.body.isAdmin = false;
	User.create(req.body)
		.then(function (user) {
			res.status(201).json(user);
		})
		.catch(next);
});

router.put('/:id', utilities.adminOrUser, function (req, res, next) {
	// User.update(req.body, {
	// 	where: {
	// 		id: req.params.id
	// 	}
	// })


	User.findById(req.params.id)
		.then(function (user) {
			user.update(req.body)
				.then(function (updatedUser) {
					res.json(updatedUser);
				})
		})
		.catch(next);
});

router.delete('/:id', utilities.isAdministrator, function (req, res, next) {
	User.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(function () {
			res.status(204).end();
		})
		.catch(next);
});


