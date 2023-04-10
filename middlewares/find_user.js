const User = require('../models/').User;

module.exports = function(req, res, next) {
    if (!req.session.userID) {
        return next();
    }

    User.findByPk(req.session.userID).then(user => {
        if (user) {
            req.user = user;
        }
        next();
    });
};
