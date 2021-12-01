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
		type: DataTypes.TEXT,
		allowNull: false,
	},

	nome: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	
    nascimento: {
        type: DataTypes.DATEONLY,
		allowNull: false,
    },

    estado: {
        type: DataTypes.STRING(100),
		allowNull: false,
    }

}, {
	tableName: 'users',
	timestamps: false,
	hooks: {
		afterCreate: (record) => {
			delete record.dataValues.senha
		},
	},
})


module.exports = user
