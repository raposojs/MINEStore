app.controller('CartCtrl', function($scope, CartFactory){
    $scope.getCart = CartFactory.getCart;
    $scope.createCart = CartFactory.createCart;
    $scope.addItemToCart = CartFactory.addItemToCart;
    $scope.setCartToOrder = CartFactory.setCartToOrder;
    $scope.clearCart = CartFactory.clearCart;
})