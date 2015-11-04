/**
 * Created by haoxu on 2015/10/22.
 */

var mysql = require('mysql');
var $conf = require('../conf/db-config.js');
var $util = require('../util/util.js');

var pool = mysql.createPool($util.extend({}, $conf.stock_model));

module.exports = {
    query: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            console.log('into mysql');
            var param = JSON.parse(req.query.tables);
            var queryDate = req.query.queryDate;
            if (typeof(queryDate) == 'undefined') {
                queryDate = $util.DateUtile.formate('yyyyMMdd');
            }
            if (param.length <= 0) {
                return;
            }

            var querySql = initQueryTable(param, queryDate);
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

function initQueryTable(param, queryDate) {
    if (param != null) {
        var select = "select si.stockid stockid, si.stockname stockname ";
        var from = " from stock_info si ";
        var where = " where 1 = 1 ";

        if (param.table11 || param.table12 || param.table13) {
            if (param.table11) {
                select += ' , "涨停占比" as gainian_type1, gp1.gainian_name as gainian_name1, gp1.gains as gains11';
                from += ' right join gainian_pools gp1 on si.stockid = gp1.stockid ';
                where += ' and gp1.gainian_type = 1 and gp1.day = ' + queryDate;
            }
            if (param.table12) {
                select += ' , "上涨占比" as gainian_type2, gp2.gainian_name as gainian_name2, gp2.gains as gains12';
                from += ' right join gainian_pools gp2 on si.stockid = gp2.stockid ';
                where += ' and gp2.gainian_type = 2 and gp2.day = ' + queryDate;
            }
            if (param.table13) {
                select += ' , "资金流入" as gainian_type3, gp3.gainian_name as gainian_name3, gp3.gains as gains13';
                from += ' right join gainian_pools gp3 on si.stockid = gp3.stockid ';
                where += ' and gp3.gainian_type = 3 and gp3.day = ' + queryDate;
            }
        }
        if (param.table2) {
            select += ' , eup.capital_inflow, eup.current_price, eup.gains as gains2, eup.today_gains ';
            from += ' right join ex_udp_pools eup on si.stockid = eup.stockid ';
            where += ' and eup.day = ' + queryDate;
        }
        if (param.table3) {
            select += ' , uj.close_price, uj.gains as gains3, uj.score, uj.week_gains  ';
            from += ' right join udp_jump uj on si.stockid = uj.stockid ';
            where += ' and uj.day = ' + queryDate;
        }

        return select + from + where;

    }
    return null;
}