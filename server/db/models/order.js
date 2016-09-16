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
				var self = this;
				return OrderedProducts.findOrCreate({
					where: {
						productId: productId,
						orderId: this.id
					}
				})
					.then(function (instanceCreated) {
						var instance = instanceCreated[0]; //Instance
						var created = instanceCreated[1]; // True or false
						self.price = +self.price + +productPrice;
						var promiseArray = [self.save()];
						if (!created) { //Update Quantity if it Found
							instance.quantity++;
							promiseArray.push(instance.save());
						}
						Promise.all(promiseArray)
							.then(function (response) {
								return;
							}).catch(function (err) {
								console.error(err);
							})
					})
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
			checkOut: function (products) {
				var self = this;
				self.isCart = false;
				var cannotProcess = false;

				return this.getProducts()
					.then(function (products) {
						var promisedReducedStock = products.map(function (product, index) {
							if (product.quantity > product.stocks) {
								cannotProcess = true;
							}
							console.log('PRODUCT QUANTITY', +product.quantity);
							return product.reduceStock(+product.quantity) //INSTANCE METHOD TODO
						})
						if (cannotProcess) return;
						promisedReducedStock.push(self.save());
						Promise.all(promisedReducedStock)
							.then(function (success) {
								console.log('Successfully Reduced Stock and Checked Out');
								return;
							}).catch(function (err) {
								console.error(err)
							});
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
		}
	})