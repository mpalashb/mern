const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        jwt.verify(token, config.get('jwSecret'), (error, decode) => {
            if (error) {
                res.status(401).json({ msg: 'Token is not valid!' })
            } else {
                req.user = decode.user
                next()
            }
        })
    } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
}