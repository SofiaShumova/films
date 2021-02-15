const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    video: {
        type: String,
        required: false,
    },
});

const Film = model('films', schema);

exports.getFilm = async(id) => {
    return await Film.findById(id);
};

exports.Film = Film;