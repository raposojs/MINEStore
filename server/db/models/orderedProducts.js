'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');


module.exports = db.define('OrderedProduct', {
	productId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	orderId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
});
