const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    fullName: { type: String, require: true },
    phone: { type: String, require: true },
    isActive: { type: Boolean, default: true },
    isBin: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now() },
    dateEdited: { type: Date, default: Date.now() },
    dateLogin: { type: Date, default: Date.now() },
    isEmail: { type: Boolean, default: false }
})

module.exports = mongoose.model('Admin', adminSchema)