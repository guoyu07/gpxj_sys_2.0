/**
 * Created by haoxu on 2015/10/15.
 */
// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db-config');
var $util = require('../util/util');
var userSql = {
    insert: 'INSERT INTO t_user_test(userid, username, password) VALUES(null,?,?)',
    update: 'update t_user_test set username=?, password=? where userid=?',
    delete: 'delete from t_user_test where userid=?',
    queryById: 'select * from t_user_test where userid=?',
    queryAll: 'select * from t_user_test',
    login: 'select * from t_user_test where username=? and password=?',
};

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    /*add: function (req, res, next) {
     console.log('connect');
     pool.getConnection(function(err, connection) {
     console.log('in');
     // 获取前台页面传过来的参数
     var param = req.query || req.params;

     // 建立连接，向表中插入值
     // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
     connection.query(userSql.insert, [param.username, param.password], function(err, result) {
     if(result) {
     result = {
     code: 200,
     msg:'增加成功'
     };
     }

     // 以json形式，把操作结果返回给前台页面
     jsonWrite(res, result);

     // 释放连接
     connection.release();
     });
     });
     },
     delete: function (req, res, next) {
     // delete by Id
     pool.getConnection(function(err, connection) {
     var id = +req.query.id;
     connection.query(userSql.delete, id, function(err, result) {
     if(result.affectedRows > 0) {
     result = {
     code: 200,
     msg:'删除成功'
     };
     } else {
     result = void 0;
     }
     jsonWrite(res, result);
     connection.release();
     });
     });
     },
     update: function (req, res, next) {
     // update by id
     // 为了简单，要求同时传name和age两个参数
     var param = req.body;
     if(param.name == null || param.age == null || param.id == null) {
     jsonWrite(res, undefined);
     return;
     }

     pool.getConnection(function(err, connection) {
     connection.query(userSql.update, [param.name, param.age, +param.id], function(err, result) {
     // 使用页面进行跳转提示
     if(result.affectedRows > 0) {
     res.render('suc', {
     result: result
     }); // 第二个参数可以直接在jade中使用
     } else {
     res.render('fail',  {
     result: result
     });
     }
     console.log(result);

     connection.release();
     });
     });

     },
     queryById: function (req, res, next) {
     var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
     pool.getConnection(function(err, connection) {
     connection.query(userSql.queryById, id, function(err, result) {
     jsonWrite(res, result);
     connection.release();

     });
     });
     },
     queryAll: function (req, res, next) {
     pool.getConnection(function(err, connection) {
     connection.query(userSql.queryAll, function(err, result) {
     jsonWrite(res, result);
     connection.release();
     });
     });
     }*/
    login: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var param = req.query || req.params;
            connection.query(userSql.login, [param.username, param.password], function (err, result) {
                if (result) {
                    console.info(result[0].userid);
                    console.info(err);
                    result = result[0].userid;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
};
