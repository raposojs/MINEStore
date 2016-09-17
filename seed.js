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
        },
        {
            email: 'han@gmail.com',
            password: 'hoorah',
            address: 'GrandCentral, NY'
        },
        {
            email: 'angularAwesome@fsa.com',
            password: 'react',
            address: 'FB street, Google ave, NY'
        },
        {
            email: 'a@b.com',
            password: '.then',
            address: 'Bird st, Blue City'
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
            pictureURL: 'http://www.falklandislands.com/images/shopimages/imagelibrary/Art%20and%20Craft/Pebbles%202_AW_C.jpg',
            price: 1.00,
            description: 'A small round stone found near Fullstack Academy',
            rarity: 2,
            location: 'Fullstack Academy',
            stocks: 200,
        },
        {
            name: 'Quartz',
            category: 'Mineral',
            pictureURL: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Quartz,_Tibet.jpg',
            price: 9.99,
            description: 'Quartz is the second most abundant mineral in Earth\'s continental crust, after feldspar',
            rarity: 3,
            location: 'Mike\'s Hard Rocks',
            stocks: 50,
        },
        {
            name: '101955 Bennu',
            category: 'Meteorite',
            pictureURL: 'http://3.bp.blogspot.com/-4vTApLrr-50/VIS_DKIghSI/AAAAAAAAAG4/Rq8oGW68Xrg/s1600/479602main_eros_946-710.jpg',
            price: 1999.99,
            description: '101955 Bennu is a carbonaceous asteroid in the Apollo group that was discovered by the LINEAR Project on September 11, 1999.',
            rarity: 10,
            location: 'Outer Space',
            stocks: 2,
        },
        {
            name: 'Silicates',
            category: 'Mineral',
            pictureURL: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Natroliteinde1.jpg',
            price: 225.00,
            description: 'The base of unit of a silicate mineral is the [SiO4] tetrahedron. In the vast majority of cases, silicon is in four-fold or tetrahedral coordination with oxygen. In very high-pressure situations, silicon will be six-fold or octahedral coordination, such as in the perovskite structure or the quartz polymorph stishovite (SiO2). In the latter case, the mineral no longer has a silicate structure, but that of rutile (TiO2), and its associated group, which are simple oxides. These silica tetrahedra are then polymerized to some degree to create various structures, such as one-dimensional chains, two-dimensional sheets, and three-dimensional frameworks. The basic silicate mineral where no polymerization of the tetrahedra has occurred requires other elements to balance out the base 4- charge. In other silicate structures, different combinations of elements are required to balance out the resultant negative charge. It is common for the Si4+ to be substituted by Al3+ because of similarity in ionic radius and charge; in those case, the [AlO4] tetrahedra form the same structures as do the unsubstituted tetrahedra, but their charge-balancing requirements are different.',
            rarity: 4,
            location: 'Somewhere',
            stocks: 4,
        },
        {
            name: 'Tectosilicates',
            category: 'Mineral',
            pictureURL: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Muscovite-Albite-122886.jpg',
            price: 199.99,
            description: 'Tectosilicates, also known as framework silicates, have the highest degree of polymerization. With all corners of a tetrahedra shared, the silicon:oxygen ratio becomes 1:2. Examples are quartz, the feldspars, feldspathoids, and the zeolites. Framework silicates tend to be particularly chemically stable as a result of strong covalent bonds. Forming 12% of the Earth\'s crust, quartz (SiO2) is the most abundant mineral species. It is characterized by its high chemical and physical resistivity. Quartz has several polymorphs, including tridymite and cristobalite at high temperatures, high-pressure coesite, and ultra-high pressure stishovite. The latter mineral can only be formed on Earth by meteorite impacts, and its structure has been composed so much that it had changed from a silicate structure to that of rutile (TiO2). The silica polymorph that is most stable at the Earth\'s surface is α-quartz. Its counterpart, β-quartz, is present only at high temperatures and pressures (changes to α-quartz below 573 °C at 1 bar). These two polymorphs differ by a "kinking" of bonds; this change in structure gives β-quartz greater symmetry than α-quartz, and they are thus also called high quartz (β) and low quartz (α).',
            rarity: 9,
            location: 'very rare place',
            stocks: 2,
        },
        {
            name: '101955 Bennu',
            category: 'Meteorite',
            pictureURL: 'https://en.wikipedia.org/wiki/Meteorite#/media/File:NWA869Meteorite.jpg',
            price: 1999.99,
            description: 'In 1986–87, a German team installing a network of seismic stations while prospecting for oil discovered about 65 meteorites on a flat, desert plain about 100 kilometres (62 mi) southeast of Dirj (Daraj), Libya. A few years later, a desert enthusiast saw photographs of meteorites being recovered by scientists in Antarctica, and thought that he had seen similar occurrences in northern Africa. In 1989, he recovered about 100 meteorites from several distinct locations in Libya and Algeria. Over the next several years, he and others who followed found at least 400 more meteorites. The find locations were generally in regions known as regs or hamadas: flat, featureless areas covered only by small pebbles and minor amounts of sand. Dark-colored meteorites can be easily spotted in these places. In the case of several meteorite fields, such as Dar el Gani, Dhofar, and others, favorable light-colored geology consisting of basic rocks (clays, dolomites, and limestones) makes meteorites particularly easy to identify.',
            rarity: 10,
            location: 'The Sahara',
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
            isCart: true,
            sId: 'sdfaflwfavsadvdamffdsah'
        },
        {
            price: 108,
            isCart: false,
            sId: 'sdfaflwfavsadvdamffdsag'
        },
        {
            price: 30,
            isCart: false,
            sId: 'sasfflwfavsadvdamffdsag'
        },
        {
            price: 77,
            isCart: false,
            sId: 'sdfaflwfavsaehyamffdsag'
        },
        {
            price: 100,
            isCart: true,
            sId: 'sdfaflwfavsaHanamffdsag'
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
        },
        {
            reviewContent: 'Mediocre item to have',
            stars: 4,
        },
        {
            reviewContent: 'I will never buy this again EVER',
            stars: 1,
        },
        {
            reviewContent: 'THE STUFF',
            stars: 5,
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
            orderProducts.push(orders[1].addProduct(products[4]));
            orderProducts.push(orders[3].addProduct(products[5]));
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
