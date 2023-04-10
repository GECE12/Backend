const sessions = require('express-session');
const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const app = express();



const actionsRoutes = require('./routes/actions_routes');
const registrationRoutes = require('./routes/registrations_route');
const sessionsRoutes = require('./routes/sessions_routes');

const findUserMiddleware = require('./middlewares/find_user');
const authUser = require('./middlewares/authentication_user');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

app.use(sessions({
    secret: ['wgfgpddshifsjiddfd', 'efvfhgnhjjmtdtyuyyu'],
    saveUninitialized: false,
    resave: false,
}));

app.use(findUserMiddleware);
app.use(authUser);
app.use(actionsRoutes);
app.use(registrationRoutes);
app.use(sessionsRoutes);

app.get('/', function(req, res) {
    res.render('start', {user:req.user});
})

app.listen(4040);