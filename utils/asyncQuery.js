var pool = require('../conf/mysqlPoolConf.js'); //connection pool

var query = function(sql, values) {
    //object of Promise used to control async
	return new Promise((resolve, reject) => {
        //get a connection from connection pool
        pool.getConnection(function(err, connection) {
            if(err) {
                //promise rejected
                reject(err);
            } else {
                //use the connection in callback to operate database
				connection.query(sql, values, (err, result) => {
					if(err) {
                        //promise rejected
						reject(err);
					} else {
                        //promise fulfilled
						resolve(result);
					}
				});
                //release connection
				connection.release();
			}
		});

	});
}

var getTransactionConnection = function() {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if(err) {
                reject(err);
            } else {
                connection.beginTransaction(function(err) {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(connection);
                    }
                });
            }
        });
    });
}

var transactionQuery = function(sql, values, connection) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports.query = query;
module.exports.getTransactionConnection = getTransactionConnection;
module.exports.transactionQuery = transactionQuery;