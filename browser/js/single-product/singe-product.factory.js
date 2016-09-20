app.factory('SingleProductFactory', function ($http) {
    return {
        createReview: function (productId, reviewObj) {
            return $http.post('/api/reviews/products/' + productId, reviewObj)
                .then(function (createdReview) {
                    return createdReview;
                })
        },
        getReviews: function (productId) {
            return $http.get('/api/reviews/products/' + productId)
                .then(function (reviews) {
                    return reviews;
                })
        },
        editReview: function (productId, reviewObj) {
            return $http.put('/api/reviews/' + reviewObj.id, reviewObj)
                .then(function (editedReview) {
                    return editedReview;
                })
        },
        deleteReview: function (reviewId) {
            return $http.delete('/api/reviews/' + review.id)
        },
        createProduct: function (productObj) {
            return $http.post('/api/products/add', productObj)
                .then(function (createdProduct) {
                    return createdProduct
                })
        },
        updateProduct: function (productObj) {
            return $http.put('/api/products/' + productObj.id, productObj)
                .then(function (editedProduct) {
                    return editedProduct
                })
        },
        deleteProduct: function (productId) {
            return $http.delete('/api/products/' + productId)
        },
        getProduct: function (productId) {
            return $http.get('/api/products/' + productId)
                .then(function (created) {
                    return created.data;
                });
        }


    }
})
