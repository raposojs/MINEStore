app.controller('CartCtrl', function($scope, CartFactory, cart){
    // console.log(cart);
    $scope.value = cart;
    console.log('==$scope.value== inside CartCtrl', $scope.value);

})