const { Router } = require('express');
const router = Router();

const {
    getUser,
    updateState,
    deleteUser,
    updateImage,
} = require('../../controllers/users-controller');

const { getMenu } = require('../../controllers/helpers/getMenu');
const { getAction, getInput } = require('../../controllers/helpers/getActions');
const {
    updateName,
    updateEmail,
    updatePassword,
} = require('../../controllers/users-controller');

const menu = getMenu('Кабинет');
const title = 'Настройка аккаунта';

router.get('', getUser);

router.post('/username', updateName);
router.get('/username', async(req, res) => {
    res.render(getView(), {
        title: title,
        menu: menu,
        action: getAction('Сменить имя пользователя:', '/username', [
            getInput('name', 'Введите новое имя пользователя:'),
        ]),
    });
});

router.post('/email', updateEmail);
router.get('/email', async(req, res) => {
    res.render(getView(), {
        title: title,
        menu: menu,
        action: getAction('Сменить email пользователя:', '/email', [
            getInput('email', 'Введите новый email пользователя:'),
            getInput('password', 'Введите пароль:', 'password'),
        ]),
    });
});

router.post('/password', updatePassword);
router.get('/password', async(req, res) => {
    res.render(getView(), {
        title: title,
        menu: menu,
        action: getAction('Сменить пароль пользователя:', '/password', [
            getInput('newPassword', 'Введите новый пароль:', 'password'),
            getInput('password', 'Введите старый пароль:', 'password'),
        ]),
    });
});
router.post('/admin', updateState);
router.get('/admin', async(req, res) => {
    res.render(getView(), {
        title: title,
        menu: menu,
        action: getAction('Сменить статус:', '/admin', [
            getInput('word', 'Введите кодовое слово:', 'password'),
            getInput('password', 'Введите пароль:', 'password'),
        ]),
    });
});
router.post('/delete', deleteUser);
router.get('/delete', async(req, res) => {
    res.render(getView(), {
        title: title,
        menu: menu,
        action: getAction('Удаление аккаунта:', '/delete', [
            getInput('password', 'Введите пароль:', 'password'),
        ]),
    });
});

router.post('/image', updateImage);
router.get('/image', async(req, res) => {
    res.render(getView(), {
        title: title,
        menu: menu,
        action: getAction(
            'Сменить фото:',
            '/image', [getInput('image', 'Загрузить фото', 'file')],
            'changeImage'
        ),
    });
});

router.get('/logout', async(req, res) => {
    delete req.session['x-access-token'];
    res.redirect('/login');
});

function getView(name = 'change') {
    return 'user-actions/' + name;
}
module.exports = router;