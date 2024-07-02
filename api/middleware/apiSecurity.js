const fs = require('fs');
const dotenv = require('dotenv');
const configData = fs.readFileSync('.env');
const buf = Buffer.from(configData); 
const config = dotenv.parse(buf);

const jwt = require('jsonwebtoken');

module.exports = {

    requireLogin: (req, res, next) => {
        jwt.verify(req.headers.authorization, config.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'invalid_session' })
            }
            req.user = decoded;
            next();
        });
    }

}