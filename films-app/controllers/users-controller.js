const {
    User,
    getUser,
    addUser,
    updateName,
    updateEmail,
    updatePassword,
    updateState,
    deleteUser,
    updateImage,
} = require('../models/User');

const { getMenu } = require('./helpers/getMenu');
const { getActions } = require('./helpers/getActions');
const { displayError } = require('./helpers/displayError');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserID } = require('./helpers/getUserID');

const page = 'Кабинет';

async function handlerError(res, callback) {
    try {
        callback();
    } catch (error) {
        displayError(res, error.message);
    }
}
//DONE: create register function
//DONE: create login function
exports.getUser = async(req, res) => {
    try {
        const user = await getUser(getUserID(req));

        res.render('account', {
            title: page,
            menu: getMenu(page),
            user: user,
            actions: getActions(user.isAdmin),
        });
    } catch (error) {
        displayError(res, error);
    }
};

exports.login = async(req, res, next) => {
    try {
        let token = req.session['x-access-token'];

        if (token) {
            return next();
        }
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return displayError(res, 'Пользователь не найден!');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return displayError(res, 'Неверный пароль!');
        }

        token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        req.session['x-access-token'] = token;
        res.redirect('account');

        console.log(`User ${email} logged.`);
    } catch (e) {
        return displayError(res, 'Пользователь не найден!');
    }
};

exports.register = async(req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user)
            return displayError(res, 'Пользователь с таким email зарегистрирован!');

        user = await addUser(req.body);

        const token = user.generateAuthToken();

        req.session['x-access-token'] = token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        res.redirect('/account');
    } catch (e) {
        return displayError(res, e.message, 500);
    }
};

exports.updateName = async(req, res) => {
    handlerError(res, async() => {
        await updateName(getUserID(req), req.body.name);
        res.redirect('/account');
    });
};
exports.updateImage = async(req, res) => {
    handlerError(res, async() => {
        await updateImage(getUserID(req), req.body.image);
        res.redirect('/account');
    });
};
exports.updateEmail = async(req, res) => {
    handlerError(res, async() => {
        await updateEmail(getUserID(req), req.body.password, req.body.email);
        res.redirect('/account');
    });
};
exports.updatePassword = async(req, res) => {
    handlerError(res, async() => {
        await updatePassword(
            getUserID(req),
            req.body.password,
            req.body.newPassword
        );
        res.redirect('/account');
    });
};
exports.updateState = async(req, res) => {
    handlerError(res, async() => {
        await updateState(getUserID(req), req.body.password, req.body.word);
        res.redirect('/account');
    });
};
exports.deleteUser = async(req, res) => {
    handlerError(res, async() => {
        await deleteUser(getUserID(req), req.body.password);
        delete req.session['x-access-token'];
        res.redirect('/login');
    });
};