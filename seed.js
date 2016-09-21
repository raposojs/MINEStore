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
// var Order = db.model('order');
var Review = db.model('review');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            username: 'Bruno',
            email: 'bruno@bruno.com',
            password: 'mineit',
            isAdmin: true
        },
        {
            username: 'Ten',
            email: 'ten@ten.com',
            password: 'mineit',
            isAdmin: true
        },
        {
            username: 'Nate',
            email: 'nate@nate.com',
            password: 'mineit',
            isAdmin: true
        },
        {
            username: 'Han',
            email: 'han@han.com',
            password: 'mineit',
            isAdmin: true
        },
        {   
            username: 'President Obama',
            email: 'obama@gmail.com',
            password: 'potus',
            isAdmin: true
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
            price: 10.00,
            description: 'Quartz is the second most abundant mineral in Earth\'s continental crust, after feldspar',
            rarity: 3,
            location: 'Mike\'s Hard Rocks',
            stocks: 50,
        },
        {
            name: '101955 Bennu',
            category: 'Meteorite',
            pictureURL: 'http://3.bp.blogspot.com/-4vTApLrr-50/VIS_DKIghSI/AAAAAAAAAG4/Rq8oGW68Xrg/s1600/479602main_eros_946-710.jpg',
            price: 2000.00,
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
            price: 200.00,
            description: 'Tectosilicates, also known as framework silicates, have the highest degree of polymerization. With all corners of a tetrahedra shared, the silicon:oxygen ratio becomes 1:2. Examples are quartz, the feldspars, feldspathoids, and the zeolites. Framework silicates tend to be particularly chemically stable as a result of strong covalent bonds. Forming 12% of the Earth\'s crust, quartz (SiO2) is the most abundant mineral species. It is characterized by its high chemical and physical resistivity. Quartz has several polymorphs, including tridymite and cristobalite at high temperatures, high-pressure coesite, and ultra-high pressure stishovite. The latter mineral can only be formed on Earth by meteorite impacts, and its structure has been composed so much that it had changed from a silicate structure to that of rutile (TiO2). The silica polymorph that is most stable at the Earth\'s surface is α-quartz. Its counterpart, β-quartz, is present only at high temperatures and pressures (changes to α-quartz below 573 °C at 1 bar). These two polymorphs differ by a "kinking" of bonds; this change in structure gives β-quartz greater symmetry than α-quartz, and they are thus also called high quartz (β) and low quartz (α).',
            rarity: 9,
            location: 'very rare place',
            stocks: 2,
        },
        {
            name: 'Amazonite and Smoky Quartz' ,
            category: 'Mineral' ,
            pictureURL: 'http://www.coloradogem.com/image/cache/data/3232_big-700x700.jpg',
            price: 50.00,
            description: 'Very perfect miniature with the classic combination of smoky quartz with amazonite.',
            rarity: 3,
            location: 'Lake George, Colorado',
            stocks: 8,
        },
        {
            name: 'Aquamarine' ,
            category: 'Mineral' ,
            pictureURL: 'http://www.coloradogem.com/image/cache/data/7924-228x228.jpg',
            price: 3000.00,
            description: 'Flawless, brilliant light blue Aquamarines with Orthoclase Feldspar, a very fine group and excellent example of gem crystals found in pegmatites.  This is from 15,000 feet above sea level in the Hindu Kush range of the Himalayas.  Many display angles.  Museum quality.  From the collection of Gene Meiran.',
            rarity: 8,
            location: 'Dasso, Northern Territories, Pakistan',
            stocks: 2,
        },
        {
            name: 'Beryl, var. Aquamarine on Quartz' ,
            category: 'Mineral' ,
            pictureURL: 'http://www.coloradogem.com/image/cache/data/5430_big-228x228.jpg',
            price: 3500.00,
            description: 'Doubly terminated Aquamarine passing through elongated quartz crystal, so far the best matrix specimen from this new find of Aquamarines in Vietnam.',
            rarity: 9,
            location: 'Thuong Xuan District Thanh Hoa Province, Vietnam',
            stocks: 2,
        },
        {
            name: 'Tourmaline, var. Elbaite' ,
            category: 'Mineral' ,
            pictureURL: 'http://www.coloradogem.com/image/cache/data/6356-228x228.jpg',
            price: 3000.00,
            description: 'Group of bicolor Tourmalines from premier locality in Afghanistan. Collection of Gene Meieran.',
            rarity: 9,
            location: 'Kunar, Nuristan Prov., Afghanistan',
            stocks: 3,
        },
        {
            name: 'Tourmaline' ,
            category: 'Mineral' ,
            pictureURL: 'http://www.coloradogem.com/image/cache/data/3333-228x228.jpg',
            price: 500.00,
            description: 'Watermelon Tourmaline slice, unusual color zoning, 77.50 carats',
            rarity: 7,
            location: 'Minas Gerais, Brazil',
            stocks: 1,
        },
        {
            name: 'Turquoise after Apatite Pseudomorph' ,
            category: 'Mineral' ,
            pictureURL: 'http://www.coloradogem.com/image/cache/data/4381_big-228x228.jpg',
            price: 350.00,
            description: 'Very sharp modified crystal habit of previous apatite replaced by solid blue turquoise. Very rare. As noted in the Mineralogical Record, May-June 2007',
            rarity: 6,
            location: 'Nacozari, Sonora, Mexico',
            stocks: 7,
        },
        {
            name: 'CAMPO DEL CIELO "The Old Man in the Moon"' ,
            category: 'Meteorite' ,
            pictureURL: 'http://www.aerolite.org/sale-pics/campos/campo-hole-622-2/campo-hole-622-2-cp.jpg',
            price: 1100.00,
            description: 'An excellent complete individual with a large and very rare natural hole. "The Old Man in the Moon" stands up as shown, and we see the profile of an old man with a shock of hair and prominent nose, staring off into the distance (or at the moon). An exceptional display piece and one of our very few irons with a good-sized hole.',
            rarity: 8,
            location: 'Formosa, Argentina',
            stocks: 1,
        },
        {
            name: 'CAMPO DEL CIELO "The Old Man in the Moon"' ,
            category: 'Meteorite' ,
            pictureURL: 'http://www.aerolite.org/sale-pics/campos/campo-hole-622-2/campo-hole-622-2-cp.jpg',
            price: 1100.00,
            description: 'An excellent complete individual with a large and very rare natural hole. "The Old Man in the Moon" stands up as shown, and we see the profile of an old man with a shock of hair and prominent nose, staring off into the distance (or at the moon). An exceptional display piece and one of our very few irons with a good-sized hole.',
            rarity: 8,
            location: 'Formosa, Argentina',
            stocks: 1,
        },
    ]

    var creatingProducts = products.map(function (productObj) {
        return Product.create(productObj);
    });

    return Promise.all(creatingProducts);
}

// var seedOrders = function () {

//     var orders = [
//         {
//             price: 20,
//             isCart: true,
//             sId: 'sdfaflwfavsadvdamffdsaf'
//         },
//         {
//             price: 40,
//             isCart: true,
//             sId: 'sdfaflwfavsadvdamffdsah'
//         },
//         {
//             price: 108,
//             isCart: false,
//             sId: 'sdfaflwfavsadvdamffdsag'
//         },
//         {
//             price: 30,
//             isCart: false,
//             sId: 'sasfflwfavsadvdamffdsag'
//         },
//         {
//             price: 77,
//             isCart: false,
//             sId: 'sdfaflwfavsaehyamffdsag'
//         },
//         {
//             price: 100,
//             isCart: true,
//             sId: 'sdfaflwfavsaHanamffdsag'
//         }
//     ];

//     var creatingOrders = orders.map(function (orderObj) {
//         return Order.create(orderObj);
//     });

//     return Promise.all(creatingOrders);

// };

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
    // var orders;
    var products;
    var reviews;

    return seedUsers()
        .then(function (createdUsers) {
            users = createdUsers;
            return seedProducts();
        })
        // .then(function (createdProducts) {
        //     products = createdProducts;
        //     return seedOrders();
        // })
        // .then(function (createdOrders) {
        //     orders = createdOrders;
        //     return seedReviews();
        // })
        .then(function (createdReviews) {
            reviews = createdReviews;

            var createdProducts = products.map(function (product, index) {
                return product.addReview(reviews[index]);
            })
            return Promise.all(createdProducts);
        })


        // .then(function (r) {
        //     var userOrders = users.map(function (user, index) {
        //         return user.addOrder(orders[index]);
        //     });
        //     return Promise.all(userOrders);
        // })
        .then(function (r) {
            var userReviews = users.map(function (user, index) {
                return user.addReview(reviews[index]);
            });
            return Promise.all(userReviews);
        })
        // .then(function (r) {
        //     var orderProducts = orders.map(function (order, index) {
        //         return order.addProduct(products[index]);
        //     });
        //     orderProducts.push(orders[1].addProduct(products[2]));
        //     orderProducts.push(orders[1].addProduct(products[4]));
        //     orderProducts.push(orders[3].addProduct(products[5]));
        //     return Promise.all(orderProducts);
        // });
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
