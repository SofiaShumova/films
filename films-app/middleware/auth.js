const jwt = require('jsonwebtoken');
const { getMenu } = require('../controllers/helpers/getMenu');

module.exports = function(req, res, next) {
    const token = req.session['x-access-token'];

    if (!token) {
        res.render('login', { title: 'Вход', menu: getMenu('Кабинет') });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res
            .status(400)
            .render('error-users', { title: 'Error', message: 'Invalid token.' });
    }
};