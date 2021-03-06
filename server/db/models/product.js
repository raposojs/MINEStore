'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');


module.exports = db.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	category: {
		type: Sequelize.ENUM(['Rock', 'Mineral', 'Meteorite', 'Fossil', 'etc']),
		allowNull: false
	},
	pictureURL: {
		type: Sequelize.STRING
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false,
		validate: {
			min: 1.00
		}
	},
	description: {
		type: Sequelize.TEXT
	},
	rarity: {
		type: Sequelize.FLOAT
	},
	location: {
		type: Sequelize.STRING
	},
	stocks: {
		type: Sequelize.INTEGER
	}
}, {
	getterMethods: {
		snippet: function(){
			return this.description.slice(0, 50) + '...';
		},
		displayPrice: function(){
			var priceString = this.price.toString();
			return '$' + priceString;
		}
	},
	instanceMethods:{
		reduceStock: function(num){
			console.log('NUM', +num);
			//if num > this.stocks -- short circuit
			if(+num > this.stocks) return;
			this.stocks -= +num;
			this.save()
			.then(function(success){
				console.log('success');
			}).catch(function(err){
				console.log(err);
			})
		}
	}
});
