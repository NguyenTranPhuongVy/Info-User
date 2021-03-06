var crypto = require("crypto");
const bcrypt = require('bcryptjs');

const keyModule = require('../modules/KEY.module')
const messengerModule = require('../modules/Messenger.module')
const validateModule = require('../modules/Validate.module')
const validateData = require('../modules/ValidateData.module')

const KEY = keyModule.KEY_API.AUTH

const tokenService = require('../services/token.service')

const adminModel = require('../models/admin.model');

module.exports = class AuthService {
    static async signUp(query, body) {

        const { key } = query

        const { password } = body
        //* validate
        if (key != KEY) {
            this.setMessage(messengerModule.NOT_KEY)
            return false
        }

        if (!body) {
            this.setMessage(messengerModule.NULL_BODY)
            return false
        }

        const isValid = await this.IsValid(body)
        if (!isValid) {
            return false
        }

        const salt = await bcrypt.genSalt(10)
        const passwordHashed = await bcrypt.hash(password, salt)

        body.password = passwordHashed
        const admin = await adminModel.create(body)

        this.setMessage(messengerModule.OK_CREATE)
        return admin
    }


    static async signIn(user) {

        const token = await tokenService.endCodeToken(user._id)
        this.setMessage(messengerModule.OK_CREATE)
        return { token }
    }

    static async secret(user) {

        this.setMessage(messengerModule.OK_DATA)
        return user
    }

    static async IsValid(auth) {
        const { email, password, confirmPassword, phone, fullName } = auth
        const require_Email = validateModule.check_requiter(email, 'Email')
        if (require_Email.error) {
            this.setMessage(require_Email.message)
            return false
        }
        const check_Email = validateModule.check_email(email)
        if (check_Email.error) {
            this.setMessage(check_Email.message)
            return false
        }

        const exist_Email = await validateData.exist_email_admin(email)
        if (exist_Email.error) {
            this.setMessage(exist_Email.message)
            return false
        }

        const require_Password = validateModule.check_requiter(password, 'M???t kh???u')
        if (require_Password.error) {
            this.setMessage(require_Password.message)
            return false
        }

        const check_Length_min_max_password = validateModule.check_length_min_max_string(password.length, '8', '250', 'M???t kh???u ph???i', 'k?? t???')
        if (check_Length_min_max_password.error) {
            this.setMessage(check_Length_min_max_password.message)
            return false
        }

        const require_confirmPassword = validateModule.check_requiter(confirmPassword, 'X??c nh???n m???t kh???u')
        if (require_confirmPassword.error) {
            this.setMessage(require_confirmPassword.message)
            return false
        }

        const check_Length_min_max_confirmPassword = validateModule.check_length_min_max_string(confirmPassword.length, '8', '250', 'M???t kh???u x??c nh???n ph???i', 'k?? t???')
        if (check_Length_min_max_confirmPassword.error) {
            this.setMessage(check_Length_min_max_confirmPassword.message)
            return false
        }

        if (password != confirmPassword) {
            this.setMessage(messengerModule.CHECK_CONFIRMPASSWORD)
            return false
        }

        const require_Phone = validateModule.check_requiter(phone, 'S??? ??i???n tho???i')
        if (require_Phone.error) {
            this.setMessage(require_Phone.message)
            return false
        }

        const check_Phone = validateModule.check_phone_vn(phone)
        if (check_Phone.error) {
            this.setMessage(check_Phone.message)
            return false
        }

        const require_Fullname = validateModule.check_requiter(fullName, 'H??? v?? t??n')
        if (require_Fullname.error) {
            this.setMessage(require_Fullname.message)
            return false
        }

        const check_Length_min_max_Fullname = validateModule.check_length_min_max_string(fullName.length, '5', '255', 'H??? v?? t??n ph???i', 'k?? t???')
        if (check_Length_min_max_Fullname.error) {
            this.setMessage(check_Length_min_max_Fullname.message)
            return false
        }

        return true
    }

    static getMessage() {
        return this.message
    }

    static setMessage(message) {
        this.message = message
    }
}