/**
 * Created by haoxu on 2015/10/22.
 */

var mysql = require('mysql');
var $conf = require('../conf/db-config.js');
var $util = require('../util/util.js');

var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    query: function(req){

    }
}