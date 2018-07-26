var app = require("express")();
var bodyParser = require('body-parser');

//static resource

//json
app.use(bodyParser.json());

//routes
app.use('/user', require('./routes/user.js'));
app.use('/course', require('./routes/course.js'));
app.use('/schedule', require('./routes/schedule.js'));
app.use('/leave', require('./routes/leave.js'));
app.use('/message', require('./routes/message.js'));
app.use('/sign', require('./routes/sign.js'));

app.listen(3000, function(){
	console.log("server on 3000");
});