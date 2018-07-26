var mysql = require('mysql');
var mysqlConf = require('./mysqlConf.js');
var pool = mysql.createPool(mysqlConf);

module.exports = pool;