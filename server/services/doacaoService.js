const Doacao = require('../data/doacaoData')

module.exports = {
    doar: async (data) => {
        return Doacao.doar(data)
    },

    comumlistar: async (id) => {
        return Doacao.comumlistar(id)
    },

    especialistalistar: async (id) => {
        return Doacao.especialistalistar(id)
    },
}