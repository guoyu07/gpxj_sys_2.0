/**
 * Created by haoxu on 2015/10/22.
 */

var gpxjCtrls = angular.module('gpxjCtrls', []);
var udpViewDao = require('../../dao/udpViewDao');

gpxjCtrls.controller('LoginCtrl', ['$scope', function ($scope) {

    $scope.userinfo = {
        username: 'aaa',
        password: 'bbb'
    }

    $scope.login = function () {
        console.log('$scope value userinfo : username ' + $scope.userinfo.username + ' ; password : ' + $scope.userinfo.password);
    }
}])

gpxjCtrls.controller('UdpViewCtrl', ['$scope', function ($scope) {

    $scope.tables = {
        table11: true,
        table12: true,
        table13: true,
        table2: false,
        table3: false
    };

    $scope.login = function () {
        console.log('$scope value userinfo : username ' + $scope.userinfo.username + ' ; password : ' + $scope.userinfo.password);
    };

    $scope.queryStock = function () {
        $scope.queryRes = udpViewDao.query($scope.tables);
    }
}])
