const actions = require('../models').actions;

module.exports = {
    see: function(req, res) {
        actions.findAll().then((actions) => {
            res.render('actions/index', {miObj:actions});
        })
    }, 
    pick: function(req, res) {
        actions.findByPk(req.params.id).then(function(actions) {
            res.render('actions/pick', {actions:actions})
        });
    }, 
    change: function(req, res) {
        actions.findByPk(req.params.id).then(function(actions) {
            res.render('actions/change', {actions:actions})
        });
    }, destroy: function(req, res) {
        actions.destroy({
            where: {
                id:req.params.id
            }
        }).then(function(contEliminados){
            res.redirect('/actions')
        })
    },
    update: function(req, res) {
        actions.findByPk(req.params.id).then(action => {
            action.nombre = req.body.nombre;
            action.save().then(function(actions) {
                res.render('actions/pick', {actions:actions});
            })
        });
    },
    create: function(req, res) {
        actions.create({
            nombre: req.body.nombre,
            userId: req.user.id
        }).then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
            res.json(err);
        })
    },
    register: function(req, res){
        res.render('actions/register');
    }
}
