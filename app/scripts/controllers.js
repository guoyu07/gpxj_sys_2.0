/**
 * Created by haoxu on 2015/10/22.
 */

var gpxjCtrls = angular.module('gpxjCtrls', []);

gpxjCtrls.controller('LoginCtrl', ['$scope', function ($scope) {

    $scope.userinfo = {
        username: 'aaa',
        password: 'bbb'
    }

    $scope.login = function () {
        console.log('$scope value userinfo : username ' + $scope.userinfo.username + ' ; password : ' + $scope.userinfo.password);
    }
}])

gpxjCtrls.controller('UdpViewCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.tables = {
        'table11': true,
        'table12': true,
        'table13': true,
        'table2': false,
        'table3': false
    };

    $scope.login = function () {
        console.log('$scope value userinfo : username ' + $scope.userinfo.username + ' ; password : ' + $scope.userinfo.password);
    };

    $scope.queryStock = function () {
        console.log('checked');
        $http({
            method: 'GET',
            url: '/udpView',
            params: {'tables': $scope.tables}
        }).success(function(res){
            console.log('success');
            $scope.queryRes = res;
        });
    }
}])
