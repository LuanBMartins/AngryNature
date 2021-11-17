const user = require('../infra/models/userModel')

exports.saveUser = function (newUser) {
	return user.create(newUser, { raw: true })
}


exports.getUserByEmail = function (email) {
	return user.findOne({ where: { email } })
}
