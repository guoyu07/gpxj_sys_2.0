/**
 * Created by haoxu on 2015/10/22.
 */

var mysql = require('mysql');
var $conf = require('../conf/db-config.js');
var $util = require('../util/util.js');

var pool = mysql.createPool($util.extend({}, $conf.stock_app));

module.exports = {
    list: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            //var param = JSON.parse(req.query.tables);
            //var queryDate = req.query.queryDate;
            var querySql = 'select * from t_blank';
            connection.query(querySql, function (err, result) {
                console.info(err);
                console.info(result);
                $util.jsonWrite(res, result);
                connection.release();
            });
        })
    },

    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var param = req.query.params;

            var querySql = ' INSERT INTO t_blank '+
            ' (imageurl, witticism, fund, create_time, update_time) '+
            ' VALUES ';

            connection.query(querySql, function (err, result) {
                console.info(err);
                console.info(result);
                $util.jsonWrite(res, result);
                connection.release();
            });
        })
    }
}
