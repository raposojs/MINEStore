'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
var Product = require('../../../db/models/product.js');
var utilities = require("../authUtility.js");

module.exports = router;


router.get('/', function (req, res, next) {
	Product.findAll()
		.then(function (products) {
			res.status(200).send(products);
		})
		.catch(next);
});


router.get('/:productID', function (req, res, next) {
	Product.findById(req.params.productID)
		.then(function (product) {
			res.status(200).send(product);
		})
		.catch(next);
});



router.post('/add', utilities.isAdministrator, function (req, res, next) {
	Product.create(req.body)
		.then(function (createdProduct) {
			res.status(201).send(createdProduct);
		})
		.catch(next);

});


router.put('/:productID', utilities.isAdministrator, function (req, res, next) {
    Product.update(req.body, { where: { id: req.params.productID } })
		.then(function (updatedProduct) {
			res.status(204).end();
		})
		.catch(next);
});


router.delete('/:productID', utilities.isAdministrator, function (req, res, next) {
    Product.destroy({
		where: { id: req.params.productID }
	})
		.then(function () {
			console.log('destroyed successfully');
		})
		.catch(next);
});