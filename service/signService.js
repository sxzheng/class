var signDAO = require('../dao/signDAO');
var courseDAO = require('../dao/courseDAO');
var messageDAO = require('../dao/messageDAO');
var asyncQuery = require('../utils/asyncQuery.js');
var moment = require('moment');

module.exports = {
	addSign: async function (postData) {
		//add to sign(day,course_id,course_name,start_time,end_time,location,number_signed, total)
		//courseid location duration
		var transactionConnection = null;
		var returnData = {errCode:1};
		try{
			transactionConnection = await asyncQuery.getTransactionConnection();
			//prepare data
			var now = moment().format("YYYY-MM-DD HH:mm");

			var day = now.split(" ")[0];
			var courseId = postData[0];
			var courseName = postData[1];
			var startTime = now.split(" ")[1];
			var endTime = moment(startTime,"HH:mm").add(postData[3],'hours').format("HH:mm");
			var location = postData[2];
			var numberSigned = 0;
			var allStudents = await courseDAO.queryAllStudentByCourseId([courseId]);
			var total = allStudents.length; //

			//add to sign
			var addSignResult = await signDAO.addSign([day,courseId,courseName,startTime,endTime,location,numberSigned,total], transactionConnection);

			//get sign id
			var signId = addSignResult.insertId;
			
			//add to message
			for(var i = 0; i < allStudents.length; ++i){
				var studentId = allStudents[i].studentId;
				var addMessageResult = await messageDAO.addMessage([studentId,day,startTime,courseName,signId,3], transactionConnection);
			}

			transactionConnection.commit();
			returnData.errCode = 0;
			returnData.signId = signId;
		}catch(err){
			console.log(err);
			transactionConnection.rollback();
			returnData.errCode = 1;
		}finally{
			transactionConnection.release();
			return returnData;
		}
	},

	querySign: async function (postData) {
		//query sign info by sign id
		var signResult = await signDAO.querySign(postData);
		var returnData = {};
		returnData.signedNumber = signResult[0].signedNumber;
		returnData.totalNumber = signResult[0].totalNumber;
		returnData.courseName = signResult[0].courseName;
		returnData.date = signResult[0].date;
		var endTime = signResult[0].endTime;
		var timeLeft = null;
		var hours = null, mins = null, ss = null;
		if(moment(endTime,"HH:mm").diff(moment()) > 0){
			timeLeft = moment.duration(moment(endTime,"HH:mm").diff(moment()));
			hours = timeLeft.get('hours');
			mins = timeLeft.get('minutes');
			ss = timeLeft.get('seconds');
			returnData.timeLeft = hours+":"+mins+":"+ss;
		}else{
			returnData.timeLeft = 0+":"+0+":"+0;
		}
		return returnData;
	},

	checkSign: async function (postData) {
		//query message state by sign id and student id
		var signResult = await signDAO.querySignState(postData);
		var returnData = {errCode:0};
		if(signResult[0].state == 0){
			returnData.errCode = 1;
		}
		return returnData;
	},

	signIn: async function (postData) {
		var transactionConnection = null;
		var returnData = {errCode:1};
		try{
			transactionConnection = await asyncQuery.getTransactionConnection();
			//add to course report
			//1.get course id
			var signResult = await signDAO.querySign([postData[0]]);
			var courseId = signResult[0].courseId;
			//2.get time
			var date = moment().format("YYYY-MM-DD HH:mm");
			//3.insert into course_report
			var studentId = postData[1];
			var addReportResult = await courseDAO.addCourseReport([courseId,studentId,0,date],transactionConnection);
			//update sign number_signed +1 by signId
			var updateSign = await signDAO.updateSign([postData[0]],transactionConnection);
			//update message state to 0 by content Id and studentId and contentType
			var updateMessage = await messageDAO.updateMessage(postData,transactionConnection);

			transactionConnection.commit();
			returnData.errCode = 0;
		}catch(err){
			console.log(err);
			transactionConnection.rollback();
			returnData.errCode = 1;
		}finally{
			transactionConnection.release();
			return returnData;
		}
	}
}