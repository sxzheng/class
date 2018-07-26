module.exports = {
	//查询用户是否注册
	selectUser: "SELECT 1 FROM user where id=? limit 1",
	insertUser: "INSERT INTO user \
				(id, name, school_number, school, identity) \
				VALUES (?, ?, ?, ?, ?)",
	queryUser: 'SELECT \
				name, \
				school_number "schoolNumber" \
				FROM user \
				WHERE id=?'
}