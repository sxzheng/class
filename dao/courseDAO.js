var asyncQuery = require('../utils/asyncQuery.js');
var courseSql = require('../sql/courseSql.js');

module.exports = {
	queryCourseList: async function (postData) {
		postData.push(postData[0]);
		var result = await asyncQuery.query(courseSql.queryCourseByUserId, postData);
		return result;
	},

	insertCourse: async function (postData, transactionConnection) {
		var result = await asyncQuery.transactionQuery(courseSql.insertCourse, postData, transactionConnection);
		return result;
	},

	insertCreateCourse: async function (postData, transactionConnection) {
		var result = await asyncQuery.transactionQuery(courseSql.insertCreateCourse, postData, transactionConnection);
		return result;
	},

	queryCourse: async function (postData) {
		var result = await asyncQuery.query(courseSql.queryCourse, postData);
		return result;
	},

	insertChooseCourse: async function (postData) {
		var result = await asyncQuery.query(courseSql.insertChooseCourse, postData);
		return result;
	},

	queryCourseByTeacher: async function (postData) {
		var result = await asyncQuery.query(courseSql.queryCourseByTeacher, postData);
		return result;
	},

	queryCourseReport: async function (postData) {
		var result = await asyncQuery.query(courseSql.queryCourseReport, postData);
		return result;
	},

	queryAllCourseReports: async function (postData) {
		var result = await asyncQuery.query(courseSql.queryAllCourseReports, postData);
		return result;
	},

	queryFileList: async function (postData) {
		var result = await asyncQuery.query(courseSql.queryFileList, postData);
		return result;
	},

	queryCourseInfo: async function (postData) {
		var result = await asyncQuery.query(courseSql.queryCourseInfo, postData);
		return result;
	},

	queryAllStudentByCourseId: async function (postData){
		var result = await asyncQuery.query(courseSql.queryAllStudentByCourseId, postData);
		return result;
	},

	insertNotice: async function (postData, transactionConnection){
		var result = await asyncQuery.transactionQuery(courseSql.insertNotice, postData, transactionConnection);
		return result;
	},
	
	addCourseReport: async function (postData, transactionConnection) {
		var result = await asyncQuery.transactionQuery(courseSql.insertCourseReport, postData, transactionConnection);
		return result;
	}
}