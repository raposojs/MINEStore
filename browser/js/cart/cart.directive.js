app.directive('cart', function (CartFactory, $state) {
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
            scope.quantities = scope.value.quantities;

            //IF ORDERED BY PRODUCT id
            scope.value.quantities.forEach(function(quantity, index){
                scope.products[index].quantity = quantity.quantity;
            })

            scope.tax = 0.17; //WHERE WILL WE PUT THIS?
            scope.checkOut = function () {
                //Assume products, quantities are on scope (can be through ng-model)
                var products = scope.products;
                CartFactory.checkOut(scope.products)
                .then(function(cart){
                    console.log('The Updated Cart is: \n', cart);
                    $state.go('home');
                    return cart;
                }).catch(console.error.bind(console));
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