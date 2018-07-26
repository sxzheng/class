var courseService = require('../service/courseService')

module.exports = {
	queryCourseList: async function (req, res) {
		var param = req.body;
		var postData = [param.userId];
		try{
			var result = await courseService.queryCourseList(postData);
			res.json(result);
		} catch(err) {
			console.log(err);
		}
	},

	addCourse: async function (req, res) {
		var param = req.body;
		try{
			var result = await courseService.addCourse(param);
			res.json(result);
		}catch(err){
			console.log("courseController:addCourse" + err);
		}
	},

	joinCourse: async function (req, res) {
		var param = req.body;
		var postData = [param.userId, param.courseId];
		try{
			var result = await courseService.joinCourse(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	},

	queryCourseByTeacher: async function (req, res) {
		var param = req.body;
		var postData = [param.courseId];
		try{
			var result = await courseService.queryCourseByTeacher(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	},

	queryCourseByStudent: async function (req, res) {
		var param = req.body;
		var postData = [param.userId, param.courseId];
		try{
			var result = await courseService.queryCourseByStudent(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	},

	queryAllCourseReports: async function (req, res) {
		var param = req.body;
		var postData = [param.courseId];
		try{
			var result = await courseService.queryAllCourseReports(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	},

	queryFileList: async function (req, res) {
		var param = req.body;
		var postData = [param.courseId];
		try{
			var result = await courseService.queryFileList(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	},

	addNotice: async function (req, res) {
		var param = req.body;
		var postData = [param.courseId, param.content];
		try{
			var result = await courseService.addNotice(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	}
	// invite: async function (req, res) {
		
	// }
}