const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);

        // เอาไว้เผื่อทำการ check role
        if (decoded.role !== 'admin') {
            return res.status(403).send("You do not have permission to access this resource");
        }

        // เก็บข้อมูลที่ถูกถอดรหัสจาก token ลงใน req.user เพื่อให้สามารถใช้ใน middleware อื่นๆ ได้
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken; 
