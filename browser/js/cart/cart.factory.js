app.factory('CartFactory', function ($http) {
    return {
        getCart: function (id) {
            return $http.get('/api/orders/' + id)
                .then(function (cart) {
                    //cart is returned with price and products
                    if (!cart || !cart.data) return null;
                    return cart.data;
                }).catch(console.error.bind(console));
        },
        createCart: function (id, data) {
            return $http.post('/', data)
                .then(function (cart) {
                    if (!cart) return null;
                    return cart;
                }).catch(console.error.bind(console));
        },
        addItemToCart: function (id, item) {
            //TODO: find cart and add item to products and update price accordingly
            return $http.post('/' + id + '/add', item)
                .then(function (cart) {
                    if (!cart) return null;
                    return cart;
                }).catch(console.error.bind(console));
        },
        deleteItemFromCart: function (id, item) {
            return $http.post('/' + id + '/remove', item)
                .then(function (success) {
                    if (!cart) return null;
                    return cart;
                }).catch(console.error.bind(console))
        },
        updateCart: function (cart) {
            //TODO: things like price and isCart
            return $http.put('/' + cart.id, cart)
                .then(function (cart) {
                    //Returning updated cart
                    return cart;
                }).catch(console.error.bind(console));
        },
        clearCart: function (id) {
            //TODO: destroy cart
            return $http.delete('/' + id)
                .then(function (success) {
                    if (success) return {};
                    throw new Error('Successfully deleted');
                }).catch(console.error.bind(console));
        }
    };
})