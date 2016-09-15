app.config(function($stateProvider){
    $stateProvider.state('cart', {
        url:'/cart',
        template: '<cart value="value"></cart>',
        //templateUrl: 'js/cart/templates/cart.html',
        controller: 'CartCtrl',
        resolve: {
            cart: function(CartFactory){
                return CartFactory.getUserCart();
            }
        }
    });
});