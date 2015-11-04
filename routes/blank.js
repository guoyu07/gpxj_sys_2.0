/**
 * Created by haoxu on 2015/10/26.
 */
var express = require('express');
var router = express.Router();
var blankDao = require('../dao/blankDao');
var blankService = require('../service/blankService');

/* GET home page. */
router.get('/list', function(req, res, next) {
    blankDao.list(req, res, next);
});

router.post('/add', function(req, res, next) {
    blankService.add(req, res, next);
});

module.exports = router;
