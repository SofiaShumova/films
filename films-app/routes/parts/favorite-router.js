const { Router } = require('express');
const {
    getList,
    toogleFilmCatalogy,
    toogleFilmFavorite,
    toogleFilmCatalogyPost,
} = require('../../controllers/favorite-controller');
const router = Router();

router.get('', getList);
// router.get('/:id', toogleFilmCatalogy);
router.post('/:id', toogleFilmCatalogyPost);
router.get('/:id/favorite', toogleFilmFavorite);

module.exports = router;