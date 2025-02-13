const express = require('express')
const Users = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
const auth_admin = require('../middleware/auth_admin');

const userRouter = express.Router()

//register
userRouter.route("/register").post(async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body

        if (!(first_name && last_name && email && password && role)) {
            return res.status(400).send("All input is required");
        }

        const checkUser = await Users.findOne({ email });

        if (checkUser) {
             return res.status(409).send("User already exits. Please login");
        }
        encryptedPassword = await bcrypt.hash(password, 10)

        const user = await Users.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: role
        })

        const token = jwt.sign(
            {
                user_id: user._id,
                email,
                role: role
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )
        user.token = token

        return res.status(201).json(user)

    } catch (err) {
        console.log(err)
    }
})

//login
userRouter.route("/login").post(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send("All input is required")
        }

        const user = await Users.findOne({ email });

        const comparePassword = await bcrypt.compare(password, user.password)

        if (user && comparePassword) {
            const token = jwt.sign(
                {
                    user_id: user._id,
                    email,
                    role: user.role
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )

            res.cookie('token', token, {
                httpOnly: true,      // ไม่ให้ JavaScript เข้าถึง cookie นี้
                secure: process.env.NODE_ENV === 'production', // ใช้เฉพาะใน HTTPS (ปลอดภัยกว่า)
                sameSite: 'Strict',  // ป้องกันการโจมตี CSRF
                maxAge: 2 * 60 * 60 * 1000  // ตั้งเวลาให้หมดอายุใน 2 ชั่วโมง
            });
            
            user.token = token
            return res.status(200).json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                token: user.token
            });
        }
        return res.status(400).send("Invalid Credentials")
    } catch (err) {
        console.log(err)
    }
})

//welcome
userRouter.route("/welcome").get(auth, (req, res) => {
    return res.status(200).send('Welcone !');
})

//welcome admin
userRouter.route("/welcome_admin").get(auth_admin, (req, res) => {
    return res.status(200).send('Welcone Admin !');
})

//view users
userRouter.route("/view").get(async (req, res) => {
    try {
        const users = await Users.find({});

        return res.status(200).json(users)
    } catch (err) {
        console.log(err)
    }
})

module.exports = userRouter