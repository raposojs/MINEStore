app.config(function($stateProvider){
	$stateProvider.state("oneProduct", {
		url: "/products/:id",
		templateUrl: "/js/single_product/template/single_product.html",
		controller: "singleProductCtrl",
		resolve: {
			theProduct: function(productFactory, $stateParams){
				return productFactory.fetchData($stateParams.id)
			}
		}
	})
})