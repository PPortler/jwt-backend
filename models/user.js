const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true }, //ห้ามมีค่า email ซ้ำกันในฐานข้อมูล
    password: { type: String },
    token: { type: String },
    role: { type: String, default: "user" },
})

module.exports = mongoose.model('users', userSchema)