const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
const userData = require('../data/userData')

exports.saveUser = async function (data) {
	const existingUser = await userData.getUserByEmail(data.email)
	if (existingUser) throw new Error('User already exist')

	const newUser = data
	const passwordHash = await bcrypt.hash(newUser.senha, 8)
	newUser.senha = passwordHash

	return userData.saveUser(newUser)
}