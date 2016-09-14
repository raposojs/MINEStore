app.factory("productFactory", function($http){
	var oneProduct={};
	oneProduct.fetchData=function(id){
		return $http.get("/api/products/"+id)
		.then(function(data){
			return data.data;
		})
		.catch(function(error){
			console.error(error);
		});
	}
	return oneProduct;

})