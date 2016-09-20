app.factory('AdminFactory', function($http){
    return {
        saveUser: function(user){
            return $http.put('/api/members/' + user.id, user)
            // JOE: This user variable is really a response object
            // with properties like headers, data, status.
                .then(function(user){
                    console.log(user);
                    return user;
                })
        },
        // JOE: This method takes an argument and calls it "userId"
        // but then uses "user.id" to access information.
        deleteUser: function(userId){
            // JOE: Consider using a template string like `/api/members/${user.id}`
            // https://www.christianheilmann.com/2015/08/28/es6-for-now-template-strings/
            return $http.delete('/api/members/' + user.id)
            // JOE: Ditto down here.
                .then(function(user){
                    return user;
                })
        }
    }
})