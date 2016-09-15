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
            
            scope.checkout = function () {
                var cart = scope.cart;
                cart.isCart = false;
                CartFactory.updateCart(cart)
                    .then(function (newCart) {
                        scope.cart = newCart;
                    }).catch(console.error.bind(console));
            }
        }
    }
});