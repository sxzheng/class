var scheduleService = require('../service/scheduleService');
var moment = require('moment');

module.exports = {
	queryTodaySchedule: async function (req, res) {
		var param = req.body;
		var postData = [param.userId];
		try{
			var result = await scheduleService.queryTodaySchedule(postData);
			res.json(result);
		} catch(err){
			console.log(err);
		}
	},

	queryAllSchedule: async function (req, res) {
		var param = req.body;
		var postData = [param.userId];
		// var postData = [param.userId, param.pageId];
		try{
			var result = await scheduleService.queryAllSchedule(postData);
			res.json(result);
		} catch(err){
			console.log(err);
		}
	},

	addSchedule: async function (req, res) {
		var param = req.body;
		var schedule = param.schedule;
		var postData = [param.userId, schedule.theme, schedule.location, schedule.date, schedule.time, schedule.detail, schedule.informTime];
		try{
			var result = await scheduleService.addSchedule(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	},
}