var asyncQuery = require('../utils/asyncQuery.js');
var signSql = require('../sql/signSql');

module.exports = {
	addSign: async function (postData, transactionConnection){
		var result = await asyncQuery.transactionQuery(signSql.addSign, postData, transactionConnection);
		return result;
	},

	querySign: async function (postData){
		var result = await asyncQuery.query(signSql.querySign, postData);
		return result;
	},

	querySignState: async function (postData){
		var result = await asyncQuery.query(signSql.querySignState,postData);
		return result;
	},

	updateSign: async function (postData, transactionConnection){
		var result = await asyncQuery.transactionQuery(signSql.updateSign,postData,transactionConnection);
		return result;
	},

	updateMessage: async function (postData, transactionConnection){
		var result = await asyncQuery.transactionQuery(signSql.updateMessage,postData,transactionConnection);
		return result;
	}

}