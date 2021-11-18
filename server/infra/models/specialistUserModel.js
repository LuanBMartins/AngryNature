const { DataTypes } = require('sequelize')
const connection = require('../database')

const specUser = connection.define('specialistUsers', {
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
        type: DataTypes.DATE,
		allowNull: false,
    },

    organizacao: {
        type: DataTypes.STRING(100),
		allowNull: false,
    },

    especialidade: {
        type: DataTypes.STRING(100),
		allowNull: false,
    }

}, {
	tableName: 'specialistUsers',
	timestamps: false,
	hooks: {
		afterCreate: (record) => {
			delete record.dataValues.senha
		},
	},
})

user.sync()

module.exports = specUser
