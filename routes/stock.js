/**
 * Created by haoxu on 2015/11/2.
 */

var express = require('express');
var router = express.Router();
var stockService = require('../service/stockService');

/* GET home page. */
router.get('/queryIndex', function(req, res, next) {
    stockService.queryIndex(req, res, next);
});

router.get('/queryCol', function(req, res) {
    stockService.queryCol(req, res);
});

router.get('/queryStockInfo', function(req, res) {
    stockService.queryStockInfo(req, res);
});

module.exports = router;