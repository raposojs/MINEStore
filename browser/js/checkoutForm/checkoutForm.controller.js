app.controller('CheckoutCtrl', function($scope, CartFactory, cart){
    // console.log(CartFactory);
    console.log(cart)
    $scope.value = cart.cart.price;

})