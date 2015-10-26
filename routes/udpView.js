/**
 * Created by haoxu on 2015/10/26.
 */
var express = require('express');
var router = express.Router();
var udpViewDao = require('../dao/udpViewDao')

/* GET home page. */
router.get('/', function(req, res, next) {
    udpViewDao.query(req, res, next);
});

module.exports = router;
