/**
 * Created by haoxu on 2015/11/2.
 */

var $conf = require('../conf/config');
var $util = require('../util/util.js');
var blankDao = require('../dao/blankDao');

module.exports = {
    //�������ĺ�̨ҵ����
    add: function (req, res, next) {
        console.info('file add service, upload files');

        var resDao = blankDao.add(req, res, next);

    }
}