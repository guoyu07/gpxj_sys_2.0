/**
 * Created by haoxu on 2015/11/2.
 */

var stockDao = require('../dao/stockDao');

module.exports = {
    //��ѯ������
    queryCol: function (req, res) {
        console.info('stockService into ... ');
        return stockDao.queryCol(req, res);
    },

    //��Ʊ��̨ҵ���ѯ
    queryIndex: function (req, res) {
        console.info('stockService into ... ');
        return stockDao.queryIndex(req, res);
    },

    //��ѯ��Ʊ��Ϣ
    queryStockInfo: function (req, res) {
        console.info('stockService into queryStockName .... ');
        return stockDao.queryStockInfo(req, res);
    },

}