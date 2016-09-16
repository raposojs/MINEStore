app.controller('CartCtrl', function($scope, CartFactory, cart){
    // console.log(cart);
    $scope.value = cart;
    console.log('==$scope.value== inside CartCtrl', $scope.value);
    // console.log($scope.cart);
    // console.log("PRODUCTS", $scope.products);


    // $scope.checkout = function(){
    //     var cart = $scope.cart;
    //     cart.isCart = false;
    //     CartFactory.updateCart(cart)
    //     .then(function(newCart){
    //         $scope.cart = newCart;
    //     }).catch(console.error.bind(console));
    // }
})