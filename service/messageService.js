var messageDAO = require('../dao/messageDAO');
var signDAO = require('../dao/signDAO');
// var messageHandler = require('../handler/scheduleHandler');
var moment = require('moment');

module.exports = {
	queryMessageByTeacher: async function (postData){
		var result = await messageDAO.queryMessage(postData);
		var commonMsgList = [];
		var leaveList = [];
		for(var i = 0; i < result.length; ++i){
			var data = {};
			data.msgId = result[i].msgId;
			data.date = result[i].date;
			data.time = result[i].time;
			data.theme = result[i].theme;
			var contentId = result[i].contentId;
			var contentType = result[i].contentType;
			if(contentType == 0){
				//commonMsg 0
				var commonMsgResult = await messageDAO.queryCommonMessage([contentId]);
				data.msgContent = commonMsgResult[0].content;
				commonMsgList.push(data);
			}else if(contentType == 1){
				//leave 1
				var leaveResult = await messageDAO.queryLeave([contentId]);
				data.msgContent = {};
				data.msgContent.leaveId = leaveResult[0].leaveId;
				data.msgContent.courseId = leaveResult[0].courseId;
				data.msgContent.courseName = leaveResult[0].courseName;
				data.msgContent.date = leaveResult[0].date;
				data.msgContent.studentName = leaveResult[0].studentName;
				data.msgContent.schoolNumber = leaveResult[0].schoolNumber;
				data.msgContent.reason = leaveResult[0].reason;
				leaveList.push(data);
			}	
		}
		var returnData = {};
		returnData.commonMsgList = commonMsgList;
		returnData.leaveList = leaveList;
		return returnData;
	},

	queryMessageByStudent: async function (postData){
		var result = await messageDAO.queryMessage(postData);
		var signMsg = {};
		var commonMsgList = [];
		var noticeList = [];
		for(var i = 0; i < result.length; ++i){
			var data = {};
			data.msgId = result[i].msgId;
			data.date = result[i].date;
			data.time = result[i].time;
			data.theme = result[i].theme;
			var contentId = result[i].contentId;
			var contentType = result[i].contentType;
			if(contentType == 0){
				//commonMsg
				var commonMsgResult = await messageDAO.queryCommonMessage([contentId]);
				data.msgContent = commonMsgResult[0].content;
				commonMsgList.push(data);
			}else if(contentType == 2){
				//notice
				var noticeResult = await messageDAO.queryNotice([contentId]);
				var notice = {};
				notice.courseId = noticeResult[0].courseId;
				notice.courseName = noticeResult[0].courseName;
				notice.date = noticeResult[0].date;
				notice.location = noticeResult[0].location;
				notice.detail = noticeResult[0].detail;
				noticeList.push(notice);
			}else if(contentType == 3){
				var today = moment().format("YYYY-MM-DD");
				//sign
				var signResult = await signDAO.querySign([contentId]);
				if(signResult[0].date == today){
					signMsg.signId = signResult[0].signId;
					signMsg.courseName = signResult[0].courseName;
				}
			}
		}
		var returnData = {};
		returnData.signMsg = signMsg;
		returnData.commonMsgList = commonMsgList;
		returnData.noticeList = noticeList;
		return returnData;
	}
}