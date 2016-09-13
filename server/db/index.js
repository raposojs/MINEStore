'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Product = require('./models/product');
var Order = require('./models/order');
var Review = require('./models/reviews');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
Product.belongsToMany(Order, {through: 'OrderedProduct'});
Order.belongsToMany(Product, {through: 'OrderedProduct'});
Review.belongsTo(Product);
Review.belongsTo(User);
Order.belongsTo(User);
Product.hasMany(Review);
User.hasMany(Order);
User.hasMany(Review);

