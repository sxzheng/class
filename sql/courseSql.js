module.exports = {
	queryCourse: 'SELECT \
				c.id "courseId", \
				c.name "courseName", \
				c.image_url "courseImageUrl", \
				c.week_day "weekDay", \
				c.time "courseTime", \
				c.start_date "courseStartDate", \
				c.end_date "courseEndDate", \
				c.total_period "courseTotalPeriods", \
				c.location "courseLocation", \
				u.id "teacherId", \
				u.name "teacherName" \
				FROM (course AS c inner join create_course ON c.id=create_course.course_id) \
					inner join user AS u ON create_course.teacher_id=u.id \
				WHERE c.id=?',

	queryCourseByTeacher: 'SELECT \
				name "courseName", \
				week_day "weekDay", \
				start_date "courseStartDate", \
				end_date "courseEndDate", \
				total_period "sumPeriods" \
				FROM course WHERE id=?',

	queryCourseByUserId: 'SELECT \
				c.id "courseId", \
				c.name "courseName", \
				c.image_url "courseImageUrl", \
				c.week_day "weekDay", \
				c.time "courseTime", \
				c.start_date "courseStartDate", \
				c.end_date "courseEndDate", \
				c.total_period "courseTotalPeriods", \
				c.location "courseLocation", \
				u.id "teacherId", \
				u.name "teacherName" \
				FROM ((course AS c inner join create_course ON c.id=create_course.course_id) \
					inner join choose_course ON c.id=choose_course.course_id) \
					inner join user AS u ON (create_course.teacher_id=u.id) \
				WHERE create_course.teacher_id=? OR choose_course.student_id=?',

	queryCourseInfo: 'SELECT \
				id "courseId", \
				name "courseName", \
				image_url "courseImageUrl", \
				week_day "weekDay", \
				time, \
				start_date "courseStartDate", \
				end_date "courseEndDate", \
				total_period "sumPeriods", \
				location "courseLocation" \
				FROM course \
				WHERE id=?',

	insertCourse: 'INSERT INTO course \
				(name, image_url, week_day, time, start_date, end_date, total_period, location) \
				VALUES (?, ?, ?, ?, ?, ?, ?, ?)',

	insertCreateCourse: 'INSERT INTO create_course \
				(teacher_id,course_id) \
				VALUES (?, ?)',


	insertChooseCourse: 'INSERT INTO choose_course \
				(student_id, course_id) \
				VALUES (?, ?)',

	insertCourseReport: 'INSERT INTO course_report \
				(course_id, student_id, state, time) \
				VALUES (?,?,?,?)',
	
	queryCourseReport: 'SELECT state, time \
				FROM course_report \
				WHERE student_id=? AND course_id=?',

	queryAllCourseReports: 'SELECT \
					u.id "studentId", \
					u.name "studentName", \
					u.school_number "studentNumber", \
					cp.state "state", \
					cp.time "time" \
					FROM (user As u inner join choose_course ON choose_course.student_id=u.id) \
					inner join course_report AS cp ON (cp.course_id=choose_course.course_id AND cp.student_id=choose_course.student_id) \
					WHERE choose_course.course_id=?',

	queryFileList: 'SELECT \
					id "fileId", \
					name "fileName", \
					type "fileType", \
					url "fileUrl", \
					detail "fileDetail", \
					time \
					FROM course_file \
					WHERE course_id=?',

	queryAllStudentByCourseId: 'SELECT \
					student_id "studentId" \
					FROM choose_course \
					WHERE course_id=?',
	
	insertNotice: 'INSERT INTO notice (course_id,course_name,day,location,detail) VALUES (?,?,?,?,?)'
	
}