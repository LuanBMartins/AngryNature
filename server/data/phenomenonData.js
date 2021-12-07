const phenomenon = require('../infra/models/phenomenon')

module.exports = {
    create: (data) => {
        return phenomenon.create(data, { raw: true })
    },

    filter: (filter) => {
        return phenomenon.findAll({ where: filter })
    },

    read: (filter) => {
        return phenomenon.findAll()
    },

    update: (id, data) => {
        return phenomenon.update(data, { where: { id } })
    },

    remove: (id) => {
        return phenomenon.destroy({ where: { id } })
    }
}