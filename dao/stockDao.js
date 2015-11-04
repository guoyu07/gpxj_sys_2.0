/**
 * Created by haoxu on 2015/11/2.
 */


var mysql = require('mysql');
var $conf = require('../conf/db-config.js');
var $util = require('../util/util.js');

var pool = mysql.createPool($util.extend({}, $conf.stock_financial));
var stockPool = mysql.createPool($util.extend({}, $conf.stock_model));

module.exports = {

    /**
     * 查询三张表对应表的字段和注释
     * @param req
     * @param res
     */
    queryCol: function (req, res) {
        pool.getConnection(function (err, connection) {
            var tableName = req.query.tableName;
            var querySql = 'select column_name as colName,column_comment as colComment from information_schema.columns where table_name="'
                + tableName + '"';
            console.info(querySql);
            connection.query(querySql, function (err, result) {
                console.info(err);
                console.info(result);
                connection.release();
                return $util.jsonWrite(res, result);
            });
        })
    },

    /**
     * 初始化数据，查询三张表数据
     * @param req
     * @param res
     */
    queryIndex: function (req, res) {
        pool.getConnection(function (err, connection) {
            var stockid = req.query.stockid;
            var year = req.query.year;
            var tableName = req.query.tableName;
            var querySql = 'select * from ' + tableName + ' where stockid = ' +
                stockid + ' and day like \'' + year + '%\'';
            console.info(querySql);
            connection.query(querySql, function (err, result) {
                console.info(err);
                console.info(result);
                connection.release();
                return $util.jsonWrite(res, result);
            });
        })
    },

    /**
     * 查询股票信息
     * @param req
     * @param res
     */
    queryStockInfo: function (req, res) {
        pool.getConnection(function (err, connection) {
            var stockid = req.query.stockid;
            var querySql = 'select tsi.*,tsc.debt,tsc.profits,tsc.cashflow,tsc.category_name from t_stock_info tsi '+
                ' left join t_stock_category tsc on tsc.category_id = tsi.category_id where tsi.stockid = ' + stockid;

            console.info(querySql);
            connection.query(querySql, function (err, result) {
                console.info(err);
                console.info(result);
                connection.release();
                return $util.jsonWrite(res, result);
            })
        })
    },

}