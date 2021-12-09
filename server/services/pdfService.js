const Fenomeno = require('../data/phenomenonData')
const template = require('../utils/template')

module.exports = {
    pdf: async () => {
        let data = {}
        const array = await Fenomeno.read()
        array.forEach(item => {
            if(!data[item.estado]){
                const obj = {
                    [item.estado]: {
                        estado: item.estado,
                        total: 1,
                        [item.tipo]: 1
                    }
                }

                data = {
                    ...data,
                    ...obj
                }
            }else {
                data[item.estado].total = data[item.estado].total + 1
                data[item.estado][item.tipo] = !data[item.estado][item.tipo] ? 1 : data[item.estado][item.tipo] + 1
            }
        });

        return template(data)
    }
}