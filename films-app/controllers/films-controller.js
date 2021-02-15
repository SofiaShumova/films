const { Film } = require('../models/Film');
const { getUser } = require('../models/User');
const { displayError } = require('./helpers/displayError');
const { getData } = require('./helpers/getData');
const { getMenu } = require('./helpers/getMenu');
const { getUserID } = require('./helpers/getUserID');

exports.getCatalogy = async(req, res) => {
    const films = await Film.find({});

    if (req.user) {
        const user = await getUser(getUserID(req));
        const userFilms = user.films;
        if (userFilms.length > -1) {
            films.forEach((item) => {
                item.favorite = userFilms.includes(item.id);
            });
        }
    }

    res.render('catalogy', {
        title: 'Каталог',
        menu: getMenu(),
        films: films,
    });
};
exports.showAddFilm = async(req, res) => {
    const user = await getUser(getUserID(req));

    if (!user.isAdmin) {
        displayError(req, 'Вы не имеете прав для редактирования каталога!');
    }

    res.render('filmFormUrl', { title: 'Добавить фильм', menu: getMenu() });
};
exports.addFilm = async(req, res) => {
    const user = await getUser(getUserID(req));

    if (!user.isAdmin) {
        displayError(req, 'Вы не имеете прав для редактирования каталога!');
    }

    const data = req.body;
    data.image = await getData(req.body.image);
    data.image = 'data:image/jpeg;base64,' + data.image;
    const film = new Film(data);
    await film.save();

    res.redirect('film');
};

exports.getFilm = async(req, res) => {
    const film = await Film.findById(req.params.id);

    if (req.user) {
        const user = await getUser(getUserID(req));
        film.favorite = user.films.includes(film._id);
    }

    res.render('film', {
        title: 'Каталог',
        menu: getMenu(),
        film: film,
    });
};

exports.removeFilm = async(req, res) => {
    const user = await getUser(getUserID(req));

    if (!user.isAdmin) {
        displayError(req, 'Вы не имеете прав для редактирования каталога!');
    }
    await Film.findByIdAndDelete(req.body.film);
    const films = await Film.find({});

    res.render('remove', {
        title: 'Удаление фильма',
        actionTitle: 'Удаление фильма: ',
        menu: getMenu(),
        films: films,
    });
};
exports.showRemoveFilm = async(req, res) => {
    const user = await getUser(getUserID(req));

    if (!user.isAdmin) {
        displayError(req, 'Вы не имеете прав для редактирования каталога!');
    }
    const films = await Film.find({});
    res.render('remove', {
        title: 'Удаление фильма',
        actionTitle: 'Удаление фильма: ',
        menu: getMenu(),
        films: films,
    });
};