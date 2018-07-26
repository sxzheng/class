var asyncQuery = require('../utils/asyncQuery.js');
var userSql = require('../sql/userSql.js');

module.exports = {
	verify: async function (postData) {
		var result = await asyncQuery.query(userSql.selectUser, postData);
		return result;
	},

	insertUser: async function (postData) {
		var result = await asyncQuery.query(userSql.insertUser, postData);
		return result;
	},

	queryUser: async function (postData) {
		var result = await asyncQuery.query(userSql.queryUser, postData);
		return result;
	}
}