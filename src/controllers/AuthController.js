const apiReturnModule = require('../modules/ApiReturn.module')

const { StatusCodes } = require('http-status-codes')

const authService = require('../services/auth.service')
module.exports = class AuthController {
    static async signUp(req, res) {
        try {
            const signUp = await authService.signUp(req.query, req.body)
            if (signUp) {
                res.status(StatusCodes.CREATED).json(apiReturnModule.outputObject(false, StatusCodes.CREATED, authService.getMessage(), signUp))
            } else {
                res.status(StatusCodes.NOT_FOUND).json(apiReturnModule.outputObject(true, StatusCodes.NOT_FOUND, authService.getMessage()))
            }
        } catch (error) {
            res.status(404).json(res.status(StatusCodes.NOT_FOUND).json(apiReturnModule.outputObject(true, StatusCodes.NOT_FOUND, error.message)))
        }
    }
}