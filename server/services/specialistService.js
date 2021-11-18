const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
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