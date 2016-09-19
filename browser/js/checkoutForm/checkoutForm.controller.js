app.controller('CheckoutCtrl', function ($scope, CartFactory, cart) {
    // console.log(CartFactory);
    console.log(cart)
    $scope.value = cart.cart.price;

    $scope.cart = cart.cart;
    $scope.products = cart.products;
    $scope.quantities = cart.quantities;

    console.log($scope);

    //IF ORDERED BY PRODUCT id
    cart.quantities.forEach(function (quantity, index) {
        $scope.products[index].quantity = quantity.quantity;
    })

    $scope.checkOut = function () {
        console.log($scope.shipping);
        var shipping = JSON.stringify($scope.shipping);
        CartFactory.checkOut(cart.products, shipping)
            .then(function (cart) {
                $state.go('confirmation');
                return cart;
            }).catch(console.error.bind(console));
    }

})