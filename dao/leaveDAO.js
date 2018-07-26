var asyncQuery = require('../utils/asyncQuery.js');
var leaveSql = require('../sql/leaveSql.js');

module.exports = {
	addLeave: async function (postData, transactionConnection){
		var result = await asyncQuery.transactionQuery(leaveSql.addLeave, postData, transactionConnection);
		return result;
	},

	updateLeave: async function (postData, transactionConnection){
		var result = await asyncQuery.transactionQuery(leaveSql.updateLeave, [postData[1],postData[0]], transactionConnection);
		return result;
	},
	
	queryLeave: async function (postData){
		var result = await asyncQuery.query(leaveSql.queryLeave, postData);
		return result;
	}
}