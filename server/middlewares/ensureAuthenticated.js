const jwt = require('jsonwebtoken')

/*
 * Authentication middleware
*/

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization

	try {
		if (!authHeader) throw new Error('Token missing')

		const token = authHeader.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_KEY)
		req.usuario = decoded
		next()
	} catch (e) {
		next(e)
	}
}
