module.exports = {
	addSign: 'INSERT INTO sign \
		(day,course_id,course_name,start_time,end_time,location,number_signed,total) VALUES \
		(?,?,?,?,?,?,?,?)',
	querySign: 'SELECT \
		id "signId", \
		number_signed "signedNumber", \
		total "totalNumber", \
		course_name "courseName", \
		day "date", \
		end_time "endTime" \
		FROM sign \
		WHERE id=?',

	querySignState: 'SELECT state FROM message \
				WHERE contentId=? AND user_id=? AND contentType=3',

	updateSign: 'UPDATE sign SET number_signed=number_signed+1 \
				WHERE id=?',

	updateMessage: 'UPDATE message SET state=0 \
				WHERE contentId=? AND user_id=? AND contentType=3'
}