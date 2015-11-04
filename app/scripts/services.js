/**
 * Created by haoxu on 2015/10/29.
 */

var gpxjServices = angular.module('gpxjServices', []);

gpxjServices.factory('BlankService', ['$http', 'fileUpload', function ($http, fileUpload) {

    var doRequest = function (path, params, method) {
        return $http({
            url: path,
            params: params,
            method: method,
        })
    }

    return {
        list: function () {
            return doRequest('/blank/list', '', 'GET');
        },

        add: function (params, file) {
            var uploadUrl = './public/temp';
            fileUpload.uploadFileToUrl(file, uploadUrl);
            return doRequest('/blank/add', params, 'POST');
        }
    }
}])

gpxjServices.factory('StockService', ['$http', function ($http) {

    var doRequest = function (path, params, method) {
        return $http({
            url: path,
            params: params,
            method: method,
        })
    }

    return {
        //查询字段名称
        queryCol: function (params) {
            return doRequest('/stock/queryCol', params, 'GET');
        },
        //查询股票资产负债表数据
        queryIndex: function (params, callback) {
            this.queryCol(params).success(function (res) {
                var colRes = res;
                var stockInfo = new Array();
                doRequest('/stock/queryIndex', params, 'GET').success(function (res1) {
                    var stockRes = res1;
                    for (var i = 0; i < colRes.length; i++) {
                        var stock = {};
                        stock.colName = colRes[i].colComment;
                        stock.day0 = stockRes[0] ? stockRes[0][colRes[i].colName] : '0';
                        stock.day1 = stockRes[1] ? stockRes[1][colRes[i].colName] : '0';
                        stock.day2 = stockRes[2] ? stockRes[2][colRes[i].colName] : '0';
                        stock.day3 = stockRes[3] ? stockRes[3][colRes[i].colName] : '0';
                        stockInfo.push(stock);
                    }
                    callback(stockInfo);
                })
            })
        },

        //查询股票名称
        queryStockInfo: function (params, callback) {
            doRequest('/stock/queryStockInfo', params, 'GET').success(function (res) {
                var stockObj = res[0];
                switch (params.tableCategory){
                    case 'debt': stockObj.tableName = stockObj.debt;break;
                    case 'cashflow': stockObj.tableName = stockObj.cashflow;break;
                    case 'profits': stockObj.tableName = stockObj.profits;break;
                    default : stockObj.tableName = stockObj.debt;break;
                }
                callback(stockObj);
            })
        },

    }
}])


gpxjServices.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function () {
            })
            .error(function () {
            });
    }
}]);