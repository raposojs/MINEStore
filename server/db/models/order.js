'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');
var OrderedProducts = require('./orderedProducts.js');
var Product = require('./product.js');
var Promise = require('bluebird');

module.exports = db.define('order', {
	price: {
		type: Sequelize.DECIMAL,
		defaultValue: 0,
		set: function (value) {
			this.setDataValue('price', value);
		}
	},
	isCart: Sequelize.BOOLEAN,
	sId: Sequelize.STRING,
	address: Sequelize.STRING,
	status: Sequelize.STRING
}, {
		instanceMethods: {
			addProductToCart: function (productId, productPrice) {
				return OrderedProducts.findOrCreate({
					where: {
						orderId: this.id,
						productId: product.id
					}
				})
					.spread(function(instance, created){
						if(created){instance.setUnitPrice(product.price);	};
						instance.quantity ++;
						instance.save();
					});
			},
			removeProductFromCart: function(productId){
				return OrderedProducts.findOne({
					where: {
						orderId: this.id,
						productId: productId
					}
				})
				.then(function(product){
					product.destroy();
				});
			},
			updateCart: function (products) {
				var self = this;
				self.price = 0;
				var promiseUpdateProducts = products.map(function (product, index) {
					self.price += +product.price * product.quantity
					return OrderedProducts.update({
						quantity: product.quantity
					}, {
							where: {
								productId: product.id,
								orderId: self.id
							}
						});
				});
				promiseUpdateProducts.push(self.save());
				return Promise.all(promiseUpdateProducts)
					.then(function (productArray) {
						console.log(productArray);
						return productArray;
					}).catch(function (err) {
						console.error(err)
					});
			},
			checkOut: function (cart) {
				// 1. order => fetch an order/isCart = true;
				// 2. order-product items => items.qty => reduce stocks in product table
				var order = this;

				return OrderedProducts.findAll({
					where: {
						orderId: cart.id
					},
					include: [{model: Product}]
				})
					.then(function(itemsInCheckOut){
						//fetched items in check-out
						//each item's quantity should be deducted on the product.quantity
						var reducingStocksPromise = itemsInCheckOut.map(function(orderedProduct){
							return orderedProduct.product.reduceStock(orderedProduct.quantity)
						})

						return Promise.all(reducingStocksPromise)
					})
					.then(function(){
						order.isCart = false;
					})
				}
		},
		classMethods: {
			getPastOrders: function () {
				//Find all orders for a user in which it is not a cart
				return this.findAll({
					where: {
						userId: this.userId,
						isCart: false
					}
				})
					.then(function (pastOrders) {
						if (!pastOrders) return null
						return pastOrders;
					}).catch(console.error(err));
			}
		},
		// hooks: {
		// 	beforeValidate: function(instance){
		// 		this.findOne({
		// 			where: {
		// 				userId: instance.attributes.userId,
		// 				isCart: true
		// 			}
		// 		})
		// 		.then(function(result){
		// 			if(result) {
		// 				return sequelize.Promise.reject('Cart Exists');
		// 			}
		// 		})
		// 	}
		// }
	})