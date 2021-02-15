const fetch = require('node-fetch');
exports.getData = async(url) => {
    return await fetch(url)
        .then((res) => res.buffer())
        .then((res) => res.toString('base64'));
};