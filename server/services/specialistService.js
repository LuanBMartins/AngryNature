const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const specialistData = require('../data/specialistData')
const userData = require('../data/userData')
const config = require('config')

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

exports.loginSpecialist = async function (data) {
	const existingSpecialist = await specialistData.getSpecialistByEmail(data.email)
	if (!existingSpecialist) throw new Error('Autheticated failed')

	const passwordMatch = await bcrypt.compare(data.senha, existingSpecialist.senha)
	if (!passwordMatch) throw new Error('Autheticated failed')

	const token = jwt.sign({
		id_user: existingSpecialist.id,
		email: existingSpecialist.email,
		specialista: true,
	}, config.get('key.jwt'), {
		expiresIn: '1d',
	})

	return token
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

	if (Object.prototype.hasOwnProperty.call(newData, 'email')) {
		const existingUserEmail = await userData.getUserByEmail(newData.email)
		if (existingUserEmail) throw new Error('Email already exist')

		const existingSpecialist = await specialistData.getSpecialistByEmail(data.email)
    	if (existingSpecialist) throw new Error('Email already exist')
	}

	if (Object.prototype.hasOwnProperty.call(newData, 'password')) {
		const passwordHash = await bcrypt.hash(newData.password, 8)
		newData.password = passwordHash
	}

	return specialistData.putSpecialist(id, newData)
}

exports.deleteSpecialist = async function (id) {
	const existingSpecialist = await specialistData.getSpecialist(id)
	if (!existingSpecialist) throw new Error('User not found')
	
	return specialistData.deleteSpecialist(id)
}