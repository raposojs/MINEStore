app.directive('cart', function (CartFactory) {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'js/cart/templates/cart.html',
        link: function (scope) {
            console.log('SCOPE VALUE', scope.value);
            scope.cart = scope.value.cart;
            scope.products = scope.value.products;
            scope.tax = 0.17; //WHERE WILL WE PUT THIS?
            scope.checkout = function () {
                var cart = scope.cart;
                cart.isCart = false;
                CartFactory.updateCart(cart)
                    .then(function (newCart) {
                        scope.cart = newCart;
                    }).catch(console.error.bind(console));
            }

            scope.deleteItemFromCart = function (productId, productPrice) {
                CartFactory.deleteItemFromCart(productId, productPrice)
                    .then(function (response) {
                        scope.products = scope.products.filter(function (product) {
                            return product.id !== productId;
                        });
                        scope.cart.price -= productPrice;
                    }).catch(console.error.bind(console));
            }

            scope.updateCart = function(){
                var cart = scope.cart;
                CartFactory.updateCart(cart)
                    .then(function(newCart){
                        scope.cart = newCart;
                    }).catch(console.error.bind(console));
            }


        }
    }
});