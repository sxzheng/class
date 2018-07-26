module.exports={
	addLeave: 'INSERT INTO excuse \
			(student_id,course_id,day,reason,state) \
			VALUES (?,?,?,?,?)',

	queryLeave: 'SELECT \
			course_id "courseId", \
			student_id "studentId" \
			FROM excuse \
			WHERE id=?',

	updateLeave: 'UPDATE excuse \
				SET state=? WHERE id=?'
}