app.directive('cart', function (CartFactory, $state) {
    return {
        restrict: 'E',
        scope: {
            // JOE: `value` is a notoriously bad variable name.
            // Try to make it clear with your labeling what things
            // should be.
            value: '='
        },
        templateUrl: 'js/cart/templates/cart.html',
        link: function (scope) {
            scope.cart = scope.value.cart;
            scope.products = scope.value.products;
            scope.quantities = scope.value.quantities;

            //IF ORDERED BY PRODUCT id
            scope.value.quantities.forEach(function(quantity, index){
                scope.products[index].quantity = quantity.quantity;
            })

            // JOE: As you start to service more markets, you probably
            // want to AJAX to the backend to centralized what tax percentage
            // should be used.
            scope.tax = 0.17; //WHERE WILL WE PUT THIS?
            scope.checkOut = function () {
                //Assume products, quantities are on scope (can be through ng-model)
                var products = scope.products;
                $state.go('checkout', products);
            }

            scope.deleteItemFromCart = function (productId, productPrice, quantity) {
                CartFactory.deleteItemFromCart(productId, productPrice, quantity)
                    .then(function (response) {
                        scope.products = scope.products.filter(function (product) {
                            return product.id !== productId;
                        });
                        scope.cart.price -= productPrice;
                    }).catch(console.error.bind(console));
            }

            scope.updateCart = function(){
                CartFactory.updateCart(scope.products)
                    .then(function(newCart){
                        scope.cart = newCart;
                    }).catch(console.error.bind(console));
            }


        }
    }
});