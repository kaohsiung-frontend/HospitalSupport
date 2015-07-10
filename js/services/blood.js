
// get 捐血車/站 data
app.factory('blood', ['$http', function blood($http){
    return $http.get('json/blood.json')
        .success(function(data) {
            return data;
        })
        .error(function(err){
            return err;
        });
}]);

// get 血庫存量 data 
app.factory('bloodStatus', ['$http', function bloodStatus($http){
    return $http.get('http://g0v.github.io/blood/blood.json')
        .success(function(data) {
            return data;
        })
        .error(function(err){
            return err;
        });
}]);