const { Film, getFilm } = require('../models/Film');
const { getMenu } = require('./helpers/getMenu');
const { displayError } = require('./helpers/displayError');
const { getUserID } = require('./helpers/getUserID');
const { getUser } = require('../models/User');

const title = 'Избранное';
const menu = getMenu(title);

exports.getList = async(req, res) => {
    const user = await getUser(getUserID(req));
    const films = [];
    for (let i = 0; i < user.films.length; i++) {
        const idFilm = user.films[i];
        const film = await getFilm(idFilm);

        if (film == undefined) {
            user.films.splice(i, 1);
        } else {
            films.push(film);
        }
    }
    await user.save();
    res.render('favorite', { title: title, menu: menu, films: films });
};

exports.toogleFilmCatalogy = async(req, res) => {
    await toogleFilm(req);
    res.sendStatus(200).redirect('/catalogy');
};
exports.toogleFilmCatalogyPost = async(req, res) => {
    await toogleFilm(req);
};

exports.toogleFilmFavorite = async(req, res) => {
    await toogleFilm(req);
    res.redirect('/favorite');
};

async function toogleFilm(req) {
    const user = await getUser(getUserID(req));

    if (!user.films.includes(req.params.id)) {
        user.films.push(req.params.id);
    } else {
        const index = user.films.indexOf(req.params.id);
        user.films.splice(index, 1);
    }
    await user.save();
}