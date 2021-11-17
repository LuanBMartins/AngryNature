// Error handler middleware
module.exports = (error, req, res, next) => {
	if (error.message === 'User already exist') return res.status(409).send(error.message)
	if (error.message === 'User not found') return res.status(404).json(error.message)
	if (error.message === 'Email already exist') return res.status(409).send(error.message)
	if (error.message === 'Autheticated failed') return res.status(401).send(error.message)
	if (error.message === 'Unauthorized') return res.status(401).send(error.message)
	if (error.message === 'invalid token') return res.status(401).send(error.message)
	if (error.message === 'Token missing') return res.status(401).send(error.message)
	if (error.message === 'Book not found') return res.status(404).json(error.message)
	if (error.message === 'Book already exist') return res.status(409).send(error.message)
	if (error.message === 'Review not found') return res.status(404).json(error.message)
	if (error.message === 'Reviews not found') return res.status(404).json(error.message)

	return res.status(500).send(error.message)
}
