const Doacao = require('../infra/models/doacaoModel')

module.exports = {
    doar: async (data) => {
        return Doacao.create(data)
    },

    comumlistar: async (id) => {
        return Doacao.findAll({ where: { idUser: id } })
    },
    
    especialistalistar: async (id) => {
        return Doacao.findAll({ where: { idEspecialista: id } })
    },
}