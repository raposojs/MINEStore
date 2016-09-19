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
            return $http.delete('/api/members/' + user.id)
                .then(function(user){
                    return user;
                })
        }
    }
})