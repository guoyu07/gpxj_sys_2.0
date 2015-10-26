/**
 * Created by haoxu on 2015/10/22.
 */

var mysql = require('mysql');
var $conf = require('../conf/db-config.js');
var $util = require('../util/util.js');

var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    query: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            console.log('into mysql');
            var param = JSON.parse(req.query.tables);
            if (param.length <= 0) {
                return;
            }

            var paramTable = initQueryTable(param);
            var querySql = 'select si.stockid stockid, si.stockname stockname, X.* ';

            for (var i = 1; i < paramTable.tables.length; i++) {
                querySql += ', X' + i + '.*'
            }

            querySql += ' from ';
            querySql += paramTable.tables[0] + ' X ';
            for (var i = 1; i < paramTable.tables.length; i++) {
                querySql += ' left join ';
                querySql += paramTable.tables[i] + ' X' + i;
                querySql += ' on X.stockid = X' + i + '.stockid ';
            }
            querySql += ' left join stock_info si on X.stockid = si.stockid ';

            /*for (var i = 0; i < paramTable.type.length; i++) {
                querySql += ' where '
            }*/
            console.log(querySql);
            connection.query(querySql, function (err, result) {
                console.info(err);
                console.info(result);
                $util.jsonWrite(res, result);
                connection.release();
            });
        })
    }
}

function initQueryTable(param) {
    if (param != null) {
        var tables = new Array();
        var type = new Array();
        var res = {
            'tables': tables,
            'type': type,
        };

        if (param.table11 || param.table12 || param.table13) {
            tables.push('gainian_pools');
            if (param.table11) {
                type.push('1')
            }
            if (param.table12) {
                type.push('2')
            }
            if (param.table13) {
                type.push('3')
            }
        }
        if (param.table2) {
            tables.push('ex_udp_pools');
        }
        if (param.table3) {
            tables.push('udp_jump');
        }
        return res;
    }
    return null;
}