const Post = require('../data/postData')
const error = require('../utils/error')

module.exports = {
    create: async (data) => {
        return Post.create(data)
    },

    readOne: async (id) => {
        if(!id){
            throw new error(404, 'Filtros indefinidos!')
        }
        return Post.readOne(id)
    },

    read: async () => {
        return Post.read()
    },

    update: async (id, data) => {
        if(!id || !data){
            throw new error(404, 'Filtros indefinidos!')
        }
        return Post.update(id, data)
    },

    delete: async (id) => {
        return Post.delete(id)
    }

}