var messageService = require('../service/messageService');

module.exports = {
	queryMessageByTeacher: async function (req, res) {
		var param = req.body;
		var postData = [param.userId];
		try{
			var result = await messageService.queryMessageByTeacher(postData);
			res.json(result);
		} catch(err){
			console.log(err);
		}
	},

	queryMessageByStudent: async function (req, res) {
		var param = req.body;
		var postData = [param.userId];
		try{
			var result = await messageService.queryMessageByStudent(postData);
			res.json(result);
		} catch(err){
			console.log(err);
		}
	}
}