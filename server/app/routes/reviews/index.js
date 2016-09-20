var express = require("express");
var router = express.Router();
var Reviews = require("../../../db/models/reviews.js");
var User = require("../../../db/models/user.js");
var utilities = require("../authUtility.js");


router.get('/products/:id', function (req, res, next) {
	Reviews.findAll({
		where: {
			productId: req.params.id
		},
		include: [{model: User}]
	})
		.then(function (reviews) {
			if (reviews) {
				res.status(200).send(reviews);
			} else {
				res.sendStatus(404);
			}
		})
		.catch(next);
})

router.get('/users/:id', function (req, res, next) {
	Reviews.findAll({
		where: {
			userId: req.params.id
		}
	})
		.then(function (reviews) {
			if (reviews) {
				res.status(200).send(reviews);
			} else {
				res.sendStatus(404);
			}
		})
		.catch(next);
})

router.post('/products/:id', utilities.ensureAuthenticated, function (req, res, next) {
	var id = req.params.id;
	var body = req.body;
	Reviews.create({
		reviewContent: body.reviewContent,
		stars: body.stars,
		productId: id,
		userId: req.user.id
	})
		.then(function (review) {
			res.status(201).send(review);
		})
		.catch(next)
})

router.put('/:id', function (req, res, next) {
	var reviewId = req.params.id;
	var body = req.body;
	Reviews.update(body, {
		where: {
			id: reviewId
		}
	}
	)
		.then(function (review) {
			res.status(201).send(review);
		})
		.then(function (review) {
			res.status(201).send(review);
		})
		.catch(next)
})

router.delete('/:id', utilities.isAdministrator, function (req, res, next) {
	var id = req.params.id;
	Reviews.findById(id)
		.then(function (review) {
			if (review) {
				return review.destroy()
				.then(function(){
					res.sendStatus(204);
				})
			}
			else {
				res.sendStatus(404);
			}
		})
})

module.exports = router;

