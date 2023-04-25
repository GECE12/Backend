module.exports = function(req, res, next){
    if(!req.originalUrl.includes("actions")) return next();

    if(req.session.userID) return next();

    res.redirect('/sessions');


}