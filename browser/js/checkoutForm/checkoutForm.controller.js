app.controller('CheckoutCtrl', function ($scope, CartFactory, cart, $state) {
    $scope.value = cart.cart.price;

    $scope.cart = cart.cart;
    $scope.products = cart.products;
    $scope.quantities = cart.quantities;


    //IF ORDERED BY PRODUCT id
    cart.quantities.forEach(function (quantity, index) {
        $scope.products[index].quantity = quantity.quantity;
    })

    $scope.checkOut = function () {
        var shipping = JSON.stringify($scope.shipping);

        var email = {
            from: 'Mine_customerService@MINE.com',
            to: $scope.shipping.email,
            subject: 'confirmation-letter',
            text: 'your order has been checked-out.'
        };

        CartFactory.sendConfirmationEmail(email);

        CartFactory.checkOut(cart.products, shipping)
            .then(function (cart) {
                $state.go('confirmation');
                return cart;
            }).catch(console.error.bind(console));
    }

})