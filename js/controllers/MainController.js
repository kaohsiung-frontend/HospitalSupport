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
        })
        .error(function(err){
            console.log('people-error:' + err);
        });

    bloodStatus
        .success(function(data){
            
            var bloodData = [];

            for(var x in data){
                if(x == 'time'){ // get 時間
                    

                    console.log(data[x]);
                    var getDate = new Date(data[x]);
                    console.log(getDate);


                    var nowDate = new Date();
                    console.log('nowTime = '+nowDate);

                    var diffDate = nowDate - getDate;
                    console.log('diffDate = '+diffDate);
                    
                    var mm = new Date(diffDate);
                    var diffMinutes = mm.getMinutes();
                    console.log('mm = '+x);

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