/**
 * Created by haoxu on 2015/11/2.
 */

var stockDao = require('../dao/stockDao');

module.exports = {
    //查询表列名
    queryCol: function (req, res) {
        console.info('stockService into ... ');
        return stockDao.queryCol(req, res);
    },

    //股票后台业务查询
    queryIndex: function (req, res) {
        console.info('stockService into ... ');
        return stockDao.queryIndex(req, res);
    },

    //查询股票信息
    queryStockInfo: function (req, res) {
        console.info('stockService into queryStockName .... ');
        return stockDao.queryStockInfo(req, res);
    },

}