var scheduleDAO = require('../dao/scheduleDAO');
var scheduleHandler = require('../handler/scheduleHandler');
var moment = require('moment');

module.exports = {
	queryTodaySchedule: async function (postData) {
		var today = moment().format("YYYY-MM-DD");
		var result = await scheduleDAO.queryTodaySchedule([postData[0], today]);
		var returnData = [];
		for(var i = 0; i < result.length; ++i){
			schedule = {};
			schedule.scheduleId = result[0].scheduleId;
			schedule.theme = result[0].theme;
			schedule.locaiton = result[0].location;
			schedule.time = result[0].time;
			schedule.detail = result[0].detail;
			schedule.inform = result[0].inform;
			returnData.push(schedule);
		}
		return returnData;
	},

	queryAllSchedule: async function (postData) {
		var result = await scheduleDAO.queryAllSchedule(postData);
		var returnData = [];
		for(var i = 0; i < result.length; ++i){
			schedule = {};
			schedule.scheduleId = result[0].scheduleId;
			schedule.theme = result[0].theme;
			schedule.locaiton = result[0].location;
			schedule.date = result[0].date;
			schedule.detail = result[0].detail;
			schedule.inform = result[0].inform;
			returnData.push(schedule);
		}
		return returnData;
	},

	addSchedule: async function (postData) {
		if(postData[postData.length-1] == ""){
			postData.push(0);
		}else{
			postData.push(1);
		}
		var result = await scheduleDAO.insertSchedule(postData);
		var returnData = {errCode: 0};
		returnData.scheduleId = result.insertId;
		//todo
		return returnData;
	}


}