exports.sleep = (ms) => {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
};
const time = 2000;
exports.time = time;