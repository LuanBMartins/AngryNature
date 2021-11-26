const specialist = require('../infra/models/specialistUserModel')

exports.saveSpecialist = function (newUser) {
	return specialist.create(newUser, { raw: true })
}


exports.getSpecialistByEmail = function (email) {
	return specialist.findOne({ where: { email } })
}

exports.getSpecialist = function (id) {
	return specialist.findOne({ where: { id }, raw: true })
}
