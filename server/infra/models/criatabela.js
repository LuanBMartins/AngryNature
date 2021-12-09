const userModel = require('./userModel');
const specialistModel = require('./specialistUserModel');
const phenomenon = require('./phenomenon');
const postModel = require('./postModel');
const doacaoModel = require('./doacaoModel');

(async () => {
    await userModel.sync()
    await specialistModel.sync()
    await phenomenon.sync()
    await postModel.sync()
    await doacaoModel.sync()
})()