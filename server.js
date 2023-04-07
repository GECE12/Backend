const findUserMiddleware = require('./middlewares/find_user');
const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const app = express();
const methodOverride = require('method-override')

const actionsRoutes = require('./routes/actions_routes');
const registrationRoutes = require('./routes/registrations_route');
const sessionsRoute = require('./routes/sessions_routes');


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// let db = new sqlite3.Database('mi_base_de_datos');


app.use(session({
    secret:['hghhbgsderyjdfgbccsqwet', 'ghyjujkjmnhbvcqwrrtj'],
    saveUninitialized: false,
    resave: false,
}));

// middleware
app.use(actionsRoutes);
app.use(registrationRoutes);
app.use(sessionsRoute);
app.use(findUserMiddleware);
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('start', {user: req.user});
})



app.listen(4040);


