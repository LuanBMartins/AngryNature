module.exports = class httpError extends Error {
    constructor(status, message){
        super(message)
        this.status = status
    }
}