const userModel = require('./userModel')
const specialistModel = require('./specialistUserModel')
const phenomenon = require('./phenomenon');

(async () => {
    await userModel.sync()
    await specialistModel.sync()
    await phenomenon.sync()
})()