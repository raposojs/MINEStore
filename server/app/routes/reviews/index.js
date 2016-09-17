var express = require("express");
var router = express.Router();
var Reviews = require("../../../db/models/reviews.js");

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/products/:id', function (request, response, next) {
	var id = request.params.id;
	Reviews.findAll({
		where: {
			productId: id
		}
	})
		.then(function (reviews) {
			if (reviews) {
				response.status(200).send(reviews);
			} else {
				response.sendStatus(404);
			}
		})
		.catch(next);
})

router.get('/users/:id', function (request, response, next) {
	var id = request.params.id;
	Reviews.findAll({
		where: {
			userId: id
		}
	})
		.then(function (reviews) {
			if (reviews) {
				response.status(200).send(reviews);
			} else {
				response.sendStatus(404);
			}
		})
		.catch(next);
})

router.post('/products/:id', function (request, response, next) {

	var id = request.params.id;
	var body = request.body;
	console.log(id);
	console.log(body);
	Reviews.create({
		reviewContent: body.reviewContent,
		stars: body.stars,
		productId: id,
		userId: body.userId
	})
		.then(function (review) {
			response.status(201).send(review);
		})
		.catch(next)
})

router.put('/:id', function (request, response, next) {
	var reviewId = request.params.id;
	var body = request.body;
	Reviews.update(body, {
		where: {
			id: reviewId
		}
	}
	)
		.then(function (review) {
			response.status(201).send(review);
		})
		.then(function (review) {
			response.status(201).send(review);
		})
		.catch(next)
})

router.delete('/:id', function (request, response, next) {
	var id = request.params.id;
	Reviews.findById(id)
		.then(function (review) {
			if (review) {
				return review.destroy({ force: true })
			}
			else {
				return
			}
		})
		.then(function (x) {
			if (x) {
				response.sendStatus(204);
			}
			else {
				response.sendStatus(404);
			}
		})
})

module.exports = router;

