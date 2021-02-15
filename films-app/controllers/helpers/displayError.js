const { getMenu } = require('./getMenu');
exports.displayError = async(res, message = 'Error', status = 400) => {
    return res.status(status).render('error-users', {
        title: 'Error',
        message: message,
        menu: getMenu('none'),
    });
};