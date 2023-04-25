const User = require('../models').User;

module.exports = {
    new: function(req, res){
        res.render('sessions/new');
    },
    create: function(req, res){
        User.login(req.body.email, req.body.password)
        .then(user => {
            if(user){
                req.session.userID = user.id;
                res.redirect('/actions');

            }
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
    },
    destroy: function(req, res){
        req.session.destroy(function(){
            res.redirect('/sessions');
        })
    }
}