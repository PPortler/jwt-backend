const mongoose = require('mongoose')

exports.connectDB = () => {

    mongoose.connect(process.env.MONGO_URI, {
    })
        .then(() => {
            console.log('database connected.')
        })
        .catch(() => {
            console.log('database connect failed.')
        })
}