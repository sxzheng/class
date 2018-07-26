module.exports = {
	queryMessage: 'SELECT \
				id "msgId", \
				day "date", \
				time, \
				theme, \
				contentId, \
				contentType \
				FROM message \
				WHERE user_id=?',

	queryCommonMessage: 'SELECT \
				content \
				FROM common_message \
				WHERE id=?',

	queryLeave: 'SELECT \
				excuse.id "leaveId", \
				excuse.course_id "courseId", \
				excuse.day "date", \
				excuse.reason, \
				course.name "courseName", \
				user.name "studentName", \
				user.school_number "schoolNumber" \
				FROM (excuse inner join course ON excuse.course_id=course.id) \
					inner join user ON excuse.student_id=user.id \
				WHERE excuse.id=?',

	queryNotice: 'SELECT \
				course_id "courseId", \
				course_name "courseName", \
				day "date", \
				location, \
				detail \
				FROM notice \
				WHERE id=?',

	addMessage: 'INSERT INTO message \
			(user_id,day,time,theme,contentId,contentType) \
			VALUES (?,?,?,?,?,?)',
			
	addCommonMessage: 'INSERT INTO common_message \
			(content) VALUES (?)',
	
	updateMessage: 'UPDATE message SET state=0 \
				WHERE contentId=? AND user_id=? AND contentType=3'
}