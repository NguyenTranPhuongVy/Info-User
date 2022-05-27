var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/jwt')
module.exports = class TokenService {
    static async endCodeToken(adminID) {
        return jwt.sign({
            sub: adminID,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 3)
        }, JWT_SECRET)
    }
}