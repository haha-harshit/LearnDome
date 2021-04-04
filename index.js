const express = require('express');
const port = 8000;

// import the layout-lib
const expressLayouts = require('express-ejs-layouts');

// const bodyParser = require('body-parser');
const app = express();

// cookie-parser
const cookieParser = require('cookie-parser');





// importing DB
const db = require('./config/mongoose');
const User = require('./models/user');

// importing express-sessions --- used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// for storing session data on server restarting
const MongoStore = require('connect-mongo')(session);


// {MIDDLEWARES}--->
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

//use static files ---> css/js files 
app.use(express.static('./assets'));

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
    secret: 'blahSomething',
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

// use express router
app.use('/', require('./routes/index'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
 
});