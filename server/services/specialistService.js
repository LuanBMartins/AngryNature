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
	}, config.get('kew.jwt'), {
		expiresIn: '1d',
	})

	return token
}