const sessions = require('express-session');
const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const app = express();

app.use(express.static(__dirname + '/public'));

const actionsRoutes = require('./routes/actions_routes');
const registrationsRoutes = require('./routes/registration_routes');
const sessionsRoutes = require('./routes/sessions_routes');

const findUserMiddleware = require('./middlewares/find_user');
const authUser = require('./middlewares/authentication_user');
const socketIO = require('socket.io');

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
app.use(registrationsRoutes);
app.use(sessionsRoutes);


app.get('/', function(req, res){
    if(req.user === undefined || req.user === null){ 
        res.redirect('/sessions');
    }else{
        res.render('start', {user: req.user})
    }

})

let server = app.listen(3030);
let io = socketIO(server);
let usernum = 0;
let sockets = {};


io.on('connection', function(socket) {
    let userId = socket.request._query.loggeduser;
    if(userId) sockets[userId] = socket;
    console.log(sockets);
    //
    usernum = usernum + 1;

    io.emit('count_upd', {count: usernum});

    socket.on('new_action', function(data) {
        if(data.userId) {
            let userSocket = sockets[data.userId];
            if(!userSocket) return;

            userSocket.emit('new_action', data)
        }
    })


    socket.on('disconnect', function(){
        Object.keys(sockets).forEach(userId => {
            let s = sockets[userId];
            if(s.id == socket.id) sockets[userId] = null;
        })
        usernum = usernum - 1;
        io.emit('count_upd', {count: usernum});

    })
});

const client = require('./realtime/client');
