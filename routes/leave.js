var router = require('express').Router();
var leaveController = require('../controller/leaveController');

//添加请假条
router.post('/addLeave', function (req, res){
	leaveController.addLeave(req, res);
});

//批复请假条
router.post('/reply', function (req, res){
	leaveController.reply(req, res);
});

module.exports = router;
