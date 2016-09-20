var router = require('express').Router();
var Promise = require('bluebird');
var utilities = require("../authUtility.js");
module.exports = router;


var Order = require('../../../db/models/order.js')
var Product = require('../../../db/models/product.js')
var OrderedProduct = require('../../../db/models/orderedProducts.js');



//GET ALL PREVIOUS orders
router.get('/pastOrders', function (req, res, next) {
	//This route assumes that only logged in users have orders

	// //Testing
	// req.user = {};
	// req.user.id = 4

	Order.getPastOrders(req.user.id)
		.then(function (pastOrders) {
			res.json(pastOrders);
		}).catch(next);
})



//Admin route -> fetching all shipped orders
router.get('/all', utilities.isAdministrator, function (req, res, next) {
	Order.findAll({
		where: {
			isCart: false
		},
		order: 'id DESC'
	})
		.then(function (orders) {
			res.send(orders);
		})
		.catch(next);
})



router.get('/:orderId', function (req, res, next) {
	Order.findById(req.params.orderId, {
		include: [{ model: Product }]
	})
		.then(function (order) {
			res.json(order);
		}).catch(next);
})

router.put('/setStatus/', function (req, res, next) {
	var id = req.query.id;
	var status = req.query.status;
	Order.findById(+id)
		.then(function (order) {
			order.status = req.query.status;
			order.save()
				.then(function (success) {
					res.sendStatus(204);
				})
		}).catch(next);
})






//GETS THE CURRENT CART FOR THE USER
router.use('/*', function (req, res, next) {
	// req.user = {};
	// req.user.id = 1;
	if (req.user) {
		Order.findOrCreate({
			where: {
				userId: req.user.id,
				isCart: true
			}
		})
			.spread(function (order, created) {
				if (created) {
					req.cart = order;
					next();
				}
				order.getProducts()
					.then(function (productsArray) {
						req.cart = order;
						req.products = productsArray;
						next();
					}).catch(next);
			}).catch(next);
	} else {
		Order.findOrCreate({
			where: {
				sId: req.session.id,
				isCart: true
			}
		})
			.spread(function (order, created) {
				if (created) {
					req.cart = order;
					next();
				}
				order.getProducts()
					.then(function (productsArray) {
						req.cart = order;
						req.products = productsArray;
						next();
					}).catch(next);
			}).catch(next);
	}
})


router.use('/*', function (req, res, next) {
	OrderedProduct.findAll({
		where: {
			orderId: req.cart.id,
		}
	})
		.then(function (resArray) {
			// resArray.forEach(function(quantity, index){
			// 	req.products[index].quantity = 5;
			// }); 
			//WHY DOESN'T THIS WORK?
			req.quantities = resArray;
			next();
		}).catch(next);
})





// GET => ORDER ID => 'orders/:id'
router.get('/', function (req, res, next) {
	res.json({ cart: req.cart, products: req.products, quantities: req.quantities });
});




// POST => ORDER ID => 'orders/:id'
router.post('/', function (req, res, next) {
	Order.create({
		price: 0,
		isCart: true,
		sId: req.session.id,
		userId: req.user.id
	})
		.then(function (createdOrder) {
			res.send(createdOrder)
		})
})

router.post('/add', function (req, res, next) {
	req.cart.addProductToCart(req.body.product.id, req.body.product.price)
		.then(function (success) {
			res.end();
		}).catch(next)
});

router.post('/remove', function (req, res, next) {
	//Request Body needs Product Id, Product Price, Quantity
	console.log(req.cart.price + "///" + req.body.product.price + "///" + req.body.product.quantity);
	req.cart.removeProduct(req.body.product.id)
		.then(function (newOrder) {
			req.cart.price = req.cart.price - (req.body.product.price * req.body.product.quantity);
			req.cart.save()
				.then(function (updatedOrder) {
					res.json(updatedOrder);
				})
		}).catch(next);
})

// DELETE => ORDER ID => 'orders/:id'
//WHEN WOULD WE USE THIS?
router.delete('/', function (req, res, next) {
	res.end(); //Until we can come up with a good use case for it.
	req.cart.destroy()
		.then(function (updatedOrder) {
			res.sendStatus(204)
		})
})

router.put('/checkout', function (req, res, next) {
	req.cart.checkOut(req.body.products, req.body.shipping)
		.then(function () {
			console.log('successfully checked out');
			res.sendStatus(204);
		})
		.catch(next);
});




router.put('/', function (req, res, next) {

	req.cart.updateCart(req.body.products, req.body.quantities)
		.then(function (updatedOrder) {
			res.sendStatus(204)
		}).catch(next)
});




