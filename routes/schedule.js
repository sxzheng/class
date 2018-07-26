var router = require('express').Router();
var scheduleController = require('../controller/scheduleController');

//查看今日日程
router.post('/queryTodaySchedule', function (req, res){
	console.log(req);
	scheduleController.queryTodaySchedule(req, res);
});

//查看全部日程
router.post('/queryAllSchedule', function (req, res){
	console.log(req);
	scheduleController.queryAllSchedule(req, res);
});

//添加日程
router.post('/addSchedule', function (req, res){
	scheduleController.addSchedule(req, res);
});
module.exports = router;
