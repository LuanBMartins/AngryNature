const Post = require('../infra/models/postModel')


module.exports = {
    create: async (data) => {
        return Post.create(data, {raw: true})
    },

    readOne: (id) => {
        return Post.findAll({ where: { idEspecialista: id } })
    },

    read: () => {
        return Post.findAll()
    },

    update: (id, data) => {
        return Post.update(data, { where: { id } })
    },

    delete: (id) => {
        return Post.destroy({ where: { id } })
    }
}