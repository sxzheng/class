var userDAO = require('../dao/userDAO');

module.exports = {
	//verify
	verify: async function (postData) {
		//查询数据
		var result = await userDAO.verify(postData);
		var returnData = {errCode: 1}
		if(result.length != 0){
			returnData.errCode = 0
		}
		return returnData;
	},

	bindInformation: async function (postData) {
		//插入用户数据
		var result = await userDAO.insertUser(postData);
		var returnData = {errCode: 0}
		console.log(result)
		return returnData;
	}
}