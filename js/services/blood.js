app.factory('blood', ['$http', function blood($http){
    return $http.get('json/blood.json')
        .success(function(data) {
            return data;
        })
        .error(function (err) {
            return err;
        });
}]);