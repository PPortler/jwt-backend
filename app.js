require('dotenv').config();
// โหลด dotenvฃ

require('./config/database').connectDB();
// เรียกใช้ฟังก์ชัน connectDB() จากไฟล์ database.js เพื่อเชื่อมต่อ MongoDB

const express = require('express');
const userApi = require('./routes/user.route')

const app = express();

app.use(express.json()); // เปิดใช้งาน middleware `express.json()` เพื่อให้ Express สามารถจัดการกับข้อมูล JSON ที่ถูกส่งมาใน request body ได้
app.use('/api/user', userApi);


module.exports = app;
// ส่งออก Express app เพื่อให้สามารถนำไปใช้ในไฟล์อื่น เช่น ไฟล์ server.js


//React
// import Cookies from 'js-cookie';
// const token = Cookies.get('token');

// fetch('https://your-api.com/endpoint', {
//     method: 'GET',
//     headers: {
//         'Authorization': `Bearer ${token}`, // ส่ง token ใน header
//     }
// })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
