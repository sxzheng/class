var leaveDAO = require('../dao/leaveDAO');
var courseDAO = require('../dao/courseDAO');
var userDAO = require('../dao/userDAO');
var messageDAO = require('../dao/messageDAO');
var asyncQuery = require('../utils/asyncQuery.js');
var moment = require('moment');

module.exports = {
	addLeave: async function (postData) {
		//todo
		var transactionConnection = null;
		var leaveData = postData.concat();
		leaveData.push(0);
		var returnData = {errCode:1};
		try{
			transactionConnection = await asyncQuery.getTransactionConnection();
			//1.add leave information to table excuse
			var result = await leaveDAO.addLeave(leaveData,transactionConnection);

			//2.get insert id of excuse
			var leaveId = result.insertId;
			var courseInfo = await courseDAO.queryCourse([postData[1]]);
			var today = moment().format("YYYY-MM-DD HH:mm");

			var teacherId = courseInfo[0].teacherId;
			var date = today.split(' ')[0];
			var time = today.split(' ')[1];
			var theme = courseInfo[0].courseName;
			var contentId = leaveId;
			var contentType = 1;
			
			//3.add message to table message with teacher id
			var addMessageResult = await messageDAO.addMessage([teacherId,date,time,theme,contentId,contentType], transactionConnection);
			if(addMessageResult.insertId != 0){
				returnData.errCode = 0;
				returnData.courseId = postData[1];
				returnData.courseName = theme;
				var studentInfo = await userDAO.queryUser([postData[0]]);
				returnData.studentName = studentInfo[0].name;
				returnData.schoolNumber = studentInfo[0].schoolNumber;
				returnData.reason = postData[3];
			}
			transactionConnection.commit();
		}catch(err){
			transactionConnection.rollback();
			returnData = {errCode:1};
		}finally{
			transactionConnection.release();
			return returnData;
		}
	},

	reply: async function (postData) {
		//todo
		var returnData = {errCode:1};
		var transactionConnection = null;
		postData[1] = postData[1] + 1; //1.同意 2.不同意
		try{
			transactionConnection = await asyncQuery.getTransactionConnection();
			//1.update the state in table excuse
			var result = await leaveDAO.updateLeave(postData,transactionConnection);

			//2.get leave information by leave id
			var leaveInfo = await leaveDAO.queryLeave(postData[0]);
			var courseId = leaveInfo[0].courseId;
			var studentId = leaveInfo[0].studentId;

			//3.get course information by course id
			var courseInfo = await courseDAO.queryCourse([courseId]);
			var theme = courseInfo[0].courseName;
			var courseName = courseInfo[0].courseName;

			//4.generate common message
			var content = null;
			if(postData[1] == 1){
				content = courseName + ": 老师同意请假。";
			}else{
				content = courseName + ": 老师不同意请假。";
			}

			//5.add common message
			var addCommonMessageResult = await messageDAO.addCommonMessage([content],transactionConnection);
			var commonMessageId = addCommonMessageResult.insertId;
			
			//6.add message
			var today = moment().format("YYYY-MM-DD HH:mm");
			var date = today.split(' ')[0];
			var time = today.split(' ')[1];
			var contentId = commonMessageId;
			var contentType = 0;
			var addMessageResult = await messageDAO.addMessage([studentId,date,time,theme,contentId,contentType,0], transactionConnection);

			//7. commit transaction
			transactionConnection.commit();
			returnData.errCode = 0;
		}catch(err){
			console.log(err);
			transactionConnection.rollback();
			returnData = {errCode:1};
		}finally{
			transactionConnection.release();
			return returnData;
		}
	}
}