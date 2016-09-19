app.factory("CatalogFactory", function($http){
	return {
			getAll: function(){
			return $http.get('/api/products')
			.then(function(products){
				return products.data;
			})
		}
	}
})