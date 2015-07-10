app.controller('MainController',['$scope', 'blood', 'people', 'bloodStatus',
 function ($scope, blood, people, bloodStatus) {
    $scope.type = 'blood';
   	
    blood
       	.success(function(data) {
          	$scope.bloodList = data;
        })
        .error(function (err) {
        	console.log('blood-error:' + err);
        });

    people
        .success(function(data){
            $scope.peopleList = data;

            $scope.sickRoomCount = 0;
            $scope.icuCount = 0;

            angular.forEach(data.data, function(obj) {
                switch(obj["即時動向"]){
                    case '一般病房':
                        $scope.sickRoomCount++;
                        break;
                    case '加護病房':
                        $scope.icuCount++;
                        break;
                }
            });
        })
        .error(function(err){
            console.log('people-error:' + err);
        });

    bloodStatus
        .success(function(data){
            $scope.bloodStatus = data;
        })
        .error(function(err){
            console.log('people-error:' + err);
        });

}]);