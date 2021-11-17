const config = require('config')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
	config.get('postgres.bd'),
	config.get('postgres.usuario'),
	config.get('postgres.senha'),
	{
		host: 'localhost',
		dialect: 'postgres',
		logging: false,
	},
)

sequelize.authenticate().then(() => {
    console.log('Conexão com banco estabelecida com sucesso!');
});

module.exports = sequelize


