app.factory('people', ['$http', function people($http){
    return $http.get('http:////tonyq.org/kptaipei/api-20150628.php')
        .success(function(data){
            return data;
        })
        .error(function(err){
            return err;
        });
}]);