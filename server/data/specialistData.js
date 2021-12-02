const specialist = require('../infra/models/specialistUserModel')

exports.saveSpecialist = function (newUser) {
	return specialist.create(newUser, { raw: true })
}


exports.getSpecialistByEmail = function (email) {
	return specialist.findOne({ where: { email }, raw: true })
}

exports.getSpecialist = function (id) {
	return specialist.findOne({ where: { id }, raw: true })
}

exports.getSpecialists = function () {
	return specialist.findAll({raw: true })
}

exports.putSpecialist = function (id, newData) {
	return specialist.update(newData, { where: { id } })
}

exports.deleteSpecialist = function (id) {
	return specialist.destroy({ where: { id } })
}
