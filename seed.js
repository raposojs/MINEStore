/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Order = db.model('order');
var Review = db.model('review');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        },
        {
            email: 'tenloh@gmail.com',
            password: 'flack'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedProducts = function (userList) {

    var products = [
        {
            name: 'Pebble 1',
            category: 'Rock',
            pictureURL: '',
            price: 1.00,
            description: 'A small round stone found near Fullstack Academy',
            rarity: 1,
            location: 'Fullstack Academy',
            stocks: 200,
        },
        {
            name: 'Quartz 1',
            category: 'Mineral',
            pictureURL: '',
            price: 9.99,
            description: 'Quartz is the second most abundant mineral in Earth\'s continental crust, after feldspar',
            rarity: 5,
            location: 'Mike\'s Hard Rocks',
            stocks: 50,
        },
        {
            name: '101955 Bennu',
            category: 'Meteorite',
            pictureURL: '',
            price: 1999.99,
            description: '101955 Bennu is a carbonaceous asteroid in the Apollo group that was discovered by the LINEAR Project on September 11, 1999.',
            rarity: 10,
            location: 'Outer Space',
            stocks: 2,
        },
    ]

    var creatingProducts = products.map(function (productObj) {
        return Product.create(productObj);
    });

    return Promise.all(creatingProducts);
}

var seedOrders = function () {

    var orders = [
        {
            price: 20,
            isCart: true,
            sId: 'sdfaflwfavsadvdamffdsaf'
        },
        {
            price: 40,
            isCart: false,
        },
        {
            price: 10000,
            isCart: false
        }
    ];

    var creatingOrders = orders.map(function (orderObj) {
        return Order.create(orderObj);
    });

    return Promise.all(creatingOrders);

};

var seedReviews = function () {

    var reviews = [
        {
            reviewContent: 'Great Product',
            stars: 5
        },
        {
            reviewContent: 'Horrible Product',
            stars: 1,
        },
        {
            reviewContent: 'Meh was okay',
            stars: 3,
        }
    ];

    var creatingReviews = reviews.map(function (reviewObj) {
        return Review.create(reviewObj);
    });

    return Promise.all(creatingReviews);

};

var seed = function () {
    var users;
    var orders;
    var products;
    var reviews;
    return seedUsers()
        .then(function (createdUsers) {
            users = createdUsers;
            return seedProducts();
        })
        .then(function (createdProducts) {
            products = createdProducts;

            return seedOrders();
        })
        .then(function (createdOrders) {
            orders = createdOrders;
            return seedReviews();
        })
        .then(function (createdReviews) {
            reviews = createdReviews;
            var createdProducts = products.map(function (product, index) {
                return product.addReview(reviews[index]);
            })
            return Promise.all(createdProducts);
        })
        .then(function (r) {
            var userOrders = users.map(function (user, index) {
                return user.addOrder(orders[index]);
            });
            return Promise.all(userOrders);
        })
        .then(function (r) {
            var userReviews = users.map(function (user, index) {
                return user.addReview(reviews[index]);
            });
            return Promise.all(userReviews);
        })
        .then(function (r) {
            var orderProducts = orders.map(function (order, index) {
                return order.addProduct(products[index]);
            });
            orderProducts.push(orders[1].addProduct(products[2]));
            return Promise.all(orderProducts);
        });
}




db.sync({ force: true })
    .then(function () {
        return seed();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
