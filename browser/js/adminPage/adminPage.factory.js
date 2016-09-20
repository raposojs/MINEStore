app.factory('AdminFactory', function($http){
    return {
        saveUser: function(user){
            return $http.put('/api/members/' + user.id, user)
                .then(function(user){
                    console.log(user);
                    return user;
                })
        },
        deleteUser: function(userId){
            return $http.delete('/api/members/' + userId)
                .then(function(user){
                    return user;
                })
        },
        editProduct: function(id, updates){
            return $http.put('/api/products/'+ id, updates)
            .then(function(product){
                console.log("Successful edit!");
                if (product){
                    return product;
                }
            });
        },
        setOrderStatus: function(id, status){
            return $http.put('/api/orders/setStatus?id=' + id + '&status=' + status)
                .then(function(order){
                    console.log('successfully set status');
                })
        }
    }
})