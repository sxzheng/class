var leaveService = require('../service/leaveService');

module.exports = {
	addLeave: async function (req, res) {
		var param = req.body;
		var postData = [param.userId, param.courseId, param.date, param.reason];
		try{
			var result = await leaveService.addLeave(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	},

	reply: async function (req, res) {
		console.log("reply");
		var param = req.body;
		var postData = [param.leaveId, param.agree];
		try{
			var result = await leaveService.reply(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	}
}