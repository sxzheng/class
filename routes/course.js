var router = require('express').Router();
var courseController = require('../controller/courseController');

//查看课程列表
router.post('/queryCourseList', function (req, res){
	// console.log(req);
	courseController.queryCourseList(req, res);
});

//添加课程
router.post('/addCourse', function (req, res){
	// console.log(req);
	courseController.addCourse(req, res);
});

//加入课程
router.post('/joinCourse', function (req, res){
	// console.log(req);
	courseController.joinCourse(req, res);
});

//教师端查看课程进度
router.post('/queryCourseByTeacher', function (req,res){
	courseController.queryCourseByTeacher(req, res);
});

//学生端查看课程进度
router.post('/queryCourseByStudent', function (req, res){
	courseController.queryCourseByStudent(req, res);
});

//教师端查看所有课程报告
router.post('/queryAllCourseReports', function (req, res){
	courseController.queryAllCourseReports(req, res);
});

//添加课程通知
router.post('/addNotice', function (req, res){
	courseController.addNotice(req, res)
});

//查看课程文件信息
router.post('/queryFileList', function(req, res){
	courseController.queryFileList(req, res);
});


module.exports = router;