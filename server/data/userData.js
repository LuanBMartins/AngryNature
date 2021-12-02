const user = require('../infra/models/userModel')

exports.saveUser = function (newUser) {
	return user.create(newUser, { raw: true })
}


exports.getUserByEmail = function (email) {
	return user.findOne({ where: { email }, raw: true })
}


exports.getUser = function (id) {
	return user.findOne({ where: { id }, raw: true })
}

exports.putUser = function (id, newData) {
	return user.update(newData, { where: { id } })
}

exports.deleteUser = function (id) {
	return user.destroy({ where: { id } })
}
