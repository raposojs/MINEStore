var router = require('express').Router();
module.exports = router;
// var bodyParser = require('body-parser')

var Order = require('../../../db/models/order.js')

router.param('id', function (req, res, next, id) {
    if (typeof +id !== 'number') return next();
	console.log('ID is', id);
	Order.findById(id)
		.then(function (order) {
			if (order) {
				req.order = order;
				next();
				return null; // silence Bluebird warning re: non-returned promise in next
			} else {
				throw new Error(404);
			}
		})
		.catch(next);
});

router.get('/', function (req, res, next) {
	Order.findAll()
		.then(function (orders) {
			res.status(200).send(orders);
		})
		.catch(next);
});


// GET => ORDER ID => 'orders/:id'
router.get('/:id', function (req, res, next) {
	var orderId = req.params.id;
	Order.findById(orderId)
		.then(function (theOrder) {
			if (!theOrder) {
				res.end();
				return null;
			}
			theOrder.getProducts()
				.then(function (products) {
					console.log('PRODUCTS', products);
					console.log('SNIPPET', products[0].snippet);
					res.json({ cart: theOrder, products: products });
				}).catch(next);
		})
		.catch(next)
});

// POST => ORDER ID => 'orders/:id'
router.post('/', function (req, res, next) {

	Order.create({
		price: req.body.price,
		isCart: true
	})
		.then(function (createdOrder) {
			res.send(createdOrder)
		})
})

router.post('/:id/add', function (req, res, next) {
	req.order.addProduct(req.body.product.id)
		.then(function (newOrder) {
			res.json(newOrder);
		}).catch(next);
});

router.post('/:id/remove', function (req, res, next) {
	req.order.removeProduct(req.body.product.id)
	.then(function(newOrder){
		res.json(newOrder);
	}).catch(next);
})

// DELETE => ORDER ID => 'orders/:id'
router.delete('/:id', function (req, res, next) {
	var orderId = req.params.id

	Order.findById(orderId)
		.then(function (theOrder) {
			return theOrder.destroy();
		})
		.then(function (updatedOrder) {
			res.sendStatus(204)
		})
})

// PUT => ORDER ID => 'orders/:id'
// router.put('/:id', function(req,res,next){
// 	var orderId = req.params.id

// 	Order.findById(orderId)
// 	.then(function(theOrder){
// 		theOrder = req.body
// 		console.log(theOrder);
// 		return theOrder.update()
// 	})
// 	.then(function(updatedOrder){
// 		res.send(updatedOrder)
// 	})
// })

router.put('/:id', function (req, res, next) {
	Order.update(req.body, { where: { id: req.params.id } })
		.then(function (updatedOrder) {
			console.log(updatedOrder);
			res.status(204).end();
		})
		.catch(next);
});
