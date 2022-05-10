const keyModule = require('../modules/KEY.module')

const KEY = keyModule.KEY_API.AUTH

module.exports = class AuthService {
    static async signUp(query, body) {

        const { key } = query
        //* validate
        if (key != KEY) {
            return { message: 'Sai key api!' }
        }
        return body
    }

    static async IsValid(auth) {
        return true
    }

    static getMessage() {
        return this.message;
    }

    static setMessage(message) {
        this.message = message;
    }
}