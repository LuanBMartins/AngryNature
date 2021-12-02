const jwt = require('jsonwebtoken')
const config = require('config')

/*
 * Pega os dados do token
*/

// precisa usar a mesma key presente no default.json
module.exports = (token) => {
	const decoded = jwt.verify(token, config.get('key.jwt'))
	return decoded
}
