const { DataTypes } = require('sequelize')
const connection = require('../database')

const user = connection.define('users', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

    email: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	},

	senha: {
		type: DataTypes.STRING(20),
		allowNull: false,
	},

	nome: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	
    nascimento: {
        type: DataTypes.DATE,
		allowNull: false,
    },

    regiao: {
        type: DataTypes.STRING(100),
		allowNull: false,
    }

}, {
	tableName: 'users',
	timestamps: false,
	hooks: {
		afterCreate: (record) => {
			delete record.dataValues.password
		},
	},
})

user.sync()

module.exports = user
