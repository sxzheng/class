var courseDAO = require('../dao/courseDAO');
var messageDAO = require('../dao/messageDAO');
var asyncQuery = require('../utils/asyncQuery');
var moment = require('moment');

module.exports = {
	queryCourseList: async function (postData) {
		var result = await courseDAO.queryCourseList(postData);
		var returnData = {courseListOn: [], courseListOff: []}
		console.log(result);
		//todo
		for(var i = 0; i < result.length; ++i){
			course = {};
			var startDate = moment(result[i].courseStartDate);
			var endDate = moment(result[i].courseEndDate);
			var weekDay = result[i].weekDay;

			course.courseId = result[i].courseId;
			course.courseName = result[i].courseName;
			course.imageUrl = result[i].courseImageUrl;
			course.teacherId = result[i].teacherId;
			course.teacherName = result[i].teacherName;
			course.weekDay = "周" + "天一二三四五六".charAt(result[i].weekDay);
			course.time = result[i].courseTime;
			course.startDate = result[i].courseStartDate;
			course.endDate = result[i].courseEndDate;
			course.sumPeriods = result[i].courseTotalPeriods;
			course.location = result[i].courseLocation;

			if(moment.min(moment(), endDate) == endDate){
				//课程已结束
				course.currentPeriod = course.sumPeriods;
				returnData.courseListOff.push(course);
			}else{
				//课程进行中
				var startDay = startDate.day();
				var nowDate = moment();
				var nowDay = nowDate.day();

				var temp1 = startDay == weekDay ? startDate : startDate.add(startDay < weekDay ? weekDay - startDay : weekDay - startDay + 7, 'days');

				var temp2 = nowDay == weekDay ? nowDate : nowDate.subtract(nowDay > weekDay ? nowDay - weekDay : nowDay - weekDay + 7, 'days');
				course.currentPeriod = temp2.diff(temp1, 'weeks') + 1;
				returnData.courseListOn.push(course);
			}
		}
		return returnData;
	},

	addCourse: async function (param) {
		var postData1 = [param.courseName, param.imageUrl, param.weekDay, param.time, param.dateStart, param.dateEnd, 99, param.location];
		var postData2 = [param.userId];
		var courseId = 0;
		var returnData = {};
		var transactionConnection = null;
		try{
			transactionConnection = await asyncQuery.getTransactionConnection();
			//insert course
			var result1 = await courseDAO.insertCourse(postData1, transactionConnection);

			//insert create_course
			courseId = result1.insertId;
			postData2.push(courseId);
			var result2 = await courseDAO.insertCreateCourse(postData2, transactionConnection);

			transactionConnection.commit();
		}catch(err){
			transactionConnection.rollback();
			console.log("courseService:addCourse" + err);
		}finally{
			transactionConnection.release();
			//query the result of insert
			var queryResult = await courseDAO.queryCourse(courseId);
			console.log(queryResult);
			if(queryResult.length != 0){
				returnData.errCode = 0;
				returnData.courseId = queryResult[0].courseId;
				returnData.courseName = queryResult[0].courseName;
				returnData.teacherName = queryResult[0].teacherName;
				returnData.time = queryResult[0].courseTime;
				returnData.location = queryResult[0].courseLocation;
				return returnData;
			}else{
				returnData.errCode = 1;
				return returnData;
			}
		}
	},

	joinCourse: async function (postData) {
		var result = await courseDAO.insertChooseCourse(postData);
		var returnData = {};
		//todo
		returnData.errCode = 0;
		return returnData;
	},

	queryCourseByTeacher: async function (postData) {
		var result = await courseDAO.queryCourseByTeacher(postData);
		var returnData = {};
		returnData.courseName = result[0].courseName;
		returnData.sumPeriods = result[0].sumPeriods;
		//todo
		var startDate = moment(result[0].courseStartDate);
		var endDate = moment(result[0].courseEndDate);
		var weekDay = result[0].weekDay;
		if(moment.min(moment(), endDate) == endDate){
			//课程已结束
			returnData.currentPeriod = course.sumPeriods;
			}else{
				//课程进行中
				var startDay = startDate.day();
				var nowDate = moment();
				var nowDay = nowDate.day();
				var temp1 = startDay == weekDay ? startDate : startDate.add(startDay < weekDay ? weekDay - startDay : weekDay - startDay + 7, 'days');
				var temp2 = nowDay == weekDay ? nowDate : nowDate.subtract(nowDay > weekDay ? nowDay - weekDay : nowDay - weekDay + 7, 'days');
				returnData.currentPeriod = temp2.diff(temp1, 'weeks') + 1;
			}
		return returnData;
	},

	queryCourseByStudent: async function (postData) {
		// var temp = [postData[1]]
		var result = await courseDAO.queryCourseByTeacher([postData[1]]);
		var returnData = {};
		returnData.courseName = result[0].courseName;
		returnData.sumPeriods = result[0].sumPeriods;
		//todo
		var startDate = moment(result[0].courseStartDate);
		var endDate = moment(result[0].courseEndDate);
		var weekDay = result[0].weekDay;
		if(moment.min(moment(), endDate) == endDate){
			//课程已结束
			returnData.currentPeriod = course.sumPeriods;
			}else{
				//课程进行中
				var startDay = startDate.day();
				var nowDate = moment();
				var nowDay = nowDate.day();
				var temp1 = startDay == weekDay ? startDate : startDate.add(startDay < weekDay ? weekDay - startDay : weekDay - startDay + 7, 'days');
				var temp2 = nowDay == weekDay ? nowDate : nowDate.subtract(nowDay > weekDay ? nowDay - weekDay : nowDay - weekDay + 7, 'days');
				returnData.currentPeriod = temp2.diff(temp1, 'weeks') + 1;
			}

		var result2 = await courseDAO.queryCourseReport(postData);
		returnData.count0 = 0;
		returnData.count1 = 0;
		returnData.count2 = 0;
		//todo
		for(var i = 0; i < result2.length; ++i){
			switch(result2[i].state){
				case 0: 
					returnData.count0++;
					break;
				case 1:
					returnData.count1++;
					break;
				case 2:
					returnData.count2++;
					break;
				default:
			}
		}
		return returnData;
	},

	queryAllCourseReports: async function (postData) {
		var result = await courseDAO.queryAllCourseReports(postData);
		var returnData = [];
		var temp = {}
		// console.log(result);
		for(var i = 0; i < result.length; ++i){
			studentId = result[i].studentId;
			if(!(studentId in temp)){
				temp[studentId] = {};
				temp[studentId].studentId = result[i].studentId;
				temp[studentId].schoolNumber = result[i].studentNumber;
				temp[studentId].studentName = result[i].studentName;
				temp[studentId].count0 = 0;
				temp[studentId].count1 = 0;
				temp[studentId].count2 = 0;
			}
			switch(result[i].state){
				case 0:
					temp[studentId].count0++;
					break;
				case 1:
					temp[studentId].count1++;
					break;
				case 2:
					temp[studentId].count2++;
					break;
			}
		}
		console.log(temp);
		for(var key in temp){
			report = {};
			report.userId = temp[key].studentId;
			report.schoolNumber = temp[key].schoolNumber;
			report.studentName = temp[key].studentName;
			report.count0 = temp[key].count0;
			report.count1 = temp[key].count1;
			report.count2 = temp[key].count2;
			returnData.push(report);
		}
		//todo
		return returnData;
	},

	queryFileList: async function (postData) {
		var result = await courseDAO.queryFileList(postData);
		var returnData = []
		//todo
		for(var i = 0; i < result.length; ++i){
			file = {};
			file.fileId = result[i].fileId;
			file.fileName = result[i].fileName;
			file.fileType = result[i].fileType;
			file.createTime = result[i].time;
			returnData.push(file);
		}
		return returnData;
	},

	addNotice: async function (postData) {
		var courseId = postData[0];
		var returnData = {errCode: 0};
		var transactionConnection = null;
		try{
			transactionConnection = await asyncQuery.getTransactionConnection();
			//1.query course
			var courseResult = await courseDAO.queryCourseInfo([courseId]);
			//1.query all student by course id
			var studentResult = await courseDAO.queryAllStudentByCourseId([courseId]);
			//3.insert into notice
			var courseName = courseResult[0].courseName;
			var location = courseResult[0].courseLocation;
			var now = moment().format("YYYY-MM-DD HH:mm");
			var day = now.split(" ")[0];
			var time = now.split(" ")[1];
			var content = postData[1];
			var noticeResult = await courseDAO.insertNotice([courseId,courseName,day,location,content], transactionConnection);
			//4.insert many into message
			for(var i = 0; i < studentResult.length; ++i){
				var studentId = studentResult[i].studentId;
				var contentId = noticeResult.insertId;
				var contentType = 2;
				var messageResult = await messageDAO.addMessage([studentId,day,time,courseName,contentId,contentType], transactionConnection);
			}
			transactionConnection.commit();
		}catch(err){
			returnData.errCode = 1
			transactionConnection.rollback();
			console.log("courseService:addNotice" + err);
		}finally{
			console.log("finally");
			transactionConnection.release();
			return returnData;
		}
	}
}