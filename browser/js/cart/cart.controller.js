app.controller('CartCtrl', function($scope, CartFactory, cart){
    $scope.removeItemFromCart = CartFactory.removeItemFromCart;
    $scope.updateCart = CartFactory.updateCart;
    $scope.clearCart = CartFactory.clearCart;
    $scope.cart = cart.cart;
    $scope.products = cart.products;

    $scope.checkout = function(){
        var cart = $scope.cart;
        cart.isCart = false;
        CartFactory.updateCart(cart)
        .then(function(newCart){
            $scope.cart = newCart;
        }).catch(console.error.bind(console));
    }
})