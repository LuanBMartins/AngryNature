const bcrypt = require('bcrypt')
const specialistData = require('../data/specialistData')
const userData = require('../data/userData')

exports.saveSpecialist = async function (data) {

    // check if email already exists
	const existingUser = await userData.getUserByEmail(data.email)
	if (existingUser) throw new Error('User already exist')

    const existingSpecialist = await specialistData.getSpecialistByEmail(data.email)
    if (existingSpecialist) throw new Error('User already exist')

	const newUser = data
	const passwordHash = await bcrypt.hash(newUser.senha, 8)
	newUser.senha = passwordHash

	return specialistData.saveSpecialist(newUser)
}

exports.getSpecialists = async function () {
	specialists = await specialistData.getSpecialists()
	specialists.forEach(specialist => {
		delete specialist.id
		delete specialist.senha
	});
	return specialists
}

exports.getSpecialist = async function (id) {
	const specialist = await specialistData.getSpecialist(id)
	if (!specialist) throw new Error('User not found')

	delete specialist.senha
	return specialist
}

exports.putSpecialist = async function (id, newData) {
	const existingSpecialist = await specialistData.getSpecialist(id)
	if (!existingSpecialist) throw new Error('User not found')

	const filters = ['email', 'senha', 'nome', 'nascimento', 'estado', 'cidade', 'organizacao', 'especialidade']
    const validFilters = {}

    // Analisando quais filtros foram informados
    filters.forEach(filter => {
        newData[filter] != null && newData[filter] != '' ? validFilters[filter] = newData[filter] : false
    })

	if (Object.prototype.hasOwnProperty.call(validFilters, 'email')) {
		const existingUserEmail = await userData.getUserByEmail(validFilters.email)
		if (existingUserEmail) throw new Error('Email already exist')

		const existingSpecialist = await specialistData.getSpecialistByEmail(validFilters.email)
    	if (existingSpecialist) throw new Error('Email already exist')
	}

	if (Object.prototype.hasOwnProperty.call(validFilters, 'senha')) {
		const passwordHash = await bcrypt.hash(validFilters.senha, 8)
		validFilters.senha = passwordHash
	}

	return specialistData.putSpecialist(id, validFilters)
}

exports.deleteSpecialist = async function (id) {
	const existingSpecialist = await specialistData.getSpecialist(id)
	if (!existingSpecialist) throw new Error('User not found')
	
	return specialistData.deleteSpecialist(id)
}