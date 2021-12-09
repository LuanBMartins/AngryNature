const { DataTypes } = require('sequelize')
const connection = require('../database')

const posts = connection.define('posts', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

    autor: {
		type: DataTypes.STRING(100),
		allowNull: false
	},

	data: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},

	texto: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	
    arquivo: {
        type: DataTypes.STRING(200),
		allowNull: true,
    },
    idEspecialista: {
        type: DataTypes.INTEGER,
		allowNull: false,
        references: {
            model: require('./specialistUserModel'),
            key: 'id'
        }
        
    },

}, {
	tableName: 'posts',
	timestamps: false,
})



module.exports = posts
