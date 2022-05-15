const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    fullName: { type: String, require: true },
    phone: { type: String, require: true },
})

module.exports = mongoose.model('Admin', adminSchema)