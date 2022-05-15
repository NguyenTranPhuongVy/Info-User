const apiReturnModule = require('../modules/ApiReturn.module')

const StatusCode = require('http-status-codes')

const authService = require('../services/auth.service')
module.exports = class AuthController {
    static async signUp(req, res) {
        try {
            const signUp = await authService.signUp(req.query, req.body)
            if (signUp) {
                res.status(StatusCode.CREATED).json(apiReturnModule.outputObject(false, StatusCode.CREATED, authService.getMessage(), signUp))
            } else {
                res.status(404).json(res.status(StatusCode.NOT_FOUND).json(apiReturnModule.outputObject(true, StatusCode.NOT_FOUND, authService.getMessage(), signUp)))
            }
        } catch (error) {
            res.status(404).json(res.status(StatusCode.NOT_FOUND).json(apiReturnModule.outputObject(true, StatusCode.NOT_FOUND, error.message)))
        }
    }
}