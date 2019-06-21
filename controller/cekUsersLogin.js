const jwt = require('jsonwebtoken');
const config = require('../config/config');
exports.checkToken = (req) => {
    const token = req.headers['token'];
    if (token) {

        try {
            var decoded = jwt.verify(token, config.secret);
            return decoded.message// === req.params.id;
        } catch(err) {
            return false;
        }

    } else {

        return false;
    }
};
