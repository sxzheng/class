module.exports = {
	//查询全部日程
	selectSchedule: "SELECT id as scheduleId, topic, time FROM schedule WHERE owner_id=?",

	queryTodaySchedule: 'SELECT \
				id "scheduleId", \
				theme, \
				location, \
				time, \
				detail, \
				is_inform "inform" \
				FROM schedule \
				WHERE user_id=? AND day=?',

	queryAllSchedule: 'SELECT \
				id "scheduleId", \
				theme, \
				location, \
				day "date", \
				detail, \
				is_inform "inform" \
				FROM schedule \
				WHERE user_id=?',

	insertSchedule: 'INSERT INTO schedule \
				(user_id,theme,location,day,time,detail,inform_time, is_inform) \
				VALUES (?,?,?,?,?,?,?,?)'
}