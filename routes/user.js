var router = require('express').Router();
var userController = require('../controller/userController');

//认证
router.post('/verify', function(req, res){
	userController.verify(req, res);
});

//绑定信息
router.post('/bindInformation', function(req, res){
	userController.bindInformation(req, res);
});

module.exports = router;
