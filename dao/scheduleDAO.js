var asyncQuery = require('../utils/asyncQuery.js');
var scheduleSql = require('../sql/scheduleSql.js');

module.exports = {
	selectScheduleByUserId: async function (postData) {
		var result = await asyncQuery.query(scheduleSql.selectSchedule, postData);
		return result;
	},

	queryTodaySchedule: async function (postData) {
		var result = await asyncQuery.query(scheduleSql.queryTodaySchedule, postData);
		return result;
	},

	queryAllSchedule: async function (postData) {
		var result = await asyncQuery.query(scheduleSql.queryAllSchedule, postData);
		return result;
	},

	insertSchedule: async function (postData) {
		var result = await asyncQuery.query(scheduleSql.insertSchedule, postData);
		return result;
	}
}