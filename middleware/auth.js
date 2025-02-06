const jwt = require('jsonwebtoken'); // นำเข้าโมดูล jsonwebtoken เพื่อใช้สร้างและตรวจสอบ JWT

const config = process.env; // โหลดค่าคอนฟิกจากตัวแปรแวดล้อม (environment variables) เช่น TOKEN_KEY

// ฟังก์ชัน verifyToken ใช้ตรวจสอบว่า request มี token ที่ถูกต้องหรือไม่
const verifyToken = (req, res, next) => {
    // ดึง token จากที่ต่างๆ เช่น body, query string หรือ headers
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // ถ้าไม่พบ token ใน request ให้ส่ง error 403 (Forbidden)
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        // ใช้ jwt.verify() เพื่อตรวจสอบและถอดรหัส token โดยใช้ TOKEN_KEY จาก environment variables
        const decoded = jwt.verify(token, config.TOKEN_KEY);

        if (decoded.role !== 'user') {
            return res.status(403).send("You do not have permission to access this resource");

        }
        req.user = decoded;
        
    } catch (err) {
        // ถ้าเกิดข้อผิดพลาด (เช่น token ไม่ถูกต้องหรือหมดอายุ) ให้ส่ง error 401 (Unauthorized)
        return res.status(401).send("Invalid Token");
    }

    // เมื่อทุกอย่างผ่านแล้ว ให้ไปยัง middleware ถัดไป
    return next();
}

module.exports = verifyToken; // ส่งออกฟังก์ชัน verifyToken ให้สามารถใช้งานในไฟล์อื่นๆ ได้
