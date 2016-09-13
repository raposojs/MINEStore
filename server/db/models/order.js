'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
		// timestamp: true,
	price: {
		allowNull: false,
		type: Sequelize.DECIMAL
	},
	isCart: Sequelize.BOOLEAN,
	sId: Sequelize.STRING
})