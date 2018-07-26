var router = require('express').Router();
var messageController = require('../controller/messageController');

//教师端查看消息
router.post('/queryMessageByTeacher', function(req, res){
	messageController.queryMessageByTeacher(req, res);
});

//学生端查看消息
router.post('/queryMessageByStudent', function(req, res){
	messageController.queryMessageByStudent(req, res);
});

module.exports = router;
