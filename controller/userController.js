var userService = require('../service/userService');
module.exports = {
	verify: async function (req, res) {
		var param = req.body;
		var postData = [param.userId];
		try{
			var result = await userService.verify(postData);
			res.json(result);
		} catch(err){
			console.log(err);
		}
	},

	bindInformation: async function (req, res) {
		var param = req.body;
		var postData = [param.userId, param.userName, param.schoolNumber, param.school, param.identity]
		try{
			var result = await userService.bindInformation(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	},
}