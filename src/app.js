const express = require('express');

require('dotenv').config();

const app = express();

const router = require('./routers/router');

const port = process.env.PORT || 3000;

router(app)

// Connect DB
require('./configs/config.mongoDB').configMongoDB()



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})