const authService = require('../services/auth.service')
module.exports = class AuthController {
    static async signUp(req, res) {
        const signUp = await authService.signUp(req.query, req.body)
        res.status(202).json({
            data: signUp
        })
    }
}