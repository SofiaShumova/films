exports.getUserID = (req) => {
    return req.user.userId || req.user._id;
};