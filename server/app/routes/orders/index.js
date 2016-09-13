var router = require('express').Router();
module.exports = router;
// var bodyParser = require('body-parser')

var Order = require('../../../db/models/order.js')

// GET => ORDER ID => 'orders/:id'
router.get('/orders/:id', function(req,res,next){
	var orderId = req.params.id

	Order.findAll({
		where: {
			id: orderId
		}
	})
	.then(function(theOrder){
		res.send(theOrder)
	})
	.catch(next)
})

// POST => ORDER ID => 'orders/:id'
router.post('/orders/:id', function(req,res,next){
	var orderId = req.params.id

	Order.create({
		price:req.body.price
	})
	.then(function(createdOrder){
		res.send(createdOrder)
	})
})

// DELETE => ORDER ID => 'orders/:id'
router.delete('/orders/:id', function(req,res,next){
	var bookId = req.params.id

	Order.find({
		where: {
			id: orderId
		}
	})
	.then(function(theOrder){
		theBook.destroy()
		return theBook.save()
	})
	.then(function(updatedOrder){
		res.sendStatus(204)
	})
})

// PUT => ORDER ID => 'orders/:id'
router.put('/orders/:id', function(req,res,next){
	var orderId = req.params.id

	Order.find({
		where: {
			id:orderId
		}
	})
	.then(function(theOrder){
		theOrder = req.body
		return theOrder.save()
	})
	.then(function(updatedOrder){
		res.send(updatedOrder)
	})
})
