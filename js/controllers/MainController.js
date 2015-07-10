app.controller('MainController',['$scope', 'blood', 'people', 'bloodStatus',
 function ($scope, blood, people, bloodStatus) {
    $scope.type = 'hospital';
   	
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

            $scope.inHospitalCount = 0; //未出院
            $scope.sickRoomCount = 0;   //一般病房
            $scope.icuCount = 0;        //加護病房

            $scope.seriousInjuredCount = 0; //重傷
            $scope.mediumInjuredCount = 0;  //中傷
            $scope.slightInjuredCount = 0;  //輕傷

            $scope.sum = data.data.length; //總人數

            $scope.hospitalList = [];

            angular.forEach(data.data, function(obj) {

                var hospital = {"收治單位": "", "重傷": 0
                    , "中傷": 0, "輕傷": 0,"加護病房": 0,
                    "一般病房": 0, "其他": 0, "傷者總數": 0};

                var addHospital = true;

                for (var i=0;i<$scope.hospitalList.length;i++){
                    if ($scope.hospitalList[i]["收治單位"] == obj["收治單位"]){
                        addHospital = false;
                        break;
                    }
                }

                if (addHospital == true) {
                    hospital["收治單位"] = obj["收治單位"];
                    $scope.hospitalList.push(hospital);
                }

                var currentHospital;

                for (var i=0;i<$scope.hospitalList.length;i++){
                    if ($scope.hospitalList[i]["收治單位"] == obj["收治單位"]){
                        currentHospital = $scope.hospitalList[i];
                    }
                }

                switch(obj["即時動向"]){
                    case '出院':
                        break;
                    case '一般病房':
                        $scope.inHospitalCount++;
                        $scope.sickRoomCount++;
                        currentHospital["一般病房"]++;
                        break;
                    case '自動出院(AAD)':
                        break;
                    case '加護病房':
                        $scope.inHospitalCount++;
                        $scope.icuCount++;
                        currentHospital["加護病房"]++;
                        break;
                    case '其他':
                        $scope.inHospitalCount++;
                        currentHospital["其他"]++;
                        break;
                    case '死亡':
                        $scope.inHospitalCount++;
                        break;
                    case '轉院':
                        $scope.inHospitalCount++;
                        break;
                }

                switch(obj["救護檢傷"]){
                    case '重傷':
                        $scope.seriousInjuredCount++;
                        currentHospital["重傷"]++;
                        currentHospital["傷者總數"]++;
                        $scope.count1++;
                        break;
                    case '中傷':
                        $scope.mediumInjuredCount++;
                        currentHospital["中傷"]++;
                        currentHospital["傷者總數"]++;
                        $scope.count2++;
                        break;
                    case '輕傷':
                        $scope.slightInjuredCount++;
                        currentHospital["輕傷"]++;
                        currentHospital["傷者總數"]++;
                        $scope.count3++;
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