const { DataTypes } = require('sequelize')
const connection = require('../database')

const doacao = connection.define('doacao', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

    nome: {
		type: DataTypes.STRING(100),
		allowNull: false
	},

    email: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},

	data: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},

    valor: {
        type: DataTypes.FLOAT,
		allowNull: false,
    },

    ong: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},

    idEspecialista: {
        type: DataTypes.INTEGER,
		allowNull: true,
        references: {
            model: require('./specialistUserModel'),
            key: 'id'
        }
        
    },

	idUser: {
        type: DataTypes.INTEGER,
		allowNull: true,
        references: {
            model: require('./userModel'),
            key: 'id'
        }
    }

}, {
	tableName: 'doacao',
	timestamps: false,
})



module.exports = doacao
