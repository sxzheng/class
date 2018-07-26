var router = require('express').Router();
var signController = require('../controller/signController');

//添加签到
router.post('/addSign', function (req, res){
	signController.addSign(req, res);
});
//查看签到信息
router.post('/querySign', function (req, res){
	signController.querySign(req, res);
});
//检查签到情况
router.post('/checkSign', function (req, res){
	signController.checkSign(req, res);
});
//签到
router.post('/signIn', function (req, res){
	signController.signIn(req, res);
});

module.exports = router;
