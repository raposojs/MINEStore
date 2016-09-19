'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');


module.exports = db.define('OrderedProduct', {
	quantity:{
		type: Sequelize.INTEGER,
		defaultValue: 1
	},
	unitPrice: {
		type: Sequelize.FLOAT,
		validate: {
			min: 1
		}
	}
}, {
	instanceMethods: {
		setUnitPrice: function(price){
				this.unitPrice = price;
		},
		totalPrice: function(){
			return this.quantity * this.unitPrice;
		}
	},
	classMethods: {}
});