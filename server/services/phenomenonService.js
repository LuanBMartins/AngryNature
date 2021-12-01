const phenomenon = require('../data/phenomenonData')
const error = require('../utils/error')

module.exports = {
    create: (data) => {
        return phenomenon.create(data)
    },

    filter: (filter) => {
        const validFields = ['tipo', 'estado']
        const validFilter = {}
        validFields.forEach(item => {
            !filter[item] ? false : validFilter[item] = filter[item]
        })

        if(Object.keys(validFilter).length >= 1){
            return phenomenon.filter(validFilter)
        }else{
            throw new error(404, 'Filtros indefinidos!')
        }

    },

    filterForUser: (user, id) => {
        if(!user || !id){
            throw new error(404, 'Filtros indefinidos!')
        }

        if(user != 'comum' && user != 'especialista'){
            throw new error(404, 'Parâmetros incorretos!')
        }
        
        const filterId = user === 'comum' ? 'idUser' : 'idEspecialista'
        const validFilter = { [filterId]: parseInt(id) }
        return phenomenon.filter(validFilter)
    },

    update: (id, data) => {
        if(!id || !data){
            throw new error(404, 'Filtros indefinidos!')
        }

        return phenomenon.update(id, data)
    },

    remove: (id) => {
        if(!id){
            throw new error(404, 'Filtro indefinido!')
        }

        return phenomenon.remove(id)
    }
}