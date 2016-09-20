app.factory("CatalogFactory", function($http){
	return {
			// JOE: This method definition is all indented
			// at the same level.
			getAll: function(){
			return $http.get('/api/products')
			// JOE: Better variable name for products would be
			// `response`, products should be `response.data`.
			.then(function(products){
				return products.data;
			})
		}
	}
})