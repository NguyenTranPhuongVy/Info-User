const passport = require('passport') // thư viện nhanh hổ trợ làm author
const localStrategy = require('passport-local').Strategy // thư viên giúp đăng nhập email, password 
const jwtStrategy = require('passport-jwt').Strategy // thư viện giúp xác thực jwt

const adminModel = require('../models/admin.model')
const {
    ExtractJwt
} = require('passport-jwt')

const {
    JWT_SECRET
} = require('../configs/jwt')

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try {
        const admin = await adminModel.findById(payload.sub)
        if (!admin) return done(null, false)
        done(null, admin)
    } catch (error) {
        done(error, false)
    }
}))

// email
passport.use(new localStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    try {
        const admin = await adminModel.findOne({
            email
        })
        if (!admin) return done(null, false)

        const isCorrectPassword = await admin.isValidPassword(password)
        if (!isCorrectPassword) return done(null, false)
        done(null, admin)
    } catch (error) {
        done(error, false)
    }
}))