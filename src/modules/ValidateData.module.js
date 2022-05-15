const adminModel = require('../models/admin.model')

const MESSENGER = {
    EXISTING: 'đã tồn tại!',
}

module.exports.exist_email_admin = async(email) => {

    const findEmail = await adminModel.findOne({
        email
    })

    if (findEmail) {
        return {
            error: true,
            message: `Email ${MESSENGER.EXISTING}!`
        }
    }

    return {
        error: false
    }
}