var router = require('express').Router();
var Promise = require('bluebird');
module.exports = router;
// var bodyParser = require('body-parser')

var Order = require('../../../db/models/order.js')
var OrderedProduct = require('../../../db/models/orderedProducts.js');

// var cart = {};
// var products = [];

//GETS THE CURRENT CART FOR THE USER
router.use('/*', function (req, res, next) {
	req.user = {};
	req.user.id = 1;
	if (req.user) {
		Order.findOne({
			where: {
				userId: req.user.id,
				isCart: true
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
				sId: req.session.id,
				isCart: true
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
	req.cart.addProductToCart(req.body.product.id, req.body.product.price)
		.then(function(success){
			res.sendStatus(204);
		}).catch(next)
	// var product = req.products.search(function (item) {
	// 	return item.id === req.body.id;
	// })
	// if (product) {
	// 	//updating quantity
	// 	OrderedProduct.findOne({
	// 		where: {
	// 			orderId: req.cart.id
	// 		}
	// 	})
	// 	.then(function(orderedProduct){
	// 		orderedProduct.quantity++;
	// 		orderedProduct.save()
	// 		.then(function(success){
	// 			res.status(204).json(product);
	// 		})
	// 	})
	// } else {
	// 	//adding new row
	// 	req.cart.addProduct(req.body.id)
	// 		.then(function (newOrder) {
	// 			req.cart.price = req.cart.price + req.body.price
	// 			req.cart.save()
	// 				.then(function (updatedOrder) {
	// 					res.json(updatedOrder);
	// 				})
	// 		}).catch(next);
	// }
});

router.post('/remove', function (req, res, next) {
	//Request Body needs Product Id, Product Price, Quantity
	req.cart.removeProduct(req.body.product.id)
		.then(function (newOrder) {
			req.cart.price = req.cart.price - (req.body.product.price * req.body.order.quantity);
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

router.put('/checkout', function(req, res, next){
	console.log('BODY: ', req.body);
	req.cart.checkOut(req.body.products, req.body.quantities)
		.then(function(){
			console.log('successfully checked out');
			res.sendStatus(204);
		})
		.catch(next);
});




router.put('/', function (req, res, next) {

	req.cart.updateCart(req.body.products, req.body.quantities)
	.then(function(updatedOrder){
		res.sendStatus(204)
	}).catch(next)
	// Order.update(req.body, { where: { id: req.cart.id } })
	// 	.then(function (updatedOrder) {
	// 		console.log(updatedOrder);
	// 		res.status(204).end();
	// 	})
	// 	.catch(next);
});




