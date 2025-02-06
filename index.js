const http = require('http'); 
// นำเข้าโมดูล http ของ Node.js เพื่อใช้สร้าง HTTP server

const app = require('./app'); 
// นำเข้า Express app ที่ถูกสร้างไว้ในไฟล์ app.js

const server = http.createServer(app); 
// ใช้ http.createServer() เพื่อสร้าง HTTP server และส่ง Express app เข้าไปเพื่อให้จัดการ request ได้

const port = process.env.API_PORT || 3001; 
// ใช้ค่าจากตัวแปรแวดล้อม API_PORT ถ้ามี, ถ้าไม่มีให้ใช้ค่า API_PORT (แต่ API_PORT ไม่ได้ถูกกำหนดไว้อยู่ดี)

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
// ให้เซิร์ฟเวอร์เริ่มทำงานและรอรับ request บน port ที่กำหนด
