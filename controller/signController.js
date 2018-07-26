var signService = require('../service/signService');
module.exports = {
	addSign: async function (req, res) {
		var param = req.body;
		var postData = [param.courseId, param.courseName, param.location, param.duration];
		try{
			var result = await signService.addSign(postData);
			console.log(result);
			res.json(result);
		}catch(err){
			console.log(err);
		}
	},

	querySign: async function (req, res) {
		var param = req.body;
		var postData = [param.signId];
		try{
			var result = await signService.querySign(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		} 
	},

	checkSign: async function (req, res) {
		var param = req.body;
		var postData = [param.signId, param.userId];
		try{
			var result = await signService.checkSign(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		} 
	},

	signIn: async function (req, res) {
		var param = req.body;
		var postData = [param.signId, param.userId];
		try{
			var result = await signService.signIn(postData);
			res.json(result);
		}catch(err){
			console.log(err);
		} 
	},
}