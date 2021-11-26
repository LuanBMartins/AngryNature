const jwt = require('jsonwebtoken')
const config = require('config')

/*
 * Authentication middleware
*/

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization

	try {
		if (!authHeader) throw new Error('Token missing')

		const token = authHeader.split(' ')[1]
		const decoded = jwt.verify(token, config.get('key.jwt'))
		req.usuario = decoded
		next()
	} catch (e) {
		next(e)
	}
}
