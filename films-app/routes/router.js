const { Router } = require('express');
const router = Router();

const userRouter = require('./parts/account-router');
const favoriteRouter = require('./parts/favorite-router');

const {
    getCatalogy,
    addFilm,
    getFilm,
    showAddFilm,
    showRemoveFilm,
    removeFilm,
} = require('../controllers/films-controller');

const { register, login } = require('../controllers/users-controller');

const auth = require('../middleware/auth');
const { getMenu } = require('../controllers/helpers/getMenu');
const checkAuth = require('../middleware/checkAuth');

router.get('/', async(req, res) => {
    res.render('index', { title: 'Главная' });
});

router.get('/catalogy', checkAuth, getCatalogy);
router.get('/catalogy/:id', checkAuth, getFilm);

router.use('/account', auth, userRouter);
router.use('/favorite', auth, favoriteRouter);

router.post('/login', login);
router.get('/login', auth, async(req, res) => {
    res.redirect('account');
});

router.post('/register', register);

router.get('/register', async(req, res) => {
    res.render('register', { title: 'Регистрация', menu: getMenu('Кабинет') });
});

router.post('/film', auth, addFilm);
router.get('/film', auth, showAddFilm);

router.post('/remove', auth, removeFilm);
router.get('/remove', auth, showRemoveFilm);

// router.post('/film_remove', addFilmUrl);
// router.get('/film_remove', async(req, res) => {
//     res.render('filmFormUrl', { title: 'Добавить фильм', menu: getMenu() });
// });

module.exports = router;

//DONE: загрузка фото в профиль (смена или загрузка первой)
//TODO: отметка избранных фильмов
//TODO: кнопка избранное в каталоге
//TODO: модальные окна? или как обработать пометку избранного
//DONE: смена емейла? пароля?
//TODO: favorite button on page film
//TODO: ? обновлять звездночки через фетч?
//TODO: о сервисе сверстать
//DONE: добавление и удаление фильмов у админа
//TODO: стили кнопок в кабинете