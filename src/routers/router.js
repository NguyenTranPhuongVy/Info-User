const authAdminRouter = require('./admins/auth.router');
module.exports = function router(app) {
    app.use(authAdminRouter)
}