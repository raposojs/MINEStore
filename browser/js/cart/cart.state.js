app.config(function($stateProvider){
    $stateProvider.state('cart', {
        url:'/cart',
        template: '<cart></cart>',
        controller: 'CartCtrl',
        resolve: {
            cart: function(CartFactory){
                console.log('Trying to Get Cart with ID 1');
                return CartFactory.getCart(1);
            }
        }
    });
});