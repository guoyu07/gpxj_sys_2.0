/**
 * Created by haoxu on 2015/11/2.
 */

var $conf = require('../conf/config');
var $util = require('../util/util.js');
var blankDao = require('../dao/blankDao');

module.exports = {
    //新增板块的后台业务处理
    add: function (req, res, next) {
        console.info('file add service, upload files');

        var resDao = blankDao.add(req, res, next);

    }
}