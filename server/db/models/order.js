'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');
var OrderedProducts = require('./orderedProducts.js');
var Product = require('./product.js');
var Promise = require('bluebird');

module.exports = db.define('order', {
	price: {
		allowNull: false,
		type: Sequelize.DECIMAL,
		set: function(value){
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
				this.price = 999;
				var self = this;
				self.price = 50;
				return OrderedProducts.findOrCreate({
					where: {
					productId: productId,
					orderId: this.id
					}
				})
					.then(function (instanceCreated) {
						var instance = instanceCreated[0]; //Instance
						var created = instanceCreated[1]; // True or false
						var price = +self.price + +productPrice;
						console.log('price', price);
						self.price = price;
						console.log('self', self);
						if (!created) { //Update Quantity if it Found
							instance.quantity++;
							instance.save()
								.then(function (response) {
									self.price = 100;
									return;
								}).catch(function (err) {
									console.error(err);
								})
						}
					})
			},
			updateCart: function (products, quantities) {
				var self = this;
				var promiseUpdateProducts = products.map(function (product, index) {
					return OrderedProducts.update({
						quantity: quantities[index]
					}, {
						where: {
							productId: product.id,
							orderId: self.id
						}
					});
				});
				return Promise.all(promiseUpdateProducts)
					.then(function (productArray) {
						var price = 0;
						productArray.forEach(function (productInOrder, index) {
							price += products[index].price * productInOrder.quantity;
						})
						self.price = price;	
					}).catch(function(err){
						console.error(err)
					});
			},
			checkOut: function (products, quantity) {
				var self = this;
				this.isCart = false;
				var cannotProcess = false;
				var promisedReducedStock = products.map(function(product, index){
					if(quantity[index] > product.stocks){
						cannotProcess = true;
					}
					return product.reduceStock(quantity[index]) //INSTANCE METHOD TODO
				})
				if(cannotProcess) return;
				Promise.all(promisedReducedStock)
				.then(function(success){
					console.log('Successfully Reduced Stock and Checked Out');
					return;
				}).catch(console.error(err));
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
		}
	})