const mongoose = require('mongoose');
async function configMongoDB() {
    await mongoose.connect(process.env.URI_MONGODB).then(() => {
        console.log('Kết nối database thành công!')
    }).catch(() => {
        console.log('Kết nối thất bại!')
    })
}

module.exports = {
    configMongoDB
}