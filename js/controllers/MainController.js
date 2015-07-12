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
                    "一般病房": 0, "其他": 0, "sum": 0};

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
                        currentHospital["sum"]++;
                        $scope.count1++;
                        break;
                    case '中傷':
                        $scope.mediumInjuredCount++;
                        currentHospital["中傷"]++;
                        currentHospital["sum"]++;
                        $scope.count2++;
                        break;
                    case '輕傷':
                        $scope.slightInjuredCount++;
                        currentHospital["輕傷"]++;
                        currentHospital["sum"]++;
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
            
            var bloodData = [];

            for(var x in data){
                if(x == 'time'){ // get 時間
                    
                    var getDate = new Date(data[x]); //get API Time
                    var nowDate = new Date(); // get

                    var diffDate = nowDate - getDate;
                    var mm = new Date(diffDate);
                    var diffMinutes = mm.getMinutes();

                    $scope.bloodStatusDataTime = diffMinutes;   
                }
                else{ //get 血庫存量資訊
                    bloodData.push(data[x]);
                }
            }
            $scope.bloodStatus = bloodData;
        })
        .error(function(err){
            console.log('people-error:' + err);
        });

}]);

// Date: 擴充 string to Date
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}       
