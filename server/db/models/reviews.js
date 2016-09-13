var Sequelize=require('sequelize')
var db=require("../_db.js");

var Reviews=db.define("reviews",{
	reviewContent: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate:{
		notEmpty: true
		}
	},
	stars: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate:{
			min: 0,
			max: 5
		}
	}
})

module.exports=Reviews;

Reviews.create({reviewContent: "rock sucks", stars: 0});