const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userData = require('../data/userData')
const config = require('config')


exports.saveUser = async function (data) {
	const existingUser = await userData.getUserByEmail(data.email)
	if (existingUser) throw new Error('User already exist')

	const newUser = data
	const passwordHash = await bcrypt.hash(newUser.senha, 8)
	newUser.senha = passwordHash

	return userData.saveUser(newUser)
}


exports.loginUser = async function (data) {
	const existingUser = await userData.getUserByEmail(data.email)
	if (!existingUser) throw new Error('Autheticated failed')

	const passwordMatch = await bcrypt.compare(data.senha, existingUser.senha)
	if (!passwordMatch) throw new Error('Autheticated failed')

	const token = jwt.sign({
		id_user: existingUser.id,
		email: existingUser.email,
	}, config.get('key.jwt'), {
		expiresIn: '1d',
	})

	return token
}

exports.getUser = async function (id) {
	const user = await userData.getUser(id)
	if (!user) throw new Error('User not found')

	delete user.senha

	return user
}
