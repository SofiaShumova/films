// const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const { string } = require('joi');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    image: {
        type: String,
        required: false,
    },
    isAdmin: { type: Boolean, required: true },
    films: [{ type: mongoose.Types.ObjectId, ref: 'films' }],
});

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET); //get the private key from the config file -> environment variable
    return token;
};

const User = mongoose.model('users', UserSchema);

exports.User = User;
exports.getUser = async(id) => {
    const user = await User.findById(id);
    return user;
};
exports.addUser = async(doc) => {
    const user = new User(doc);
    user.isAdmin = false;
    user.films = [];
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    return user;
};

exports.updateName = async(id, newName) => {
    const user = await User.findById(id);
    user.name = newName;
    await user.save();
};
exports.updateImage = async(id, image) => {
    const user = await User.findById(id);
    user.image = image;
    await user.save();
};
exports.updateEmail = async(id, password, newEmail) => {
    const user = await User.findById(id);
    const pass = await checkPassword(password, user.password);

    if (pass) {
        user.email = newEmail;
        await user.save();
        return;
    }

    throw new Error('Неверный пароль!');
};

exports.updatePassword = async(id, password, newPassword) => {
    const user = await User.findById(id);
    const pass = await checkPassword(password, user.password);

    if (pass) {
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return;
    }

    throw new Error('Неверный пароль!');
};

exports.updateState = async(id, password, word) => {
    const user = await User.findById(id);
    const pass = await checkPassword(password, user.password);

    if (pass && word === process.env.SECRET) {
        user.isAdmin = !user.isAdmin;
        await user.save();
        return;
    }

    throw new Error('Неверный пароль или секретное слово!');
};

exports.deleteUser = async(id, password) => {
    const user = await User.findById(id);
    const pass = await checkPassword(password, user.password);

    if (pass) {
        await User.findByIdAndDelete(id);
        // await user.save();
        return;
    }

    throw new Error('Неверный пароль!');
};

async function checkPassword(passwordInput, password) {
    const result = await bcrypt.compare(passwordInput, password);
    return result;
}