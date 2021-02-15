const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.session['x-access-token'];

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    }
    next();
};