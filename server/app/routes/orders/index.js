var router = require('express').Router();
var Promise = require('bluebird');
module.exports = router;

var Order = require('../../../db/models/order.js')
var OrderedProduct = require('../../../db/models/orderedProducts.js');

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

// router.get('/all', function(req, res ,next){
// 	res.json({allCart: cart, allProducts: products});
// })
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
	req.cart.addProductToCart(req.body.product.id, req.body.product)
		.then(function (success) {
			res.end();
		}).catch(next)
});

router.post('/remove', function (req, res, next) {
	//Request Body needs Product Id, Product Price, Quantity
	req.cart.removeProductFromCart(req.body.product.id)
		.then(function(){
			console.log('removed successfully');
		})
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
	req.cart.checkOut(req.body.cart)
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




