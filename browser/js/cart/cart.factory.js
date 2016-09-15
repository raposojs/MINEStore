app.factory('CartFactory', function ($http) {
    return {
        getCart: function () {
            return $http.get('/api/orders/')
                .then(function (cart) {
                    //cart is returned with price and products
                    if (!cart || !cart.data) return null;
                    return cart.data;
                }).catch(console.error.bind(console));
        },
        createCart: function (data) {
            return $http.post('/api/orders/', data)
                .then(function (cart) {
                    if (!cart) return null;
                    return cart;
                }).catch(console.error.bind(console));
        },
        addItemToCart: function (itemId, price) {
            //TODO: find cart and add item to products and update price accordingly
            return $http.post('/api/orders/add', {id: itemId, price: price})
                .then(function (cart) {
                    if (!cart) return null;
                    return cart;
                }).catch(console.error.bind(console));
        },
        deleteItemFromCart: function (itemId, price) {
            return $http.post('/api/orders/remove', {id: itemId, price: price})
                .then(function (success) {
                    if (!success) return null;
                    return success;
                }).catch(console.error.bind(console))
        },
        updateCart: function (cart) {
            //TODO: things like price and isCart
            return $http.put('/api/orders/', cart)
                .then(function (cart) {
                    //Returning updated cart
                    return cart;
                }).catch(console.error.bind(console));
        },
        clearCart: function () {
            //TODO: destroy cart
            return $http.delete('/api/orders/' + id)
                .then(function (success) {
                    if (success) return {};
                    throw new Error('Successfully deleted');
                }).catch(console.error.bind(console));
        }
    };
})