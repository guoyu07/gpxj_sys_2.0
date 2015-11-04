/**
 * Created by haoxu on 2015/10/22.
 */

var gpxjCtrls = angular.module('gpxjCtrls', []);

gpxjCtrls.controller('UdpViewCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.tables = {
        'table11': false,
        'table12': false,
        'table13': false,
        'table2': false,
        'table3': false
    };

    var dateNow = new Date();
    $scope.queryDate = dateNow.Format('yyyyMMdd');

    $scope.queryStock = function () {
        if ($scope.tables.table11 || $scope.tables.table12 || $scope.tables.table13 || $scope.tables.table2 || $scope.tables.table3) {
            $http({
                method: 'GET',
                url: '/udpView',
                params: {'tables': $scope.tables, 'queryDate': $scope.queryDate}
            }).success(function (res) {
                $scope.queryRes = res;
            });
        }
    }
}])

gpxjCtrls.controller('BlankCtrl', ['$scope', 'BlankService', function ($scope, BlankService) {

    BlankService.list().then(function (res) {
        $scope.blankList = res.data;
    });

    $scope.resetAll = function () {
        $scope.newBlankInfo = {
            witticism: '',
            background: '',
            fund: '',
        }
    }

    $scope.submitAdd = function () {
        console.info($scope.newBlankInfo);
        var file = $scope.newBlankInfo.image;
        BlankService.add($scope.newBlankInfo, file).then(
            function (res) {

            },
            function (rej) {

            }
        );
    }

}])

gpxjCtrls.controller('StockCtrl', ['$scope', 'StockService', function ($scope, StockService) {

    $scope.stock = {
        stockid: '600000',
        stockName: '',
        year: 2015,
        day0: true,
        day1: false,
        day2: false,
        day3: false,
        tableCategory: 'debt'
    };

    $scope.queryIndex = function () {
        if ($scope.stock.stockid != '' && typeof($scope.stock.stockid) != 'undefined') {
            var param = {
                stockid: $scope.stock.stockid,
                year: $scope.stock.year,
                tableCategory: $scope.stock.tableCategory
            };

            StockService.queryStockInfo(param, function (res) {
                $scope.stock.stockName = res.stock_name;
                $scope.stock.stockCategory = res.category_name;
                param.tableName = res.tableName;
                StockService.queryIndex(param, function (res) {
                    $scope.reStocks = res;
                    console.info($scope.reStocks);
                });
            });
        }
    }

    $scope.queryIndex();
}])