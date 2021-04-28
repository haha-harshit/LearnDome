const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
require('dotenv').config()

const port = 8000;

// import the layout-lib
const expressLayouts = require('express-ejs-layouts');

// const bodyParser = require('body-parser');
const app = express();
// require('./config/view-helpers')(app);
// cookie-parser
const cookieParser = require('cookie-parser');

// importing DB
const db = require('./config/mongoose');
const User = require('./models/user');

// importing express-sessions --- used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// jwt strategy
const passportJWT = require('./config/passport-jwt-strategy');

// google strategy
const passportGoogle = require('./config/passport-google-oauth2-strategy');


// for storing session data on server restarting
const MongoStore = require('connect-mongo')(session);

const path = require('path');

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: path.join(env.asset_path, 'scss'),
    dest: path.join(env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));



const flash = require('connect-flash');
const customMware = require('./config/middleware');


// setup the chat server
// const chatServer = require('http').Server(app);
// const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
// chatServer.listen(5000);
// console.log('Chat server is listening on port 5000');


// {MIDDLEWARES}--->
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

//use static files ---> css/js files 
app.use(express.static(env.asset_path));

// make upload path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

// use a particular layout ---> use it before routes to tell that these routes belong to a particular layout
app.use(expressLayouts);

app.set('layout', './main_layout');
// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// mongo-store is used to store the session cookie in db!
// making sessions
app.use(session({
    name: 'LearnDome',

    // change the secret before deployment
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: null
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        }, function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);


// use express router
app.use('/', require('./routes/index'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
 
});