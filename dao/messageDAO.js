var asyncQuery = require('../utils/asyncQuery.js');
var messageSql = require('../sql/messageSql.js');

module.exports = {
	queryMessage: async function (postData){
		var result = await asyncQuery.query(messageSql.queryMessage, postData);
		return result;
	},

	queryCommonMessage: async function (postData){
		var result = await asyncQuery.query(messageSql.queryCommonMessage, postData);
		return result;
	},

	queryLeave: async function (postData){
		var result = await asyncQuery.query(messageSql.queryLeave, postData);
		return result;
	},

	queryNotice: async function (postData){
		var result = await asyncQuery.query(messageSql.queryNotice, postData);
		return result;
	},

	addMessage: async function (postData, transactionConnection){
		var result = await asyncQuery.transactionQuery(messageSql.addMessage, postData, transactionConnection);
		return result;
	},

	addCommonMessage: async function (postData, transactionConnection) {
		var result = await asyncQuery.transactionQuery(messageSql.addCommonMessage, postData, transactionConnection);
		return result;
	},
	
	updateMessage: async function (postData, transactionConnection) {
		var result = await asyncQuery.transactionQuery(messageSql.updateMessage, postData, transactionConnection);
		return result;
	}
}