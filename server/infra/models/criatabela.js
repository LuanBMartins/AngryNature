const userModel = require('./userModel')
const specialistModel = require('./specialistUserModel')
const phenomenon = require('./phenomenon');
const postModel = require('./postModel');

(async () => {
    await userModel.sync()
    await specialistModel.sync()
    await phenomenon.sync()
    await postModel.sync()
})()