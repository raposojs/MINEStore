var router = require('express').Router();
var Promise = require('bluebird');
module.exports = router;
// var bodyParser = require('body-parser')

var Order = require('../../../db/models/order.js')

// var cart = {};
// var products = [];


router.use('/*', function (req, res, next) {
	if (req.user) {
		Order.findOne({
			where: {
				userId: req.user.id
			}
		})
			.then(function (order) {
				if (!order) {
					res.end();
					return null;
				}
				order.getProducts()
					.then(function (productsArray) {
						req.cart = order;
						req.products = productsArray;
						next();
						//res.json({ cart: order, products: products });
					}).catch(next);
			}).catch(next);
	} else {
		Order.findOne({
			where: {
				sId: req.session.id
			}
		})
			.then(function (order) {
				if (!order) {
					res.end();
					return null;
				}
				order.getProducts()
					.then(function (productsArray) {
						req.cart = order;
						req.products = productsArray;
						next();
						// res.json({ cart: order, products: products });
					}).catch(next);
			}).catch(next);
	}
})

// router.get('/all', function(req, res ,next){
// 	res.json({allCart: cart, allProducts: products});
// })


// GET => ORDER ID => 'orders/:id'
router.get('/', function (req, res, next) {
	res.json({ cart: req.cart, products: req.products });
});


// POST => ORDER ID => 'orders/:id'
router.post('/', function (req, res, next) {
	Order.create({
		price: 0,
		isCart: true
	})
		.then(function (createdOrder) {
			res.send(createdOrder)
		})
})

router.post('/add', function (req, res, next) {
	req.cart.addProduct(req.body.id)
		.then(function (newOrder) {
			req.cart.price = req.cart.price + req.body.price
				req.cart.save()
				.then(function (updatedOrder) {
					res.json(updatedOrder);
				})
		}).catch(next);
});

router.post('/remove', function (req, res, next) {
	req.cart.removeProduct(req.body.id)
		.then(function (newOrder) {
			req.cart.price = req.cart.price - req.body.price;
				req.cart.save()
				.then(function (updatedOrder) {
					res.json(updatedOrder);
				})
		}).catch(next);
})

// DELETE => ORDER ID => 'orders/:id'
router.delete('/', function (req, res, next) {

	req.cart.destroy()
		.then(function (updatedOrder) {
			res.sendStatus(204)
		})
})


router.put('/', function (req, res, next) {
	Order.update(req.body, { where: { id: req.cart.id } })
		.then(function (updatedOrder) {
			console.log(updatedOrder);
			res.status(204).end();
		})
		.catch(next);
});
